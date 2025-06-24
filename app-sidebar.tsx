"use client"

import type * as React from "react"
import { TrendingUp, Wallet, Brain, Shield, FileText, DollarSign, BarChart3, Settings, Target } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "📊 Precios Tiempo Real",
    url: "#real-time",
    icon: TrendingUp,
    isActive: true,
  },
  {
    title: "🎯 Oportunidades",
    url: "#opportunities",
    icon: Target,
  },
  {
    title: "💰 Balances",
    url: "#balances",
    icon: Wallet,
  },
  {
    title: "🧠 IA & Estrategia",
    url: "#ai-strategy",
    icon: Brain,
  },
  {
    title: "🛡️ Riesgo",
    url: "#risk",
    icon: Shield,
  },
  {
    title: "📋 Logs",
    url: "#logs",
    icon: FileText,
  },
  {
    title: "💸 Fees",
    url: "#fees",
    icon: DollarSign,
  },
  {
    title: "📈 Métricas",
    url: "#metrics",
    icon: BarChart3,
  },
  {
    title: "⚙️ Pares & Control",
    url: "#pairs-control",
    icon: Settings,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" className="bg-gray-900 text-white" {...props}>
      <SidebarHeader className="border-b border-gray-700 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-4xl">🤖</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">YAGECOIN EXCHANGE 🤖</h2>
            <div className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">Arbitraje IA Ultimate</div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-gray-900">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    className="text-gray-300 hover:text-white hover:bg-gray-800 data-[active=true]:bg-blue-600 data-[active=true]:text-white"
                  >
                    <a href={item.url} className="flex items-center space-x-3 p-3">
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-700 p-4">
        <div className="text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Exchange conectado:</span>
          </div>
          <div className="font-semibold text-white mt-1">🔗 Binance</div>
          <div className="text-xs text-gray-500 mt-1">🎯 30 Rutas Profesionales | 🚀 Modo IA</div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
