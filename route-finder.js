const ccxt = require("ccxt")
const fs = require("fs")

class Top100RoutesFinder {
  constructor() {
    this.binance = new ccxt.binance({
      enableRateLimit: true,
      sandbox: false,
    })

    this.spotMarkets = new Map()
    this.allRoutes = []
    this.testedRoutes = []
    this.batchSize = 20 // Procesar 20 rutas por lote para evitar rate limits
  }

  async loadRealSpotMarkets() {
    try {
      console.log("🔍 Cargando TODOS los mercados SPOT de Binance...")

      const markets = await this.binance.loadMarkets()

      const spotMarkets = Object.values(markets).filter((market) => {
        return (
          market.spot === true &&
          market.active === true &&
          (market.quote === "USDT" || market.base === "USDT" || (market.quote !== "USDT" && market.base !== "USDT"))
        )
      })

      console.log(`✅ Encontrados ${spotMarkets.length} mercados SPOT activos`)

      spotMarkets.forEach((market) => {
        this.spotMarkets.set(market.symbol, {
          symbol: market.symbol,
          base: market.base,
          quote: market.quote,
          active: market.active,
          id: market.id,
        })
      })

      return spotMarkets
    } catch (error) {
      console.error("❌ Error cargando mercados:", error.message)
      return []
    }
  }

  findAllTriangularRoutes() {
    console.log("\n🔍 Buscando TODAS las rutas triangulares posibles...")

    const routes = []
    const usdtPairs = []

    // Encontrar todos los pares X/USDT
    for (const [symbol, market] of this.spotMarkets) {
      if (market.quote === "USDT" && market.base !== "USDT") {
        usdtPairs.push({
          symbol: symbol,
          token: market.base,
        })
      }
    }

    console.log(`📊 Encontrados ${usdtPairs.length} pares con USDT`)

    // Generar TODAS las combinaciones triangulares posibles
    for (let i = 0; i < usdtPairs.length; i++) {
      for (let j = i + 1; j < usdtPairs.length; j++) {
        const tokenA = usdtPairs[i].token
        const tokenB = usdtPairs[j].token

        // Verificar ambas direcciones
        const pairAB = `${tokenA}/${tokenB}`
        const pairBA = `${tokenB}/${tokenA}`

        // Ruta 1: USDT → TOKENA → TOKENB → USDT
        if (this.spotMarkets.has(pairAB)) {
          routes.push({
            route: ["USDT", tokenA, tokenB],
            symbols: [`${tokenA}/USDT`, `${tokenA}/${tokenB}`, `${tokenB}/USDT`],
            description: `USDT → ${tokenA} → ${tokenB} → USDT`,
            type: "forward",
            priority: this.calculatePriority(tokenA, tokenB),
          })
        }

        // Ruta 2: USDT → TOKENB → TOKENA → USDT
        if (this.spotMarkets.has(pairBA)) {
          routes.push({
            route: ["USDT", tokenB, tokenA],
            symbols: [`${tokenB}/USDT`, `${tokenB}/${tokenA}`, `${tokenA}/USDT`],
            description: `USDT → ${tokenB} → ${tokenA} → USDT`,
            type: "reverse",
            priority: this.calculatePriority(tokenB, tokenA),
          })
        }
      }
    }

    console.log(`🎯 Encontradas ${routes.length} rutas triangulares posibles`)
    return routes
  }

  calculatePriority(tokenA, tokenB) {
    // Dar prioridad a tokens más populares
    const highPriorityTokens = ["BTC", "ETH", "BNB", "ADA", "XRP", "LTC", "DOT", "LINK", "UNI", "SOL"]
    const mediumPriorityTokens = ["MATIC", "AVAX", "ATOM", "XLM", "VET", "FIL", "TRX", "ETC", "BCH", "EOS"]

    let priority = 3 // Baja prioridad por defecto

    if (highPriorityTokens.includes(tokenA) || highPriorityTokens.includes(tokenB)) {
      priority = 1 // Alta prioridad
    } else if (mediumPriorityTokens.includes(tokenA) || mediumPriorityTokens.includes(tokenB)) {
      priority = 2 // Media prioridad
    }

    return priority
  }

  async verifyAllRoutes(routes) {
    console.log(`\n🔍 Verificando ${routes.length} rutas encontradas...`)

    const verifiedRoutes = []

    for (const route of routes) {
      let isValid = true

      // Verificar que todos los símbolos existan y estén activos
      for (const symbol of route.symbols) {
        const market = this.spotMarkets.get(symbol)
        if (!market || !market.active) {
          isValid = false
          break
        }
      }

      if (isValid) {
        verifiedRoutes.push(route)
      }
    }

    console.log(`✅ ${verifiedRoutes.length} rutas verificadas como válidas`)
    return verifiedRoutes
  }

  calculateArbitrageCorrect(route, tickers) {
    try {
      const [symbol1, symbol2, symbol3] = route.symbols

      if (!tickers[symbol1] || !tickers[symbol2] || !tickers[symbol3]) {
        return null
      }

      // Precios para comprar/vender
      const price1 = tickers[symbol1].ask // Comprar TOKENA con USDT
      const price2 = tickers[symbol2].ask // Comprar TOKENB con TOKENA
      const price3 = tickers[symbol3].bid // Vender TOKENB por USDT

      const initialAmount = 1000 // $1000 USDT

      // LÓGICA CORREGIDA
      const amount1 = initialAmount / price1 // USDT → TOKENA
      const amount2 = amount1 * price2 // TOKENA → TOKENB
      const finalAmount = amount2 * price3 // TOKENB → USDT

      const profitAmount = finalAmount - initialAmount
      const profitPercentage = (profitAmount / initialAmount) * 100

      // Calcular spread promedio (importante para evaluar liquidez)
      const spread1 = ((tickers[symbol1].ask - tickers[symbol1].bid) / tickers[symbol1].bid) * 100
      const spread2 = ((tickers[symbol2].ask - tickers[symbol2].bid) / tickers[symbol2].bid) * 100
      const spread3 = ((tickers[symbol3].ask - tickers[symbol3].bid) / tickers[symbol3].bid) * 100
      const avgSpread = (spread1 + spread2 + spread3) / 3

      return {
        initialAmount,
        amount1,
        amount2,
        finalAmount,
        profitAmount,
        profitPercentage,
        avgSpread,
        prices: { price1, price2, price3 },
        volumes: {
          vol1: tickers[symbol1].baseVolume || 0,
          vol2: tickers[symbol2].baseVolume || 0,
          vol3: tickers[symbol3].baseVolume || 0,
        },
      }
    } catch (error) {
      return null
    }
  }

  async testRoutesBatch(routes, batchIndex, totalBatches) {
    const batchResults = []

    console.log(`\n📊 Procesando lote ${batchIndex + 1}/${totalBatches} (${routes.length} rutas)`)

    try {
      // Obtener todos los símbolos únicos del lote
      const allSymbols = new Set()
      routes.forEach((route) => {
        route.symbols.forEach((symbol) => allSymbols.add(symbol))
      })

      const symbolsArray = Array.from(allSymbols)
      console.log(`   📡 Obteniendo precios para ${symbolsArray.length} símbolos...`)

      // Obtener todos los precios de una vez
      const tickers = await this.binance.fetchTickers(symbolsArray)

      // Procesar cada ruta del lote
      for (const route of routes) {
        const calculation = this.calculateArbitrageCorrect(route, tickers)

        if (calculation) {
          batchResults.push({
            ...route,
            profit: calculation.profitPercentage,
            profitAmount: calculation.profitAmount,
            avgSpread: calculation.avgSpread,
            calculation: calculation,
            tested: true,
            timestamp: new Date().toISOString(),
          })
        }
      }

      console.log(`   ✅ Procesadas ${batchResults.length}/${routes.length} rutas del lote`)
    } catch (error) {
      console.log(`   ❌ Error en lote ${batchIndex + 1}: ${error.message}`)
    }

    return batchResults
  }

  async testAllRoutes(verifiedRoutes) {
    console.log(`\n🧪 PROBANDO PRECIOS EN TODAS LAS ${verifiedRoutes.length} RUTAS...`)
    console.log(`📦 Procesando en lotes de ${this.batchSize} para evitar rate limits`)

    const allTestedRoutes = []

    // Dividir en lotes
    const batches = []
    for (let i = 0; i < verifiedRoutes.length; i += this.batchSize) {
      batches.push(verifiedRoutes.slice(i, i + this.batchSize))
    }

    console.log(`📊 Total de lotes a procesar: ${batches.length}`)

    // Procesar cada lote
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i]
      const batchResults = await this.testRoutesBatch(batch, i, batches.length)

      allTestedRoutes.push(...batchResults)

      // Pausa entre lotes para evitar rate limits
      if (i < batches.length - 1) {
        console.log(`   ⏳ Esperando 3 segundos antes del siguiente lote...`)
        await new Promise((resolve) => setTimeout(resolve, 3000))
      }
    }

    console.log(`\n✅ COMPLETADO: ${allTestedRoutes.length} rutas procesadas con precios reales`)
    return allTestedRoutes
  }

  generateTop100Report(testedRoutes) {
    console.log("\n📊 GENERANDO REPORTE TOP 100...")

    // Ordenar por profit (mayor a menor)
    const sortedRoutes = testedRoutes.sort((a, b) => b.profit - a.profit)

    // Top 100
    const top100 = sortedRoutes.slice(0, 100)

    // Estadísticas
    const profitable = sortedRoutes.filter((r) => r.profit > 0)
    const highlyProfitable = sortedRoutes.filter((r) => r.profit > 0.1)

    console.log("\n" + "=" * 80)
    console.log("📈 ESTADÍSTICAS GENERALES:")
    console.log(`📊 Total rutas analizadas: ${testedRoutes.length}`)
    console.log(`🟢 Rutas rentables (>0%): ${profitable.length}`)
    console.log(`🔥 Rutas muy rentables (>0.1%): ${highlyProfitable.length}`)
    console.log(`🎯 Mejor profit encontrado: ${sortedRoutes[0]?.profit.toFixed(4)}%`)
    console.log(`📉 Peor profit encontrado: ${sortedRoutes[sortedRoutes.length - 1]?.profit.toFixed(4)}%`)

    console.log("\n🏆 TOP 20 RUTAS MÁS RENTABLES:")
    top100.slice(0, 20).forEach((route, index) => {
      const profitColor = route.profit > 0 ? "🟢" : "🔴"
      console.log(`${(index + 1).toString().padStart(2)}. ${route.description}`)
      console.log(`    Profit: ${profitColor} ${route.profit.toFixed(4)}%`)
      console.log(`    Spread: ${route.avgSpread.toFixed(3)}%`)
      console.log(`    Símbolos: ${route.symbols.join(" → ")}`)
      console.log("")
    })

    return top100
  }

  saveTop100ToFile(top100Routes) {
    console.log("\n💾 GUARDANDO TOP 100 EN ARCHIVOS...")

    // Archivo JavaScript para el bot
    const jsContent = `// TOP 100 RUTAS MÁS RENTABLES - Generado: ${new Date().toISOString()}
// Total rutas analizadas: ${this.testedRoutes.length}
// Rutas rentables encontradas: ${top100Routes.filter((r) => r.profit > 0).length}

const TOP_100_ROUTES = [
${top100Routes
  .map(
    (route, index) => `  // ${index + 1}. ${route.description} - Profit: ${route.profit.toFixed(4)}%
  {
    route: ${JSON.stringify(route.route)},
    symbols: ${JSON.stringify(route.symbols)},
    description: "${route.description}",
    priority: ${route.priority},
    expectedProfit: ${route.profit.toFixed(4)}, // %
    avgSpread: ${route.avgSpread.toFixed(3)}, // %
  }`,
  )
  .join(",\n")}
];

module.exports = { TOP_100_ROUTES };`

    // Archivo JSON para análisis
    const jsonContent = {
      generatedAt: new Date().toISOString(),
      totalRoutesAnalyzed: this.testedRoutes.length,
      profitableRoutes: top100Routes.filter((r) => r.profit > 0).length,
      top100Routes: top100Routes.map((route, index) => ({
        rank: index + 1,
        description: route.description,
        route: route.route,
        symbols: route.symbols,
        profit: Number.parseFloat(route.profit.toFixed(4)),
        profitAmount: Number.parseFloat(route.profitAmount.toFixed(2)),
        avgSpread: Number.parseFloat(route.avgSpread.toFixed(3)),
        priority: route.priority,
        timestamp: route.timestamp,
      })),
    }

    // Guardar archivos
    fs.writeFileSync("top-100-routes.js", jsContent)
    fs.writeFileSync("top-100-routes.json", JSON.stringify(jsonContent, null, 2))

    console.log("✅ Archivos guardados:")
    console.log("   📄 top-100-routes.js (para usar en el bot)")
    console.log("   📄 top-100-routes.json (para análisis)")
  }

  async findTop100Routes() {
    console.log("🚀 INICIANDO BÚSQUEDA COMPLETA DE TOP 100 RUTAS")
    console.log("=" * 80)

    try {
      // 1. Cargar mercados
      await this.loadRealSpotMarkets()

      // 2. Encontrar todas las rutas
      this.allRoutes = this.findAllTriangularRoutes()

      // 3. Verificar rutas
      const verifiedRoutes = await this.verifyAllRoutes(this.allRoutes)

      // 4. Ordenar por prioridad para procesar las mejores primero
      const prioritizedRoutes = verifiedRoutes.sort((a, b) => a.priority - b.priority)

      // 5. Probar todas las rutas con precios reales
      this.testedRoutes = await this.testAllRoutes(prioritizedRoutes)

      // 6. Generar reporte Top 100
      const top100 = this.generateTop100Report(this.testedRoutes)

      // 7. Guardar en archivos
      this.saveTop100ToFile(top100)

      console.log("\n🎉 BÚSQUEDA COMPLETADA!")
      console.log("✅ Usa el archivo 'top-100-routes.js' en tu bot para las mejores rutas")

      return {
        totalFound: this.allRoutes.length,
        totalVerified: verifiedRoutes.length,
        totalTested: this.testedRoutes.length,
        top100: top100,
      }
    } catch (error) {
      console.error("❌ Error en la búsqueda completa:", error.message)
      throw error
    }
  }
}

// EJECUTAR BÚSQUEDA COMPLETA
async function main() {
  const finder = new Top100RoutesFinder()

  try {
    console.log("🎯 OBJETIVO: Encontrar las TOP 100 rutas más rentables")
    console.log("⏱️  TIEMPO ESTIMADO: 10-15 minutos")
    console.log("🔄 PROCESANDO...")

    const result = await finder.findTop100Routes()

    console.log("\n" + "=" * 80)
    console.log("🏁 RESUMEN FINAL:")
    console.log(`🔍 Rutas encontradas: ${result.totalFound}`)
    console.log(`✅ Rutas verificadas: ${result.totalVerified}`)
    console.log(`🧪 Rutas con precios: ${result.totalTested}`)
    console.log(`🏆 Top 100 seleccionadas: ${result.top100.length}`)
    console.log("\n📁 Archivos generados listos para usar en tu bot!")
  } catch (error) {
    console.error("💥 Error fatal:", error.message)
  }
}

// Ejecutar
main()


## Análisis detallado de `route-finder.js`

El archivo `route-finder.js` implementa un **buscador automático de rutas de arbitraje triangular** para el exchange Binance. Su propósito es detectar, analizar y guardar las 100 rutas más rentables de trading entre criptomonedas en el mercado spot de Binance.

---

## ¿Qué hace exactamente este archivo?

### 1. **Carga de Mercados SPOT**
- Usa la librería **ccxt** para conectarse a la API de Binance y cargar todos los mercados SPOT activos.
- Filtra y almacena los mercados relevantes (especialmente aquellos que involucran USDT como base o quote).

### 2. **Búsqueda de Rutas Triangulares**
- Detecta todos los pares que tienen USDT como quote.
- Genera todas las **combinaciones posibles de rutas triangulares** del tipo:  
  `USDT → TokenA → TokenB → USDT`  
  (y la reversa: `USDT → TokenB → TokenA → USDT`)
- Cada ruta queda representada con su secuencia de símbolos y una prioridad (alta, media, baja) según la popularidad de los tokens involucrados.

### 3. **Verificación de Rutas**
- Filtra las rutas para asegurar que todos los pares de la ruta existen y están activos en Binance.
- Guarda solo las rutas verificadas como válidas.

### 4. **Testeo de Rutas y Cálculo de Rentabilidad**
- Divide las rutas verificadas en **lotes**, para evitar límites de tasa (rate limits) de la API.
- Para cada lote:
  - Obtiene precios de todos los símbolos necesarios de una vez.
  - Calcula para cada ruta el **profit porcentual**, el amount de profit, el spread promedio y otros datos usando precios ask/bid reales del mercado.
- Usa una lógica corregida para simular la secuencia de operaciones de arbitraje (conversión de USDT a TokenA, a TokenB, y de vuelta a USDT).

### 5. **Generación de Reporte y Guardado**
- Una vez probadas todas las rutas, las ordena por rentabilidad y selecciona las **100 más rentables**.
- Imprime estadísticas generales y los datos de las 20 mejores rutas a consola.
- Guarda dos archivos:
  - `top-100-routes.js`: para utilizar directamente en el bot, con las rutas y profits.
  - `top-100-routes.json`: para análisis, con detalles y métricas de cada ruta.

### 6. **Flujo principal (`main`)**
- Ejecuta todo el proceso de búsqueda, testeo y guardado de rutas.
- Informa en consola el progreso, estadísticas y rutas generadas, y maneja errores fatales.

---

## **Características técnicas y profesionales**

- **Batching:** Procesa rutas en lotes (batchSize = 20) para evitar sobrecargar la API.
- **Cálculo avanzado:** Considera spreads, liquidez, y utiliza precios ask/bid para simular el arbitraje real.
- **Priorización:** Ordena primero las rutas que involucran los tokens más populares.
- **Persistencia:** Guarda resultados en archivos, listos para ser usados por el bot o para análisis externo.
- **Robustez:** Maneja errores en la carga de mercados y en la obtención de precios, con logs detallados.

---

## **Resumen funcional**

- Automatiza la detección y análisis de rutas triangulares de arbitraje en Binance.
- Calcula rentabilidad real de cada ruta usando precios actuales.
- Selecciona y guarda las mejores rutas para su uso en un bot de trading.

---

**En conclusión:**  
Este archivo es el corazón del descubrimiento algorítmico de oportunidades de arbitraje en el ecosistema de Binance y genera los insumos clave para que el bot opere de manera rentable y eficiente.

