const express = require("express")
const http = require("http")
const socketIo = require("socket.io")
const ccxt = require("ccxt")
const cors = require("cors")

const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

app.use(cors())
app.use(express.json())

class TriangularArbitrageBot {
  constructor() {
    this.exchanges = {
      binance: null,
      kucoin: null,
      okx: null,
    }
    this.isRunning = false
    this.mode = "simulation" // 'simulation' or 'production'
    this.opportunities = []
    this.minProfitThreshold = 0.2 // 0.20%
    this.baseAsset = "USDT"

    this.initializeExchanges()
  }

  async initializeExchanges() {
    try {
      // Binance (principal)
      this.exchanges.binance = new ccxt.binance({
        apiKey: process.env.BINANCE_API_KEY || "",
        secret: process.env.BINANCE_SECRET || "",
        sandbox: this.mode === "simulation",
        enableRateLimit: true,
      })

      // KuCoin (opcional)
      this.exchanges.kucoin = new ccxt.kucoin({
        apiKey: process.env.KUCOIN_API_KEY || "",
        secret: process.env.KUCOIN_SECRET || "",
        password: process.env.KUCOIN_PASSPHRASE || "",
        sandbox: this.mode === "simulation",
        enableRateLimit: true,
      })

      console.log("Exchanges inicializados correctamente")
    } catch (error) {
      console.error("Error inicializando exchanges:", error)
    }
  }

  async getTriangularPairs(exchangeName = "binance") {
    try {
      const exchange = this.exchanges[exchangeName]
      if (!exchange) return []

      const markets = await exchange.loadMarkets()
      const symbols = Object.keys(markets)

      const triangularPairs = []
      const commonBases = ["USDT", "BTC", "ETH", "BNB"]

      for (const base of commonBases) {
        const baseSymbols = symbols.filter((s) => s.endsWith(`/${base}`))

        for (let i = 0; i < baseSymbols.length; i++) {
          for (let j = i + 1; j < baseSymbols.length; j++) {
            const symbol1 = baseSymbols[i]
            const symbol2 = baseSymbols[j]

            const asset1 = symbol1.split("/")[0]
            const asset2 = symbol2.split("/")[0]

            const crossSymbol = `${asset1}/${asset2}`
            const reverseCrossSymbol = `${asset2}/${asset1}`

            if (symbols.includes(crossSymbol)) {
              triangularPairs.push({
                route: [base, asset1, asset2],
                symbols: [symbol1, crossSymbol, symbol2],
                exchange: exchangeName,
              })
            } else if (symbols.includes(reverseCrossSymbol)) {
              triangularPairs.push({
                route: [base, asset2, asset1],
                symbols: [symbol2, reverseCrossSymbol, symbol1],
                exchange: exchangeName,
              })
            }
          }
        }
      }

      return triangularPairs.slice(0, 50) // Limitar para evitar rate limits
    } catch (error) {
      console.error("Error obteniendo pares triangulares:", error)
      return []
    }
  }

  async calculateArbitrageOpportunity(pairData) {
    try {
      const exchange = this.exchanges[pairData.exchange]
      const [symbol1, symbol2, symbol3] = pairData.symbols

      // Obtener tickers
      const [ticker1, ticker2, ticker3] = await Promise.all([
        exchange.fetchTicker(symbol1),
        exchange.fetchTicker(symbol2),
        exchange.fetchTicker(symbol3),
      ])

      // Calcular arbitraje
      const initialAmount = 1000 // $1000 USDT

      // Ruta: Base -> Asset1 -> Asset2 -> Base
      const price1 = ticker1.ask // Comprar asset1
      const price2 = ticker2.ask // Comprar asset2 con asset1
      const price3 = ticker3.bid // Vender asset2 por base

      const amount1 = initialAmount / price1
      const amount2 = amount1 / price2
      const finalAmount = amount2 * price3

      const profitPercentage = ((finalAmount - initialAmount) / initialAmount) * 100

      // Calcular confianza basada en spread y volumen
      const spread1 = ((ticker1.ask - ticker1.bid) / ticker1.bid) * 100
      const spread2 = ((ticker2.ask - ticker2.bid) / ticker2.bid) * 100
      const spread3 = ((ticker3.ask - ticker3.bid) / ticker3.bid) * 100

      const avgSpread = (spread1 + spread2 + spread3) / 3
      const confidence = Math.max(0, Math.min(100, 100 - avgSpread * 10))

      return {
        id: `${pairData.exchange}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        route: pairData.route,
        exchange: pairData.exchange,
        profit: profitPercentage,
        confidence: Math.round(confidence),
        amount: initialAmount,
        prices: { price1, price2, price3 },
        spreads: { spread1, spread2, spread3 },
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      console.error("Error calculando oportunidad:", error)
      return null
    }
  }

  async findArbitrageOpportunities() {
    try {
      const allOpportunities = []

      // Buscar en Binance
      const binancePairs = await this.getTriangularPairs("binance")

      for (const pair of binancePairs.slice(0, 20)) {
        // Limitar para demo
        const opportunity = await this.calculateArbitrageOpportunity(pair)
        if (opportunity) {
          allOpportunities.push(opportunity)
        }

        // Pequeña pausa para evitar rate limits
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      // Ordenar por profit
      allOpportunities.sort((a, b) => b.profit - a.profit)

      this.opportunities = allOpportunities

      // Emitir a todos los clientes conectados
      io.emit("arbitrage_opportunities", {
        opportunities: this.opportunities,
        timestamp: new Date().toISOString(),
        mode: this.mode,
      })

      console.log(`Encontradas ${allOpportunities.length} oportunidades`)
    } catch (error) {
      console.error("Error buscando oportunidades:", error)
    }
  }

  async start() {
    if (this.isRunning) return

    this.isRunning = true
    console.log(`Bot iniciado en modo ${this.mode}`)

    // Loop principal
    const runLoop = async () => {
      while (this.isRunning) {
        await this.findArbitrageOpportunities()
        await new Promise((resolve) => setTimeout(resolve, 5000)) // 5 segundos
      }
    }

    runLoop()
  }

  stop() {
    this.isRunning = false
    console.log("Bot detenido")
  }

  setMode(mode) {
    this.mode = mode
    this.initializeExchanges() // Reinicializar con el nuevo modo
  }
}

// Instancia del bot
const bot = new TriangularArbitrageBot()

// Rutas API
app.get("/api/status", (req, res) => {
  res.json({
    isRunning: bot.isRunning,
    mode: bot.mode,
    opportunitiesCount: bot.opportunities.length,
  })
})

app.post("/api/start", (req, res) => {
  bot.start()
  res.json({ message: "Bot iniciado" })
})

app.post("/api/stop", (req, res) => {
  bot.stop()
  res.json({ message: "Bot detenido" })
})

app.post("/api/mode", (req, res) => {
  const { mode } = req.body
  if (mode === "simulation" || mode === "production") {
    bot.setMode(mode)
    res.json({ message: `Modo cambiado a ${mode}` })
  } else {
    res.status(400).json({ error: "Modo inválido" })
  }
})

// Socket.IO eventos
io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id)

  // Enviar estado inicial
  socket.emit("bot_status", {
    isRunning: bot.isRunning,
    mode: bot.mode,
    opportunitiesCount: bot.opportunities.length,
  })

  // Enviar oportunidades actuales
  socket.emit("arbitrage_opportunities", {
    opportunities: bot.opportunities,
    timestamp: new Date().toISOString(),
    mode: bot.mode,
  })

  socket.on("start_bot", () => {
    bot.start()
  })

  socket.on("stop_bot", () => {
    bot.stop()
  })

  socket.on("change_mode", (data) => {
    if (data.mode === "simulation" || data.mode === "production") {
      bot.setMode(data.mode)
    }
  })

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id)
  })
})

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`)
})
## Análisis detallado de `server.js`

El archivo `server.js` implementa el **backend principal** del bot de arbitraje triangular para Binance (y parcialmente KuCoin y OKX), usando Node.js con Express, Socket.IO y la librería ccxt. Este servidor expone tanto una API HTTP/REST como una API en tiempo real vía WebSockets, y gestiona la lógica central del bot de arbitraje.

---

## 1. **Tecnologías y dependencias usadas**
- **Express:** Framework para construir la API HTTP.
- **http & socket.io:** Para crear un servidor HTTP y exponer comunicación en tiempo real con los clientes.
- **ccxt:** Librería para interactuar con APIs de exchanges de criptomonedas (Binance, KuCoin, OKX).
- **cors:** Permite solicitudes entre dominios (CORS) para la API.

---

## 2. **Clase principal: `TriangularArbitrageBot`**

### **Propiedades y estado**
- `exchanges`: Instancias de exchanges soportados (Binance, KuCoin, OKX).
- `isRunning`: Indica si el bot está ejecutándose.
- `mode`: Modo de operación (`simulation` o `production`).
- `opportunities`: Últimas oportunidades de arbitraje detectadas.
- `minProfitThreshold`: Mínimo porcentaje de profit considerado.
- `baseAsset`: Activo base para rutas (por defecto "USDT").

### **Métodos clave**

#### a. **Inicialización de exchanges**
- Inicializa las instancias de ccxt para Binance y KuCoin con las credenciales del entorno y configuraciones según el modo.
- Habilita sandbox en modo simulación.

#### b. **Detección de pares triangulares**
- Para un exchange dado, identifica rutas triangulares posibles usando activos comunes (USDT, BTC, ETH, BNB).
- Solo devuelve las primeras 50 rutas encontradas para evitar sobrecargar la API.

#### c. **Cálculo de oportunidad de arbitraje**
- Dada una ruta triangular, obtiene los precios actuales (ask/bid) de los tres pares.
- Simula una operación de arbitraje con $1000 USDT:  
  1. Convierte USDT a Asset1 (compra al precio ask).
  2. Convierte Asset1 a Asset2 (compra al precio ask).
  3. Convierte Asset2 de regreso a USDT (vende al precio bid).
- Calcula el profit porcentual y una "confianza" basada en el spread promedio de los tres pares.

#### d. **Búsqueda de oportunidades**
- Busca rutas triangulares en Binance (limitado a 20 rutas por iteración).
- Calcula la oportunidad para cada ruta y las ordena por profit.
- Emite los resultados a todos los clientes conectados vía Socket.IO.

#### e. **Control de ejecución**
- Métodos `start`, `stop` y `setMode` para controlar el ciclo de vida y modo de operación del bot.
- El método `start` corre en loop cada 5 segundos mientras está activo.

---

## 3. **API HTTP REST**

- `GET /api/status`: Devuelve el estado del bot (ejecutando, modo, número de oportunidades).
- `POST /api/start`: Inicia el bot.
- `POST /api/stop`: Detiene el bot.
- `POST /api/mode`: Cambia el modo de operación (`simulation` o `production`).

---

## 4. **API en tiempo real con Socket.IO**

- En cada conexión:
  - Envía el estado inicial del bot y las oportunidades actuales.
  - Soporta eventos: `start_bot`, `stop_bot`, y `change_mode`.
  - Emite automáticamente nuevas oportunidades a todos los clientes cada vez que se detectan.

---

## 5. **Ejecución del servidor**
- Escucha en el puerto configurado (por defecto `3001`).
- Permite conexiones desde cualquier origen (CORS: `origin: '*'`).

---

## 6. **Resumen funcional**

- **Orquesta la detección y simulación de oportunidades de arbitraje triangular.**
- **Permite monitorear, controlar y recibir resultados en tiempo real** tanto por HTTP como por WebSocket.
- **Soporta modos de simulación y producción**, lo que facilita pruebas sin arriesgar fondos reales.
- **Es extensible para soportar más exchanges** (KuCoin, OKX), aunque en este archivo solo Binance está operacional por defecto.

---

### **En conclusión**

Este archivo es el **núcleo del backend del bot de arbitraje**, gestionando tanto la lógica de trading como la comunicación con los clientes frontend. Permite automatizar el monitoreo de oportunidades de arbitraje en exchanges, controlar la ejecución del bot desde interfaces web y recibir información en tiempo real.

¿Te gustaría que explique la lógica de arbitraje, los endpoints, o la integración con el frontend en detalle?
