"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Play, Pause, TrendingUp, Activity, DollarSign, Wallet, Bell, RefreshCw, AlertTriangle } from "lucide-react"

interface MobileAppProps {
  botActive: boolean
  setBotActive: (active: boolean) => void
  opportunities: any[]
  dailyStats: any
  usdtBalance: number
  botConfig: any
}

export function MobileApp({
  botActive,
  setBotActive,
  opportunities,
  dailyStats,
  usdtBalance,
  botConfig,
}: MobileAppProps) {
  const [notifications, setNotifications] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 max-w-md mx-auto">
      {/* Header Mobile */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">🤖 YAGECOIN BOT</h1>
          <p className="text-sm text-gray-400">Arbitraje IA Ultimate</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="text-white border-gray-600">
            <Bell className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" className="text-white border-gray-600">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Estado del Bot */}
      <Card className="bg-gray-800 border-gray-700 mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span>🔥 Estado del Bot</span>
            <Badge variant={botActive ? "default" : "destructive"}>{botActive ? "ACTIVO" : "PARADO"}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span>Trading Automático</span>
            <Switch checked={botConfig.autoTrade} />
          </div>
          <Button
            onClick={() => setBotActive(!botActive)}
            className={`w-full ${botActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
          >
            {botActive ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Detener Bot
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Iniciar Bot
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Oportunidades</p>
                <p className="text-lg font-bold text-green-500">{opportunities.length}</p>
              </div>
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Profit Hoy</p>
                <p className="text-lg font-bold text-blue-500">+${dailyStats.totalProfitToday.toFixed(2)}</p>
              </div>
              <DollarSign className="w-6 h-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Balance USDT</p>
                <p className="text-lg font-bold text-yellow-500">${usdtBalance.toFixed(0)}</p>
              </div>
              <Wallet className="w-6 h-6 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Operaciones</p>
                <p className="text-lg font-bold text-purple-500">{dailyStats.operationsToday}</p>
              </div>
              <Activity className="w-6 h-6 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Oportunidades Principales */}
      <Card className="bg-gray-800 border-gray-700 mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">🎯 Mejores Oportunidades</CardTitle>
        </CardHeader>
        <CardContent>
          {opportunities.slice(0, 3).map((opp, index) => (
            <div
              key={opp.id}
              className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0"
            >
              <div>
                <p className="text-sm font-medium">{opp.route.join("→")}</p>
                <p className="text-xs text-gray-400">Confianza: {opp.confidence}%</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-500">+{opp.grossProfit.toFixed(2)}%</p>
                <p className="text-xs text-gray-400">${((opp.netProfit / 100) * opp.amount).toFixed(2)}</p>
              </div>
            </div>
          ))}
          {opportunities.length === 0 && <p className="text-center text-gray-400 py-4">🔍 Buscando oportunidades...</p>}
        </CardContent>
      </Card>

      {/* Configuración Rápida */}
      <Card className="bg-gray-800 border-gray-700 mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">⚙️ Configuración Rápida</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Notificaciones</span>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Usar BNB para Fees</span>
            <Switch checked={botConfig.useBNBForFees} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Stop Loss</span>
            <Switch checked={botConfig.stopLossEnabled} />
          </div>
        </CardContent>
      </Card>

      {/* Alertas */}
      {usdtBalance < 1000 && (
        <Card className="bg-red-900 border-red-700 mb-4">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <div>
                <p className="text-sm font-medium text-red-300">Balance Bajo</p>
                <p className="text-xs text-red-400">Considera recargar USDT</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 mt-6">
        <p>Última actualización: {lastUpdate.toLocaleTimeString()}</p>
        <p>🔗 Conectado a Binance | 🎯 30 Rutas Activas</p>
      </div>
    </div>
  )
}
