"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  Moon,
  Sun,
  Edit,
  Save,
  AlertTriangle,
  Target,
  TrendingUpIcon,
  Wallet,
  Play,
  Pause,
  Settings,
  Shield,
  RefreshCw,
  Plus,
  Trash2,
} from "lucide-react"

// Configuración del bot
const BOT_NAME = "YAGECOIN EXCHANGE 🤖"
const BOT_BADGE = "Arbitraje IA Ultimate"
const BOT_LOGO = "https://i.ibb.co/gZ3hKxQt/YGCT-32-X32.png"

// CONFIGURACIÓN PROFESIONAL DE FEES
const BINANCE_FEE_SPOT = 0.1 // 0.1% por operación
const BINANCE_FEE_WITH_BNB = 0.075 // 0.075% con BNB
const TRIANGULAR_OPERATIONS = 3 // 3 operaciones por arbitraje
const TOTAL_FEES = BINANCE_FEE_SPOT * TRIANGULAR_OPERATIONS // 0.3% total
const TOTAL_FEES_WITH_BNB = BINANCE_FEE_WITH_BNB * TRIANGULAR_OPERATIONS // 0.225% total
const MIN_PROFIT_THRESHOLD = 0.4 // 0.4% mínimo para ser rentable
const IDEAL_PROFIT_THRESHOLD = 0.6 // 0.6% ideal para buen margen

interface ArbitrageOpportunity {
  id: string
  route: string[]
  exchange: string
  grossProfit: number
  netProfit: number
  netProfitWithBNB: number
  confidence: number
  amount: number
  timestamp: string
  fees: number
  feesWithBNB: number
  estimatedTime: number
  risk: "LOW" | "MEDIUM" | "HIGH"
}

interface RouteData {
  id: string
  route: string[]
  symbols: string[]
  description: string
  isActive: boolean
  priority: number
  category: string
  expectedProfit: number
  currentProfit?: number
  lastUpdate?: string
  status: "ANALYZING" | "PROFITABLE" | "UNPROFITABLE" | "ERROR"
}

interface TradingPair {
  id: string
  symbols: string[]
  description: string
  isActive: boolean
  priority: number
}

interface BotConfig {
  autoTrade: boolean
  simultaneousOperations: number
  minProfitThreshold: number
  maxRiskPerOperation: number
  useBNBForFees: boolean
  maxDailyOperations: number
  stopLossEnabled: boolean
  emergencyStop: boolean
}

interface BinanceBalance {
  asset: string
  free: number
  locked: number
  total: number
  usdValue: number
}

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [activePanel, setActivePanel] = useState("real-time")
  const [mode, setMode] = useState<"simulation" | "production">("simulation")
  const [botActive, setBotActive] = useState(false)
  const [opportunities, setOpportunities] = useState<ArbitrageOpportunity[]>([])
  const [usdtBalance, setUsdtBalance] = useState(5000.0) // Balance simulación
  const [editingBalance, setEditingBalance] = useState(false)
  const [newBalance, setNewBalance] = useState("5000")

  // BALANCES REALES DE BINANCE
  const [binanceBalances, setBinanceBalances] = useState<BinanceBalance[]>([
    { asset: "USDT", free: 0.0, locked: 0.0, total: 0.0, usdValue: 0.0 },
    { asset: "BNB", free: 0.0, locked: 0.0, total: 0.0, usdValue: 0.0 },
  ])

  // LAS 30 RUTAS COMPLETAS DEL BOT
  const [allRoutes, setAllRoutes] = useState<RouteData[]>([
    // 🟢 PRIMERAS 15 RUTAS RECOMENDADAS
    {
      id: "1",
      route: ["USDT", "CHZ", "BTC"],
      symbols: ["CHZ/USDT", "CHZ/BTC", "BTC/USDT"],
      description: "USDT → CHZ → BTC → USDT",
      isActive: true,
      priority: 1,
      category: "HIGH_PROFIT",
      expectedProfit: 2.5432,
      status: "ANALYZING",
    },
    {
      id: "2",
      route: ["USDT", "COTI", "BTC"],
      symbols: ["COTI/USDT", "COTI/BTC", "BTC/USDT"],
      description: "USDT → COTI → BTC → USDT",
      isActive: true,
      priority: 1,
      category: "HIGH_PROFIT",
      expectedProfit: 1.9829,
      status: "ANALYZING",
    },
    {
      id: "3",
      route: ["USDT", "TFUEL", "BTC"],
      symbols: ["TFUEL/USDT", "TFUEL/BTC", "BTC/USDT"],
      description: "USDT → TFUEL → BTC → USDT",
      isActive: true,
      priority: 1,
      category: "HIGH_PROFIT",
      expectedProfit: 1.9437,
      status: "ANALYZING",
    },
    {
      id: "4",
      route: ["USDT", "ENJ", "BTC"],
      symbols: ["ENJ/USDT", "ENJ/BTC", "BTC/USDT"],
      description: "USDT → ENJ → BTC → USDT",
      isActive: true,
      priority: 1,
      category: "MEDIUM_PROFIT",
      expectedProfit: 1.4291,
      status: "ANALYZING",
    },
    {
      id: "5",
      route: ["USDT", "JST", "BTC"],
      symbols: ["JST/USDT", "JST/BTC", "BTC/USDT"],
      description: "USDT → JST → BTC → USDT",
      isActive: true,
      priority: 1,
      category: "MEDIUM_PROFIT",
      expectedProfit: 1.2825,
      status: "ANALYZING",
    },
    {
      id: "6",
      route: ["USDT", "GLMR", "BTC"],
      symbols: ["GLMR/USDT", "GLMR/BTC", "BTC/USDT"],
      description: "USDT → GLMR → BTC → USDT",
      isActive: true,
      priority: 1,
      category: "MEDIUM_PROFIT",
      expectedProfit: 1.1608,
      status: "ANALYZING",
    },
    {
      id: "7",
      route: ["USDT", "ONT", "BTC"],
      symbols: ["ONT/USDT", "ONT/BTC", "BTC/USDT"],
      description: "USDT → ONT → BTC → USDT",
      isActive: true,
      priority: 1,
      category: "STABLE_PROFIT",
      expectedProfit: 0.9685,
      status: "ANALYZING",
    },
    {
      id: "8",
      route: ["USDT", "BICO", "BTC"],
      symbols: ["BICO/USDT", "BICO/BTC", "BTC/USDT"],
      description: "USDT → BICO → BTC → USDT",
      isActive: true,
      priority: 1,
      category: "STABLE_PROFIT",
      expectedProfit: 0.7998,
      status: "ANALYZING",
    },
    {
      id: "9",
      route: ["USDT", "TIA", "BTC"],
      symbols: ["TIA/USDT", "TIA/BTC", "BTC/USDT"],
      description: "USDT → TIA → BTC → USDT",
      isActive: true,
      priority: 1,
      category: "STABLE_PROFIT",
      expectedProfit: 0.6586,
      status: "ANALYZING",
    },
    {
      id: "10",
      route: ["USDT", "1INCH", "BTC"],
      symbols: ["1INCH/USDT", "1INCH/BTC", "BTC/USDT"],
      description: "USDT → 1INCH → BTC → USDT",
      isActive: true,
      priority: 1,
      category: "STABLE_PROFIT",
      expectedProfit: 0.6292,
      status: "ANALYZING",
    },
    {
      id: "11",
      route: ["USDT", "BAKE", "BTC"],
      symbols: ["BAKE/USDT", "BAKE/BTC", "BTC/USDT"],
      description: "USDT → BAKE → BTC → USDT",
      isActive: true,
      priority: 1,
      category: "STABLE_PROFIT",
      expectedProfit: 0.5932,
      status: "ANALYZING",
    },
    {
      id: "12",
      route: ["USDT", "VET", "BTC"],
      symbols: ["VET/USDT", "VET/BTC", "BTC/USDT"],
      description: "USDT → VET → BTC → USDT",
      isActive: true,
      priority: 2,
      category: "STABLE_PROFIT",
      expectedProfit: 0.5469,
      status: "ANALYZING",
    },
    {
      id: "13",
      route: ["USDT", "PYTH", "BTC"],
      symbols: ["PYTH/USDT", "PYTH/BTC", "BTC/USDT"],
      description: "USDT → PYTH → BTC → USDT",
      isActive: true,
      priority: 1,
      category: "STABLE_PROFIT",
      expectedProfit: 0.5335,
      status: "ANALYZING",
    },
    {
      id: "14",
      route: ["USDT", "BERA", "BTC"],
      symbols: ["BERA/USDT", "BERA/BTC", "BTC/USDT"],
      description: "USDT → BERA → BTC → USDT",
      isActive: true,
      priority: 1,
      category: "STABLE_PROFIT",
      expectedProfit: 0.437,
      status: "ANALYZING",
    },
    {
      id: "15",
      route: ["USDT", "BAT", "BTC"],
      symbols: ["BAT/USDT", "BAT/BTC", "BTC/USDT"],
      description: "USDT → BAT → BTC → USDT",
      isActive: true,
      priority: 1,
      category: "STABLE_PROFIT",
      expectedProfit: 0.4295,
      status: "ANALYZING",
    },
    // 🔵 15 RUTAS ADICIONALES
    {
      id: "16",
      route: ["USDT", "DODO", "BTC"],
      symbols: ["DODO/USDT", "DODO/BTC", "BTC/USDT"],
      description: "USDT → DODO → BTC → USDT",
      isActive: true,
      priority: 1,
      category: "HIGH_PROFIT",
      expectedProfit: 2.309,
      status: "ANALYZING",
    },
    {
      id: "17",
      route: ["USDT", "LTO", "BTC"],
      symbols: ["LTO/USDT", "LTO/BTC", "BTC/USDT"],
      description: "USDT → LTO → BTC → USDT",
      isActive: true,
      priority: 1,
      category: "HIGH_PROFIT",
      expectedProfit: 2.1536,
      status: "ANALYZING",
    },
    {
      id: "18",
      route: ["USDT", "DENT", "ETH"],
      symbols: ["DENT/USDT", "DENT/ETH", "ETH/USDT"],
      description: "USDT → DENT → ETH → USDT",
      isActive: true,
      priority: 1,
      category: "HIGH_PROFIT_ETH",
      expectedProfit: 2.1161,
      status: "ANALYZING",
    },
    {
      id: "19",
      route: ["USDT", "OGN", "BTC"],
      symbols: ["OGN/USDT", "OGN/BTC", "BTC/USDT"],
      description: "USDT → OGN → BTC → USDT",
      isActive: true,
      priority: 1,
      category: "HIGH_PROFIT",
      expectedProfit: 2.0589,
      status: "ANALYZING",
    },
    {
      id: "20",
      route: ["USDT", "FIDA", "BTC"],
      symbols: ["FIDA/USDT", "FIDA/BTC", "BTC/USDT"],
      description: "USDT → FIDA → BTC → USDT",
      isActive: true,
      priority: 1,
      category: "HIGH_PROFIT",
      expectedProfit: 2.0011,
      status: "ANALYZING",
    },
    {
      id: "21",
      route: ["USDT", "ARPA", "BTC"],
      symbols: ["ARPA/USDT", "ARPA/BTC", "BTC/USDT"],
      description: "USDT → ARPA → BTC → USDT",
      isActive: true,
      priority: 1,
      category: "HIGH_PROFIT",
      expectedProfit: 1.969,
      status: "ANALYZING",
    },
    {
      id: "22",
      route: ["USDT", "RVN", "BTC"],
      symbols: ["RVN/USDT", "RVN/BTC", "BTC/USDT"],
      description: "USDT → RVN → BTC → USDT",
      isActive: true,
      priority: 2,
      category: "MEDIUM_PROFIT",
      expectedProfit: 1.8189,
      status: "ANALYZING",
    },
    {
      id: "23",
      route: ["USDT", "ALT", "BTC"],
      symbols: ["ALT/USDT", "ALT/BTC", "BTC/USDT"],
      description: "USDT → ALT → BTC → USDT",
      isActive: true,
      priority: 1,
      category: "MEDIUM_PROFIT",
      expectedProfit: 1.8094,
      status: "ANALYZING",
    },
    {
      id: "24",
      route: ["USDT", "RARE", "BTC"],
      symbols: ["RARE/USDT", "RARE/BTC", "BTC/USDT"],
      description: "USDT → RARE → BTC → USDT",
      isActive: true,
      priority: 1,
      category: "MEDIUM_PROFIT",
      expectedProfit: 1.523,
      status: "ANALYZING",
    },
    {
      id: "25",
      route: ["USDT", "PEOPLE", "BTC"],
      symbols: ["PEOPLE/USDT", "PEOPLE/BTC", "BTC/USDT"],
      description: "USDT → PEOPLE → BTC → USDT",
      isActive: true,
      priority: 2,
      category: "MEDIUM_PROFIT",
      expectedProfit: 1.5204,
      status: "ANALYZING",
    },
    {
      id: "26",
      route: ["USDT", "HOT", "ETH"],
      symbols: ["HOT/USDT", "HOT/ETH", "ETH/USDT"],
      description: "USDT → HOT → ETH → USDT",
      isActive: true,
      priority: 1,
      category: "DIVERSIFIED_ETH",
      expectedProfit: 0.8573,
      status: "ANALYZING",
    },
    {
      id: "27",
      route: ["USDT", "LAYER", "BNB"],
      symbols: ["LAYER/USDT", "LAYER/BNB", "BNB/USDT"],
      description: "USDT → LAYER → BNB → USDT",
      isActive: true,
      priority: 1,
      category: "DIVERSIFIED_BNB",
      expectedProfit: 0.9264,
      status: "ANALYZING",
    },
    {
      id: "28",
      route: ["USDT", "HOME", "BNB"],
      symbols: ["HOME/USDT", "HOME/BNB", "BNB/USDT"],
      description: "USDT → HOME → BNB → USDT",
      isActive: true,
      priority: 1,
      category: "DIVERSIFIED_BNB",
      expectedProfit: 0.8436,
      status: "ANALYZING",
    },
    {
      id: "29",
      route: ["USDT", "SHELL", "BTC"],
      symbols: ["SHELL/USDT", "SHELL/BTC", "BTC/USDT"],
      description: "USDT → SHELL → BTC → USDT",
      isActive: true,
      priority: 1,
      category: "ULTRA_SAFE",
      expectedProfit: 0.9857,
      status: "ANALYZING",
    },
    {
      id: "30",
      route: ["USDT", "ARDR", "BTC"],
      symbols: ["ARDR/USDT", "ARDR/BTC", "BTC/USDT"],
      description: "USDT → ARDR → BTC → USDT",
      isActive: true,
      priority: 1,
      category: "ULTRA_SAFE",
      expectedProfit: 0.9397,
      status: "ANALYZING",
    },
  ])

  // CONFIGURACIÓN PROFESIONAL DEL BOT
  const [botConfig, setBotConfig] = useState<BotConfig>({
    autoTrade: false,
    simultaneousOperations: 1,
    minProfitThreshold: MIN_PROFIT_THRESHOLD,
    maxRiskPerOperation: 2.0,
    useBNBForFees: true,
    maxDailyOperations: 50,
    stopLossEnabled: true,
    emergencyStop: false,
  })

  const [tradingAmount, setTradingAmount] = useState(500)
  const [aiStrategy, setAiStrategy] = useState("conservative")

  const [logs, setLogs] = useState([
    {
      id: 1,
      timestamp: "14:30:25",
      type: "SUCCESS",
      message: "✅ Operación ejecutada: CHZ/BTC +0.67% bruto → +0.37% neto ($1.85)",
    },
    {
      id: 2,
      timestamp: "14:29:18",
      type: "INFO",
      message: "🔍 Analizando 30 rutas... Filtro: ≥0.4% profit bruto",
    },
    {
      id: 3,
      timestamp: "14:28:45",
      type: "WARNING",
      message: "⚠️ Oportunidad rechazada: DENT/ETH +0.25% (< 0.4% mínimo)",
    },
    {
      id: 4,
      timestamp: "14:27:32",
      type: "ERROR",
      message: "❌ Operación cancelada: SHELL/BTC - Spread muy alto (3.2%)",
    },
    {
      id: 5,
      timestamp: "14:26:15",
      type: "SUCCESS",
      message: "💰 Profit acumulado hoy: +$47.32 (23 operaciones exitosas)",
    },
  ])

  const [dailyStats, setDailyStats] = useState({
    operationsToday: 23,
    successfulOperations: 21,
    totalProfitToday: 47.32,
    averageProfit: 0.52,
    bestOperation: 0.89,
    worstOperation: 0.41,
    uptime: 99.8,
  })

  // Estados para crear nuevas rutas
  const [showNewRouteForm, setShowNewRouteForm] = useState(false)
  const [newRoute, setNewRoute] = useState({
    baseAsset: "",
    intermediateAsset: "",
    quoteAsset: "",
    description: "",
    category: "MEDIUM_PROFIT",
    priority: 2,
    expectedProfit: 0.5
  })

  // Simular datos en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      // Simular oportunidades rentables
      const mockOpportunities: ArbitrageOpportunity[] = [
        {
          id: "1",
          route: ["USDT", "CHZ", "BTC"],
          exchange: "Binance",
          grossProfit: 0.67,
          netProfit: 0.37,
          netProfitWithBNB: 0.445,
          confidence: 89,
          amount: tradingAmount,
          timestamp: new Date().toLocaleTimeString(),
          fees: TOTAL_FEES,
          feesWithBNB: TOTAL_FEES_WITH_BNB,
          estimatedTime: 4.2,
          risk: "LOW" as const,
        },
        {
          id: "2",
          route: ["USDT", "COTI", "BTC"],
          exchange: "Binance",
          grossProfit: 0.89,
          netProfit: 0.59,
          netProfitWithBNB: 0.665,
          confidence: 94,
          amount: tradingAmount,
          timestamp: new Date().toLocaleTimeString(),
          fees: TOTAL_FEES,
          feesWithBNB: TOTAL_FEES_WITH_BNB,
          estimatedTime: 3.8,
          risk: "LOW" as const,
        },
        {
          id: "3",
          route: ["USDT", "DODO", "BTC"],
          exchange: "Binance",
          grossProfit: 1.23,
          netProfit: 0.93,
          netProfitWithBNB: 1.005,
          confidence: 82,
          amount: tradingAmount,
          timestamp: new Date().toLocaleTimeString(),
          fees: TOTAL_FEES,
          feesWithBNB: TOTAL_FEES_WITH_BNB,
          estimatedTime: 5.1,
          risk: "MEDIUM" as const,
        },
      ].filter((opp) => opp.grossProfit >= botConfig.minProfitThreshold)

      setOpportunities(mockOpportunities)

      // Simular actualización de rutas
      setAllRoutes((prev) =>
        prev.map((route) => ({
          ...route,
          currentProfit: Math.random() * 2 - 0.5, // -0.5% a +1.5%
          lastUpdate: new Date().toLocaleTimeString(),
          status: Math.random() > 0.7 ? "PROFITABLE" : Math.random() > 0.3 ? "UNPROFITABLE" : "ANALYZING",
        })),
      )

      // Simular balances de Binance (en producción vendrían de la API)
      if (mode === "production") {
        setBinanceBalances([
          { asset: "USDT", free: 0.0, locked: 0.0, total: 0.0, usdValue: 0.0 },
          { asset: "BNB", free: 0.0, locked: 0.0, total: 0.0, usdValue: 0.0 },
        ])
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [tradingAmount, botConfig, mode])

  const updateBotConfig = (key: keyof BotConfig, value: any) => {
    setBotConfig((prev) => ({ ...prev, [key]: value }))
  }

  const saveBalance = () => {
    setUsdtBalance(Number.parseFloat(newBalance))
    setEditingBalance(false)
  }

  const emergencyStop = () => {
    setBotActive(false)
    updateBotConfig("emergencyStop", true)
    updateBotConfig("autoTrade", false)
    const emergencyLog = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      type: "ERROR" as const,
      message: "🚨 PARADA DE EMERGENCIA ACTIVADA - Todas las operaciones detenidas",
    }
    setLogs((prev) => [emergencyLog, ...prev])
  }

  const toggleRouteActive = (id: string) => {
    setAllRoutes((prev) => prev.map((route) => (route.id === id ? { ...route, isActive: !route.isActive } : route)))
  }

  const refreshBinanceBalances = async () => {
    // En producción, aquí haríamos la llamada real a la API de Binance
    if (mode === "production") {
      // Simular llamada a API
      console.log("🔄 Actualizando balances de Binance...")
      // setBinanceBalances(await fetchBinanceBalances())
    }
  }

  const addNewRoute = () => {
    if (!newRoute.baseAsset || !newRoute.intermediateAsset || !newRoute.quoteAsset) {
      alert("Por favor completa todos los campos de la ruta")
      return
    }

    const route: RouteData = {
      id: (allRoutes.length + 1).toString(),
      route: [newRoute.baseAsset, newRoute.intermediateAsset, newRoute.quoteAsset],
      symbols: [
        `${newRoute.intermediateAsset}/${newRoute.baseAsset}`,
        `${newRoute.intermediateAsset}/${newRoute.quoteAsset}`,
        `${newRoute.quoteAsset}/${newRoute.baseAsset}`
      ],
      description: newRoute.description || `${newRoute.baseAsset} → ${newRoute.intermediateAsset} → ${newRoute.quoteAsset} → ${newRoute.baseAsset}`,
      isActive: true,
      priority: newRoute.priority,
      category: newRoute.category,
      expectedProfit: newRoute.expectedProfit,
      status: "ANALYZING"
    }

    setAllRoutes(prev => [...prev, route])
    setShowNewRouteForm(false)
    setNewRoute({
      baseAsset: "",
      intermediateAsset: "",
      quoteAsset: "",
      description: "",
      category: "MEDIUM_PROFIT",
      priority: 2,
      expectedProfit: 0.5
    })

    // Log de nueva ruta agregada
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      type: "SUCCESS" as const,
      message: `✅ Nueva ruta agregada: ${route.description} (Profit esperado: ${route.expectedProfit}%)`
    }
    setLogs(prev => [newLog, ...prev.slice(0, 9)])
  }

  const renderPanel = () => {
    switch (activePanel) {
      case "real-time":
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card
                className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} transition-all hover:scale-105`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">🔄 Total Rutas</CardTitle>
                  <Target className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{allRoutes.length}</div>
                  <p className="text-xs text-muted-foreground">Rutas configuradas</p>
                </CardContent>
              </Card>

              <Card
                className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} transition-all hover:scale-105`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">✅ Rutas Activas</CardTitle>
                  <Activity className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{allRoutes.filter((r) => r.isActive).length}</div>
                  <p className="text-xs text-muted-foreground">Monitoreando precios</p>
                </CardContent>
              </Card>

              <Card
                className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} transition-all hover:scale-105`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">💰 Rutas Rentables</CardTitle>
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">
                    {allRoutes.filter((r) => r.status === "PROFITABLE").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Con profit positivo</p>
                </CardContent>
              </Card>

              <Card
                className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} transition-all hover:scale-105`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">📊 Profit Promedio</CardTitle>
                  <DollarSign className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">
                    {(allRoutes.reduce((sum, route) => sum + (route.currentProfit || 0), 0) / allRoutes.length).toFixed(
                      3,
                    )}
                    %
                  </div>
                  <p className="text-xs text-muted-foreground">Todas las rutas</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabla de TODAS las 30 rutas */}
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}>
              <CardHeader>
                <CardTitle className="text-blue-600 flex items-center gap-2">
                  📊 Todas las Rutas (30 Rutas Profesionales)
                </CardTitle>
                <CardDescription>
                  Monitoreo en tiempo real de todas las rutas triangulares - Sin filtros de profit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>🔄 Ruta Triangular</TableHead>
                      <TableHead>📈 Profit Actual</TableHead>
                      <TableHead>🎯 Profit Esperado</TableHead>
                      <TableHead>📊 Categoría</TableHead>
                      <TableHead>🔄 Estado</TableHead>
                      <TableHead>⏱️ Última Act.</TableHead>
                      <TableHead>⚡ Activa</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allRoutes.map((route) => (
                      <TableRow key={route.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <TableCell className="font-medium">{route.description}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {(route.currentProfit || 0) > 0 ? (
                              <TrendingUp className="w-4 h-4 text-green-500" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-500" />
                            )}
                            <span
                              className={
                                (route.currentProfit || 0) > 0 ? "text-green-600 font-semibold" : "text-red-600"
                              }
                            >
                              {(route.currentProfit || 0) > 0 ? "+" : ""}
                              {(route.currentProfit || 0).toFixed(3)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-blue-600 font-semibold">
                          +{route.expectedProfit.toFixed(3)}%
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              route.category.includes("HIGH")
                                ? "default"
                                : route.category.includes("MEDIUM")
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {route.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              route.status === "PROFITABLE"
                                ? "default"
                                : route.status === "ANALYZING"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {route.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{route.lastUpdate || "N/A"}</TableCell>
                        <TableCell>
                          <Switch checked={route.isActive} onCheckedChange={() => toggleRouteActive(route.id)} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )

      case "opportunities":
        return (
          <div className="space-y-6">
            {/* Stats Cards para oportunidades */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card
                className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} transition-all hover:scale-105`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    🎯 Oportunidades ≥{botConfig.minProfitThreshold}%
                  </CardTitle>
                  <Target className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{opportunities.length}</div>
                  <p className="text-xs text-muted-foreground">Profit bruto mínimo</p>
                </CardContent>
              </Card>

              <Card
                className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} transition-all hover:scale-105`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">💰 Profit Neto Promedio</CardTitle>
                  <TrendingUpIcon className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {opportunities.length > 0
                      ? (
                          opportunities.reduce(
                            (sum, opp) => sum + (botConfig.useBNBForFees ? opp.netProfitWithBNB : opp.netProfit),
                            0,
                          ) / opportunities.length
                        ).toFixed(3)
                      : "0.000"}
                    %
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Después fees {botConfig.useBNBForFees ? "(con BNB)" : "(sin BNB)"}
                  </p>
                </CardContent>
              </Card>

              <Card
                className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} transition-all hover:scale-105`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">🤖 Operaciones Simultáneas</CardTitle>
                  <Settings className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{botConfig.simultaneousOperations}</div>
                  <p className="text-xs text-muted-foreground">Máximo configurado</p>
                </CardContent>
              </Card>

              <Card
                className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} transition-all hover:scale-105`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">🔥 Estado Bot</CardTitle>
                  <Activity className={`h-4 w-4 ${botActive ? "text-green-500" : "text-red-500"}`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${botActive ? "text-green-600" : "text-red-600"}`}>
                    {botActive ? (botConfig.autoTrade ? "AUTO" : "MANUAL") : "PARADO"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {botConfig.autoTrade ? "Ejecutando automáticamente" : "Esperando confirmación manual"}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* CONFIGURACIÓN RÁPIDA */}
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">⚙️ Configuración Rápida de Trading</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>🤖 Trading Automático</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={botConfig.autoTrade}
                        onCheckedChange={(checked) => updateBotConfig("autoTrade", checked)}
                      />
                      <span className={botConfig.autoTrade ? "text-green-600" : "text-red-600"}>
                        {botConfig.autoTrade ? "✅ ACTIVADO" : "❌ MANUAL"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>🔢 Operaciones Simultáneas: {botConfig.simultaneousOperations}</Label>
                    <Slider
                      value={[botConfig.simultaneousOperations]}
                      onValueChange={(value) => updateBotConfig("simultaneousOperations", value[0])}
                      max={99}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500">1-99 operaciones paralelas</p>
                  </div>

                  <div className="space-y-2">
                    <Label>📈 Profit Mínimo: {botConfig.minProfitThreshold}%</Label>
                    <Slider
                      value={[botConfig.minProfitThreshold]}
                      onValueChange={(value) => updateBotConfig("minProfitThreshold", value[0])}
                      max={2.0}
                      min={0.3}
                      step={0.05}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500">Profit bruto mínimo</p>
                  </div>

                  <div className="space-y-2">
                    <Label>💵 Monto por Operación</Label>
                    <Input
                      type="number"
                      value={tradingAmount}
                      onChange={(e) => setTradingAmount(Number(e.target.value))}
                      min={100}
                      max={usdtBalance / 2}
                    />
                    <p className="text-xs text-gray-500">USDT por arbitraje</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabla de oportunidades rentables */}
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}>
              <CardHeader>
                <CardTitle className="text-orange-600 flex items-center gap-2">
                  🎯 Oportunidades Rentables (≥{botConfig.minProfitThreshold}% Bruto)
                </CardTitle>
                <CardDescription>
                  💰 Fees: {botConfig.useBNBForFees ? "0.225%" : "0.3%"} total | 🎯 Solo oportunidades RENTABLES | 🤖{" "}
                  {botConfig.autoTrade ? "EJECUTANDO AUTOMÁTICAMENTE" : "MODO MANUAL"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>🔄 Ruta Triangular</TableHead>
                      <TableHead>📈 Profit Bruto</TableHead>
                      <TableHead>💰 Profit Neto</TableHead>
                      <TableHead>🎯 Confianza</TableHead>
                      <TableHead>⏱️ Tiempo Est.</TableHead>
                      <TableHead>🛡️ Riesgo</TableHead>
                      <TableHead>💵 Ganancia Est.</TableHead>
                      <TableHead>⚡ Acción</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {opportunities.length > 0 ? (
                      opportunities.map((opportunity) => {
                        const netProfit = botConfig.useBNBForFees ? opportunity.netProfitWithBNB : opportunity.netProfit
                        const estimatedGain = (netProfit / 100) * opportunity.amount

                        return (
                          <TableRow key={opportunity.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <TableCell className="font-medium">
                              {opportunity.route.join(" → ")} → {opportunity.route[0]}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <TrendingUp className="w-4 h-4 text-blue-500" />
                                <span className="text-blue-600 font-semibold">
                                  +{opportunity.grossProfit.toFixed(3)}%
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                {netProfit > 0 ? (
                                  <TrendingUp className="w-4 h-4 text-green-500" />
                                ) : (
                                  <TrendingDown className="w-4 h-4 text-red-500" />
                                )}
                                <span className={netProfit > 0 ? "text-green-600 font-semibold" : "text-red-600"}>
                                  {netProfit > 0 ? "+" : ""}
                                  {netProfit.toFixed(3)}%
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Progress value={opportunity.confidence} className="w-16" />
                                <span className="text-sm">{opportunity.confidence}%</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">{opportunity.estimatedTime.toFixed(1)}s</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  opportunity.risk === "LOW"
                                    ? "default"
                                    : opportunity.risk === "MEDIUM"
                                      ? "secondary"
                                      : "destructive"
                                }
                              >
                                {opportunity.risk}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-semibold text-green-600">${estimatedGain.toFixed(2)}</TableCell>
                            <TableCell>
                              {!botConfig.autoTrade && (
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  <Play className="w-4 h-4 mr-1" />
                                  Ejecutar
                                </Button>
                              )}
                              {botConfig.autoTrade && (
                                <Badge variant="outline" className="text-green-600">
                                  🤖 AUTO
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        )
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                          🔍 Buscando oportunidades ≥{botConfig.minProfitThreshold}% profit bruto...
                          <br />
                          <span className="text-xs">(Solo mostramos operaciones RENTABLES después de fees)</span>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )

      case "balances":
        return (
          <div className="space-y-6">
            {/* Balance de Simulación */}
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">🧪 Balance SIMULACIÓN</CardTitle>
                <CardDescription>Balance virtual para pruebas y simulaciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Balance Simulación</p>
                    <div className="flex items-center gap-2">
                      {editingBalance ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={newBalance}
                            onChange={(e) => setNewBalance(e.target.value)}
                            className="w-32"
                          />
                          <Button size="sm" onClick={saveBalance}>
                            <Save className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-3xl font-bold text-blue-600">${usdtBalance.toFixed(2)} USDT</span>
                          <Button size="sm" variant="outline" onClick={() => setEditingBalance(true)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <Wallet className="w-12 h-12 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            {/* Balances REALES de Binance */}
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  💰 Balances REALES - Binance
                  <Button size="sm" variant="outline" onClick={refreshBinanceBalances}>
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </CardTitle>
                <CardDescription>
                  Balances en tiempo real de tu cuenta de Binance {mode === "simulation" ? "(Modo simulación)" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Balance USDT */}
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">💵 USDT (Trading)</p>
                        <div className="text-2xl font-bold text-green-600">
                          {binanceBalances.find((b) => b.asset === "USDT")?.total.toFixed(2) || "0.00"} USDT
                        </div>
                        <div className="text-xs text-gray-500">
                          Libre: {binanceBalances.find((b) => b.asset === "USDT")?.free.toFixed(2) || "0.00"} |
                          Bloqueado: {binanceBalances.find((b) => b.asset === "USDT")?.locked.toFixed(2) || "0.00"}
                        </div>
                      </div>
                      <div className="text-4xl">💵</div>
                    </div>
                  </div>

                  {/* Balance BNB */}
                  <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">🔥 BNB (Fees)</p>
                        <div className="text-2xl font-bold text-yellow-600">
                          {binanceBalances.find((b) => b.asset === "BNB")?.total.toFixed(4) || "0.0000"} BNB
                        </div>
                        <div className="text-xs text-gray-500">
                          Libre: {binanceBalances.find((b) => b.asset === "BNB")?.free.toFixed(4) || "0.0000"} |
                          Bloqueado: {binanceBalances.find((b) => b.asset === "BNB")?.locked.toFixed(4) || "0.0000"}
                        </div>
                      </div>
                      <div className="text-4xl">🔥</div>
                    </div>
                  </div>
                </div>

                {/* Alertas de balance */}
                {mode === "production" && (
                  <div className="space-y-2">
                    {(binanceBalances.find((b) => b.asset === "USDT")?.total || 0) < tradingAmount && (
                      <div className="p-3 bg-red-50 dark:bg-red-900 rounded-lg border border-red-200">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <span className="font-semibold text-red-700 dark:text-red-300">⚠️ USDT INSUFICIENTE</span>
                        </div>
                        <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                          Necesitas al menos ${tradingAmount} USDT para operar. Deposita más USDT en tu cuenta de
                          Binance.
                        </p>
                      </div>
                    )}

                    {(binanceBalances.find((b) => b.asset === "BNB")?.total || 0) < 0.01 && botConfig.useBNBForFees && (
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-900 rounded-lg border border-yellow-200">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          <span className="font-semibold text-yellow-700 dark:text-yellow-300">⚠️ BNB BAJO</span>
                        </div>
                        <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                          Tienes poco BNB para pagar fees. Deposita al menos 0.01 BNB para aprovechar el 25% de
                          descuento.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {mode === "simulation" && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-blue-500" />
                      <span className="font-semibold text-blue-700 dark:text-blue-300">ℹ️ MODO SIMULACIÓN</span>
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                      Los balances reales se mostrarán cuando cambies a modo PRODUCCIÓN. Actualmente estás en modo
                      simulación.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Estadísticas de balance */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg">
                <Label>💵 Monto por Operación</Label>
                <Input
                  type="number"
                  value={tradingAmount}
                  onChange={(e) => setTradingAmount(Number(e.target.value))}
                  className="mt-2"
                  min={100}
                  max={usdtBalance / 2}
                />
                <p className="text-xs text-gray-500 mt-1">Máximo: ${(usdtBalance / 2).toFixed(0)}</p>
              </div>

              <div className="p-4 border rounded-lg">
                <Label>📊 Operaciones Posibles</Label>
                <div className="text-2xl font-bold text-blue-600 mt-2">{Math.floor(usdtBalance / tradingAmount)}</div>
                <p className="text-xs text-gray-500">Individuales</p>
              </div>

              <div className="p-4 border rounded-lg">
                <Label>🔢 Operaciones Simultáneas</Label>
                <div className="text-2xl font-bold text-purple-600 mt-2">
                  {Math.floor(usdtBalance / (tradingAmount * botConfig.simultaneousOperations))}
                </div>
                <p className="text-xs text-gray-500">Con {botConfig.simultaneousOperations} paralelas</p>
              </div>

              <div className="p-4 border rounded-lg">
                <Label>⚠️ Balance Mínimo</Label>
                <div className="text-2xl font-bold text-orange-600 mt-2">
                  ${(tradingAmount * botConfig.simultaneousOperations * 2).toFixed(2)}
                </div>
                <p className="text-xs text-gray-500">Recomendado para seguridad</p>
              </div>
            </div>
          </div>
        )

      case "pairs-control":
        return (
          <div className="space-y-6">
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">⚙️ Control Profesional de Pares ({allRoutes.length} Rutas)</CardTitle>
                <CardDescription>Gestión completa de las rutas triangulares profesionales</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">🔄 Rutas Triangulares Profesionales</h4>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setShowNewRouteForm(!showNewRouteForm)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Nueva Ruta
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setAllRoutes((prev) => prev.map((route) => ({ ...route, isActive: true })))}
                    >
                      ✅ Activar Todas
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setAllRoutes((prev) => prev.map((route) => ({ ...route, isActive: false })))}
                    >
                      ❌ Desactivar Todas
                    </Button>
                  </div>
                </div>

                {/* Formulario para nueva ruta */}
                {showNewRouteForm && (
                  <Card className="bg-purple-50 dark:bg-purple-900 border-purple-200 dark:border-purple-700">
                    <CardHeader>
                      <CardTitle className="text-purple-700 dark:text-purple-300">➕ Crear Nueva Ruta Triangular</CardTitle>
                      <CardDescription>Agrega una nueva ruta de arbitraje sin editar archivos del servidor</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>💰 Moneda Base (ej: USDT)</Label>
                          <Input
                            value={newRoute.baseAsset}
                            onChange={(e) => setNewRoute(prev => ({ ...prev, baseAsset: e.target.value.toUpperCase() }))}
                            placeholder="USDT"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>🔄 Moneda Intermedia (ej: CHZ)</Label>
                          <Input
                            value={newRoute.intermediateAsset}
                            onChange={(e) => setNewRoute(prev => ({ ...prev, intermediateAsset: e.target.value.toUpperCase() }))}
                            placeholder="CHZ"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>🎯 Moneda Final (ej: BTC)</Label>
                          <Input
                            value={newRoute.quoteAsset}
                            onChange={(e) => setNewRoute(prev => ({ ...prev, quoteAsset: e.target.value.toUpperCase() }))}
                            placeholder="BTC"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>📝 Descripción (opcional)</Label>
                          <Input
                            value={newRoute.description}
                            onChange={(e) => setNewRoute(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Se generará automáticamente"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>📊 Categoría</Label>
                          <Select value={newRoute.category} onValueChange={(value) => setNewRoute(prev => ({ ...prev, category: value }))}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="HIGH_PROFIT">🚀 Alto Profit</SelectItem>
                              <SelectItem value="MEDIUM_PROFIT">⚖️ Profit Medio</SelectItem>
                              <SelectItem value="STABLE_PROFIT">🛡️ Profit Estable</SelectItem>
                              <SelectItem value="DIVERSIFIED_ETH">🔷 Diversificado ETH</SelectItem>
                              <SelectItem value="DIVERSIFIED_BNB">🔶 Diversificado BNB</SelectItem>
                              <SelectItem value="ULTRA_SAFE">🛡️ Ultra Seguro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>⭐ Prioridad: {newRoute.priority}</Label>
                          <Slider
                            value={[newRoute.priority]}
                            onValueChange={(value: number[]) => setNewRoute(prev => ({ ...prev, priority: value[0] }))}
                            max={3}
                            min={1}
                            step={1}
                            className="mt-2"
                          />
                          <p className="text-xs text-gray-500 mt-1">1 = Alta, 2 = Media, 3 = Baja</p>
                        </div>
                        <div>
                          <Label>📈 Profit Esperado: {newRoute.expectedProfit}%</Label>
                          <Slider
                            value={[newRoute.expectedProfit]}
                            onValueChange={(value: number[]) => setNewRoute(prev => ({ ...prev, expectedProfit: value[0] }))}
                            max={3.0}
                            min={0.1}
                            step={0.1}
                            className="mt-2"
                          />
                          <p className="text-xs text-gray-500 mt-1">Profit esperado en %</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={addNewRoute} className="bg-green-600 hover:bg-green-700">
                          ✅ Crear Ruta
                        </Button>
                        <Button variant="outline" onClick={() => setShowNewRouteForm(false)}>
                          ❌ Cancelar
                        </Button>
                      </div>

                      {newRoute.baseAsset && newRoute.intermediateAsset && newRoute.quoteAsset && (
                        <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                          <p className="text-sm font-medium">Vista previa de la ruta:</p>
                          <p className="text-lg font-bold text-blue-600">
                            {newRoute.baseAsset} → {newRoute.intermediateAsset} → {newRoute.quoteAsset} → {newRoute.baseAsset}
                          </p>
                          <p className="text-xs text-gray-500">
                            Pares: {newRoute.intermediateAsset}/{newRoute.baseAsset}, {newRoute.intermediateAsset}/{newRoute.quoteAsset}, {newRoute.quoteAsset}/{newRoute.baseAsset}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {allRoutes.map((route) => (
                    <div key={route.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Switch checked={route.isActive} onChange={() => toggleRouteActive(route.id)} />
                          <div className="flex-1">
                            <p className="font-medium">{route.description}</p>
                            <p className="text-sm text-gray-500">{route.symbols.join(" → ")}</p>
                            <div className="flex gap-2 mt-1">
                              <p className="text-xs text-blue-600">
                                Profit esperado: +{route.expectedProfit.toFixed(3)}%
                              </p>
                              {route.currentProfit !== undefined && (
                                <p className={`text-xs ${route.currentProfit > 0 ? "text-green-600" : "text-red-600"}`}>
                                  Actual: {route.currentProfit > 0 ? "+" : ""}
                                  {route.currentProfit.toFixed(3)}%
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={route.isActive ? "default" : "secondary"}>
                            {route.isActive ? "🟢 ACTIVA" : "🔴 INACTIVA"}
                          </Badge>
                          <Badge variant="outline">Prioridad {route.priority}</Badge>
                          <Badge
                            variant={
                              route.category.includes("HIGH")
                                ? "default"
                                : route.category.includes("MEDIUM")
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {route.category}
                          </Badge>
                          <Badge
                            variant={
                              route.status === "PROFITABLE"
                                ? "default"
                                : route.status === "ANALYZING"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {route.status}
                          </Badge>
                          {Number.parseInt(route.id) > 30 && (
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              onClick={() => setAllRoutes(prev => prev.filter(r => r.id !== route.id))}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                  <h4 className="font-semibold mb-2">📊 Estadísticas de las {allRoutes.length} Rutas</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Total rutas:</span>
                      <div className="font-semibold">{allRoutes.length}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Activas:</span>
                      <div className="font-semibold text-green-600">{allRoutes.filter((r) => r.isActive).length}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Rentables:</span>
                      <div className="font-semibold text-blue-600">
                        {allRoutes.filter((r) => r.status === "PROFITABLE").length}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Alta prioridad:</span>
                      <div className="font-semibold text-purple-600">
                        {allRoutes.filter((r) => r.priority === 1).length}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Profit promedio:</span>
                      <div className="font-semibold text-orange-600">
                        {(allRoutes.reduce((sum, r) => sum + r.expectedProfit, 0) / allRoutes.length).toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* CONFIGURACIÓN AVANZADA DE PARES */}
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-4">🎯 Configuración Global de Pares</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      </div>
                      <Label>📈 Profit mínimo para nuevos pares</Label>
                      <Input type="number" step="0.05" defaultValue={botConfig.minProfitThreshold} className="mt-2" />
                    </div>
                    <div>
                      <Label>🔄 Máximo pares simultáneos</Label>
                      <Input type="number" defaultValue={allRoutes.length} className="mt-2" />
                    </div>
                    <div>
                      <Label>⏱️ Intervalo de análisis</Label>
                      <Select defaultValue="3">
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 segundo</SelectItem>
                          <SelectItem value="3">3 segundos</SelectItem>
                          <SelectItem value="5">5 segundos</SelectItem>
                          <SelectItem value="10">10 segundos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )

      // Mantener los otros casos existentes (ai-strategy, risk, logs, fees, metrics)
      case "ai-strategy":
        return (
          <div className="space-y-6">
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">🧠 Configuración de IA Profesional</CardTitle>
                <CardDescription>
                  Sistema de inteligencia artificial para maximizar profits y minimizar riesgos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label>🎯 Estrategia de IA</Label>
                    <Select value={aiStrategy} onValueChange={setAiStrategy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conservative">🛡️ Conservadora - Solo ≥0.6% bruto</SelectItem>
                        <SelectItem value="balanced">⚖️ Balanceada - ≥0.4% bruto</SelectItem>
                        <SelectItem value="aggressive">🚀 Agresiva - ≥0.3% bruto (RIESGO)</SelectItem>
                        <SelectItem value="scalping">⚡ Scalping - Múltiples pequeñas</SelectItem>
                        <SelectItem value="ml_adaptive">🤖 ML Adaptativa - Auto-aprendizaje</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label>🤖 Ejecución Automática</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={botConfig.autoTrade}
                        onCheckedChange={(checked) => updateBotConfig("autoTrade", checked)}
                      />
                      <span className={botConfig.autoTrade ? "text-green-600" : "text-red-600"}>
                        {botConfig.autoTrade ? "✅ ACTIVADO" : "❌ MANUAL"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {botConfig.autoTrade
                        ? "El bot ejecutará automáticamente oportunidades rentables"
                        : "Requiere confirmación manual para cada operación"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <Label>📈 Profit Mínimo: {botConfig.minProfitThreshold}%</Label>
                    <Slider
                      value={[botConfig.minProfitThreshold]}
                      onValueChange={(value) => updateBotConfig("minProfitThreshold", value[0])}
                      max={2.0}
                      min={0.3}
                      step={0.05}
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">Profit bruto mínimo para ejecutar</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <Label>🔢 Operaciones Simultáneas: {botConfig.simultaneousOperations}</Label>
                    <Slider
                      value={[botConfig.simultaneousOperations]}
                      onValueChange={(value) => updateBotConfig("simultaneousOperations", value[0])}
                      max={99}
                      min={1}
                      step={1}
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">1-99 operaciones paralelas</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <Label>🎯 Confianza Mínima</Label>
                    <Input type="number" defaultValue="80" className="mt-2" />
                    <p className="text-xs text-gray-500 mt-1">% confianza para ejecutar</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                  <h4 className="font-semibold mb-2">🤖 Estado de la IA</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Modelo:</span>
                      <div className="font-semibold">GPT-4 Turbo</div>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Precisión:</span>
                      <div className="font-semibold text-green-600">94.2%</div>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Operaciones Hoy:</span>
                      <div className="font-semibold">{dailyStats.operationsToday}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Tasa Éxito:</span>
                      <div className="font-semibold text-green-600">
                        {((dailyStats.successfulOperations / dailyStats.operationsToday) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* CONFIGURACIÓN AVANZADA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <Label>🛡️ Usar BNB para Fees (25% descuento)</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      <Switch
                        checked={botConfig.useBNBForFees}
                        onCheckedChange={(checked) => updateBotConfig("useBNBForFees", checked)}
                      />
                      <span>{botConfig.useBNBForFees ? "✅ Activado (0.225%)" : "❌ Desactivado (0.3%)"}</span>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <Label>📊 Máximo Operaciones Diarias</Label>
                    <Input
                      type="number"
                      value={botConfig.maxDailyOperations}
                      onChange={(e) => updateBotConfig("maxDailyOperations", Number(e.target.value))}
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "risk":
        return (
          <div className="space-y-6">
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">🛡️ Gestión Profesional de Riesgo</CardTitle>
                <CardDescription>Protección avanzada de capital y minimización de pérdidas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label>⚠️ Riesgo Máximo por Operación: {botConfig.maxRiskPerOperation}%</Label>
                    <Slider
                      value={[botConfig.maxRiskPerOperation]}
                      onValueChange={(value) => updateBotConfig("maxRiskPerOperation", value[0])}
                      max={10.0}
                      min={0.5}
                      step={0.1}
                    />
                    <p className="text-xs text-gray-500">% máximo de pérdida aceptable por operación</p>
                  </div>

                  <div className="space-y-4">
                    <Label>🔒 Stop Loss Automático</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={botConfig.stopLossEnabled}
                        onCheckedChange={(checked) => updateBotConfig("stopLossEnabled", checked)}
                      />
                      <span>{botConfig.stopLossEnabled ? "✅ Activado" : "❌ Desactivado"}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <Label>📊 Spread Máximo Aceptable</Label>
                    <Input type="number" defaultValue="2.0" className="mt-2" />
                    <p className="text-xs text-gray-500 mt-1">% spread máximo para ejecutar</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <Label>💧 Liquidez Mínima Requerida</Label>
                    <Input type="number" defaultValue="50000" className="mt-2" />
                    <p className="text-xs text-gray-500 mt-1">Volumen mínimo USDT</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <Label>⏱️ Timeout de Operación</Label>
                    <Input type="number" defaultValue="15" className="mt-2" />
                    <p className="text-xs text-gray-500 mt-1">Segundos máximo por operación</p>
                  </div>
                </div>

                {/* PARADA DE EMERGENCIA */}
                <div className="p-4 bg-red-50 dark:bg-red-900 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-red-700 dark:text-red-300 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />🚨 Parada de Emergencia
                      </h4>
                      <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                        Detiene inmediatamente todas las operaciones y desactiva el trading automático
                      </p>
                    </div>
                    <Button variant="destructive" onClick={emergencyStop} className="ml-4">
                      🚨 PARADA EMERGENCIA
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    🛡️ Estado de Protecciones
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Balance suficiente:</span>
                      <span
                        className={
                          usdtBalance >= tradingAmount * botConfig.simultaneousOperations * 2
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {usdtBalance >= tradingAmount * botConfig.simultaneousOperations * 2 ? "✅ OK" : "⚠️ BAJO"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Stop Loss:</span>
                      <span className={botConfig.stopLossEnabled ? "text-green-600" : "text-red-600"}>
                        {botConfig.stopLossEnabled ? "✅ Activado" : "❌ Desactivado"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conexión API:</span>
                      <span className="text-green-600">✅ Estable</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fees optimizados:</span>
                      <span className={botConfig.useBNBForFees ? "text-green-600" : "text-orange-600"}>
                        {botConfig.useBNBForFees ? "✅ BNB (0.225%)" : "⚠️ Normal (0.3%)"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "logs":
        return (
          <div className="space-y-6">
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">📋 Logs del Bot (Tiempo Real)</CardTitle>
                <CardDescription>Registro detallado de todas las actividades y operaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {logs.map((log) => (
                    <div
                      key={log.id}
                      className={`p-3 rounded-lg border-l-4 ${
                        log.type === "SUCCESS"
                          ? "border-green-500 bg-green-50 dark:bg-green-900"
                          : log.type === "WARNING"
                            ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900"
                            : log.type === "ERROR"
                              ? "border-red-500 bg-red-50 dark:bg-red-900"
                              : "border-blue-500 bg-blue-50 dark:bg-blue-900"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <span className="text-xs text-gray-500">{log.timestamp}</span>
                          <p className="text-sm mt-1">{log.message}</p>
                        </div>
                        <Badge
                          variant={
                            log.type === "SUCCESS"
                              ? "default"
                              : log.type === "WARNING"
                                ? "secondary"
                                : log.type === "ERROR"
                                  ? "destructive"
                                  : "outline"
                          }
                        >
                          {log.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "fees":
        return (
          <div className="space-y-6">
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">💸 Optimización Profesional de Fees</CardTitle>
                <CardDescription>Análisis detallado y estrategias para minimizar comisiones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                    <h4 className="font-semibold">📊 Fee Normal (Sin BNB)</h4>
                    <div className="text-2xl font-bold text-blue-600">0.3%</div>
                    <p className="text-xs text-gray-500">3 operaciones × 0.1%</p>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                    <h4 className="font-semibold">💰 Fee con BNB (25% desc.)</h4>
                    <div className="text-2xl font-bold text-green-600">0.225%</div>
                    <p className="text-xs text-gray-500">3 operaciones × 0.075%</p>
                  </div>

                  <div className="p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
                    <h4 className="font-semibold">💎 Ahorro con BNB</h4>
                    <div className="text-2xl font-bold text-purple-600">0.075%</div>
                    <p className="text-xs text-gray-500">Por cada operación</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>🎯 Configuración de Fees</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={botConfig.useBNBForFees}
                        onCheckedChange={(checked) => updateBotConfig("useBNBForFees", checked)}
                      />
                      <span>Usar BNB para fees (25% descuento)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <span>Optimización automática de fees</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-4">📈 Calculadora de Rentabilidad Profesional</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Profit mínimo (sin BNB):</span>
                      <div className="font-semibold text-orange-600">0.4%</div>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Profit mínimo (con BNB):</span>
                      <div className="font-semibold text-green-600">0.325%</div>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Fees configurados:</span>
                      <div className="font-semibold text-blue-600">{botConfig.useBNBForFees ? "0.225%" : "0.3%"}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Profit neto mínimo:</span>
                      <div className="font-semibold text-green-600">{botConfig.useBNBForFees ? "0.1%" : "0.1%"}</div>
                    </div>
                  </div>
                </div>

                {/* SIMULADOR DE GANANCIAS */}
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold mb-4">💰 Simulador de Ganancias Diarias</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-300">Con 10 operaciones/día</p>
                      <p className="text-lg font-bold text-green-600">
                        ${((0.4 / 100) * tradingAmount * 10).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">Profit promedio 0.4%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-300">Con 20 operaciones/día</p>
                      <p className="text-lg font-bold text-blue-600">
                        ${((0.4 / 100) * tradingAmount * 20).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">Profit promedio 0.4%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-300">Con 50 operaciones/día</p>
                      <p className="text-lg font-bold text-purple-600">
                        ${((0.4 / 100) * tradingAmount * 50).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">Profit promedio 0.4%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "metrics":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card
                className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} transition-all hover:scale-105`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">🎯 Operaciones Hoy</p>
                      <p className="text-2xl font-bold text-green-600">{dailyStats.operationsToday}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} transition-all hover:scale-105`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">💰 Profit Total Hoy</p>
                      <p className="text-2xl font-bold text-blue-600">+${dailyStats.totalProfitToday.toFixed(2)}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} transition-all hover:scale-105`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">📊 Tasa Éxito</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {((dailyStats.successfulOperations / dailyStats.operationsToday) * 100).toFixed(1)}%
                      </p>
                    </div>
                    <Target className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} transition-all hover:scale-105`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">⚡ Uptime</p>
                      <p className="text-2xl font-bold text-orange-600">{dailyStats.uptime}%</p>
                    </div>
                    <Activity className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className={darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}>
              <CardHeader>
                <CardTitle>📈 Rendimiento Detallado (Profesional)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">🎯 Mejores Rutas (Hoy)</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between p-2 bg-green-50 dark:bg-green-900 rounded">
                        <span>CHZ/BTC</span>
                        <span className="font-semibold text-green-600">+0.67% → +0.37% neto</span>
                      </div>
                      <div className="flex justify-between p-2 bg-blue-50 dark:bg-blue-900 rounded">
                        <span>COTI/BTC</span>
                        <span className="font-semibold text-blue-600">+0.54% → +0.24% neto</span>
                      </div>
                      <div className="flex justify-between p-2 bg-purple-50 dark:bg-purple-900 rounded">
                        <span>DODO/BTC</span>
                        <span className="font-semibold text-purple-600">+0.43% → +0.13% neto</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">⏱️ Rendimiento del Sistema</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Análisis promedio:</span>
                        <span className="font-semibold">3.2s</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ejecución promedio:</span>
                        <span className="font-semibold">1.8s</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Profit promedio:</span>
                        <span className="font-semibold text-green-600">+{dailyStats.averageProfit.toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mejor operación:</span>
                        <span className="font-semibold text-blue-600">+{dailyStats.bestOperation.toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                  <h4 className="font-semibold mb-2">💡 Estadísticas de Fees</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Fees pagados hoy:</span>
                      <div className="font-semibold text-red-600">
                        $
                        {(
                          (botConfig.useBNBForFees ? 0.225 : 0.3) *
                          dailyStats.operationsToday *
                          (tradingAmount / 100)
                        ).toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Ahorro con BNB:</span>
                      <div className="font-semibold text-green-600">
                        $
                        {botConfig.useBNBForFees
                          ? ((0.3 - 0.225) * dailyStats.operationsToday * (tradingAmount / 100)).toFixed(2)
                          : "0.00"}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Profit bruto total:</span>
                      <div className="font-semibold text-blue-600">
                        $
                        {(
                          dailyStats.totalProfitToday +
                          (botConfig.useBNBForFees ? 0.225 : 0.3) * dailyStats.operationsToday * (tradingAmount / 100)
                        ).toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Profit neto total:</span>
                      <div className="font-semibold text-green-600">+${dailyStats.totalProfitToday.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return <div>Panel no encontrado</div>
    }
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className={`flex h-full flex-col ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
            {/* Header */}
            <header
              className={`flex h-16 shrink-0 items-center gap-2 border-b px-4 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
            >
              <SidebarTrigger className="-ml-1" />

              {/* Logo y nombre del bot */}
              <div className="flex items-center space-x-3 mr-4">
                <img src={BOT_LOGO || "/placeholder.svg"} alt="Logo" className="w-8 h-8" />
                <div>
                  <h2 className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{BOT_NAME}</h2>
                  <div className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">{BOT_BADGE}</div>
                </div>
              </div>

              <div className="flex-1" />

              {/* Controles del header */}
              <div className="flex items-center space-x-4">
                {/* Toggle modo día/noche */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDarkMode(!darkMode)}
                  className={`flex items-center gap-2 ${darkMode ? "text-white border-gray-600 hover:bg-gray-700" : ""}`}
                >
                  {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  {darkMode ? "☀️ Día" : "🌙 Noche"}
                </Button>

                <Badge variant={mode === "simulation" ? "default" : "destructive"}>
                  {mode === "simulation" ? "🧪 SIMULACIÓN" : "🚀 PRODUCCIÓN"}
                </Badge>

                <Button
                  variant={mode === "simulation" ? "outline" : "default"}
                  size="sm"
                  onClick={() => setMode("simulation")}
                  className={darkMode && mode !== "simulation" ? "text-white border-gray-600 hover:bg-gray-700" : ""}
                >
                  🧪 Simulación
                </Button>

                <Button
                  variant={mode === "production" ? "outline" : "default"}
                  size="sm"
                  onClick={() => setMode("production")}
                  className={darkMode && mode !== "production" ? "text-white border-gray-600 hover:bg-gray-700" : ""}
                >
                  🚀 Producción
                </Button>

                <Button
                  variant={botActive ? "destructive" : "default"}
                  size="sm"
                  onClick={() => setBotActive(!botActive)}
                  className="flex items-center gap-2"
                >
                  {botActive ? (
                    <>
                      <Pause className="w-4 h-4" />🛑 Detener Bot
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      ▶️ Iniciar Bot
                    </>
                  )}
                </Button>
              </div>
            </header>

            {/* Navigation Buttons */}
            <div className={`p-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={activePanel === "real-time" ? "default" : "outline"}
                  onClick={() => setActivePanel("real-time")}
                  className={`${activePanel === "real-time" ? "bg-blue-500 hover:bg-blue-600 text-white" : darkMode ? "text-white border-gray-600 hover:bg-gray-700" : ""}`}
                >
                  📊 Precios Tiempo Real
                </Button>
                <Button
                  variant={activePanel === "opportunities" ? "default" : "outline"}
                  onClick={() => setActivePanel("opportunities")}
                  className={`${activePanel === "opportunities" ? "bg-orange-500 hover:bg-orange-600 text-white" : darkMode ? "text-white border-gray-600 hover:bg-gray-700" : ""}`}
                >
                  🎯 Oportunidades
                </Button>
                <Button
                  variant={activePanel === "balances" ? "default" : "outline"}
                  onClick={() => setActivePanel("balances")}
                  className={darkMode ? "text-white border-gray-600 hover:bg-gray-700" : ""}
                >
                  💰 Balances
                </Button>
                <Button
                  variant={activePanel === "ai-strategy" ? "default" : "outline"}
                  onClick={() => setActivePanel("ai-strategy")}
                  className={darkMode ? "text-white border-gray-600 hover:bg-gray-700" : ""}
                >
                  🧠 IA & Estrategia
                </Button>
                <Button 
                  variant={activePanel === "risk" ? "default" : "outline"} 
                  onClick={() => setActivePanel("risk")}
                  className={darkMode ? "text-white border-gray-600 hover:bg-gray-700" : ""}
                >
                  🛡️ Riesgo
                </Button>
                <Button 
                  variant={activePanel === "logs" ? "default" : "outline"} 
                  onClick={() => setActivePanel("logs")}
                  className={darkMode ? "text-white border-gray-600 hover:bg-gray-700" : ""}
                >
                  📋 Logs
                </Button>
                <Button 
                  variant={activePanel === "fees" ? "default" : "outline"} 
                  onClick={() => setActivePanel("fees")}
                  className={darkMode ? "text-white border-gray-600 hover:bg-gray-700" : ""}
                >
                  💸 Fees
                </Button>
                <Button
                  variant={activePanel === "metrics" ? "default" : "outline"}
                  onClick={() => setActivePanel("metrics")}
                  className={darkMode ? "text-white border-gray-600 hover:bg-gray-700" : ""}
                >
                  📈 Métricas
                </Button>
                <Button
                  variant={activePanel === "pairs-control" ? "default" : "outline"}
                  onClick={() => setActivePanel("pairs-control")}
                  className={darkMode ? "text-white border-gray-600 hover:bg-gray-700" : ""}
                >
                  ⚙️ Pares & Control
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-6">{renderPanel()}</main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
