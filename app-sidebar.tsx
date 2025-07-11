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

#Propósito general
El archivo define el componente AppSidebar, que es la barra lateral de navegación principal de la aplicación de YAGECOIN EXCHANGE. Este sidebar permite a los usuarios navegar entre las diferentes secciones clave de la plataforma, mostrando además información sobre la conexión actual con el exchange (Binance) y el estado de la estrategia de arbitraje con IA.

Desglose de la funcionalidad
1. Importaciones
Importa íconos de la librería lucide-react para dar representación visual a cada sección del menú.
Importa varios componentes UI relacionados con el sidebar desde "@/components/ui/sidebar".
2. Definición de menú
menuItems: Es un array de objetos donde cada objeto representa una sección del sidebar:
title: Nombre visible de la sección (incluye emojis para contexto visual).
url: Ancla o ruta a la que apunta el enlace.
icon: Ícono visual asociado a la sección.
isActive: Solo el primer ítem está marcado como activo por defecto.
3. Estructura del Sidebar
Usa el componente Sidebar con un diseño visual oscuro (bg-gray-900 text-white).
SidebarHeader:
Muestra el logo (emoji de robot 🤖) y el nombre del exchange.
Incluye un badge llamativo que indica el modo "Arbitraje IA Ultimate".
SidebarContent:
Dentro de un grupo, renderiza la lista de secciones del menú (menuItems).
Cada menú es un botón/enlace con los estilos adecuados para resaltar el activo y el hover.
SidebarFooter:
Muestra el estado de conexión con el exchange.
Indica que está conectado a Binance, el número de rutas profesionales y que está en "Modo IA".
Incluye una animación de punto verde para indicar conexión activa.
SidebarRail:
Componente decorativo o de soporte visual para el sidebar.
4. Estilos y usabilidad
Utiliza clases de Tailwind CSS para estilos modernos y responsivos.
Provee una experiencia visual atractiva, con énfasis en el estado de conexión y las opciones de navegación principales.
¿Qué no hace este archivo?
No gestiona el estado de navegación ni cambia la sección activa de manera dinámica (solo el primer ítem tiene isActive en este código).
No implementa lógica de negocio ni manejo de datos, solo la estructura y presentación del sidebar.
No maneja eventos de conexión real con el exchange, solo muestra información visual.
Resumen rápido
El archivo define el componente de barra lateral de la app, mostrando accesos rápidos a las secciones principales de la plataforma de arbitraje en Binance, con íconos, estilos atractivos, y una sección de estado de conexión destacando el modo de IA y las rutas profesionales.
