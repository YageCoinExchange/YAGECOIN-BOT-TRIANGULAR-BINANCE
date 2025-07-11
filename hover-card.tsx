"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }


#Propósito general
El archivo hover-card.tsx define una pequeña colección de componentes reutilizables de React para crear tarjetas de información flotante que aparecen al pasar el cursor (hover) sobre un elemento. Utiliza la librería @radix-ui/react-hover-card como base, lo que garantiza accesibilidad, control de estado y animaciones modernas.

Componentes definidos y su función
HoverCard

Es simplemente un alias de HoverCardPrimitive.Root.
Es el componente raíz que gestiona el estado y la lógica del hover-card.
HoverCardTrigger

Alias de HoverCardPrimitive.Trigger.
Es el elemento sobre el que el usuario debe pasar el cursor para activar la tarjeta flotante (por ejemplo, un botón, texto, imagen, etc.).
HoverCardContent

Componente personalizado basado en HoverCardPrimitive.Content.
Usa React.forwardRef para exponer la referencia del DOM y aceptar props adicionales.
Permite personalizar la alineación (align, por defecto "center") y el desplazamiento lateral (sideOffset, por defecto 4).
Añade estilos visuales modernos: fondo, bordes, padding, sombra, color de texto y animaciones de entrada/salida según el estado (data-[state=open], etc.).
La función cn se usa para combinar clases CSS dinámicamente, admitiendo personalización extra vía la prop className.
Características técnicas
Accesibilidad: Radix UI gestiona el foco, los eventos y la navegabilidad.
Estilizado: Usa clases utilitarias (probablemente de Tailwind CSS) para un look moderno y personalizable.
Animaciones: Permite animar la aparición y desaparición de la tarjeta flotante.
Composición: Los tres componentes se usan juntos para crear la experiencia de hover-card.
¿Qué NO hace este archivo?
No maneja lógica de negocio ni contenido propio; sólo estructura y estilos.
No contiene lógica adicional para datos ni integración con APIs.
No implementa lógica de cierre por clic fuera; eso es gestionado por Radix UI.
Ejemplo de uso
TSX
<HoverCard>
  <HoverCardTrigger>
    <span>Pasa el mouse aquí</span>
  </HoverCardTrigger>
  <HoverCardContent>
    <div>¡Esta es la información extra que aparece en hover!</div>
  </HoverCardContent>
</HoverCard>
En resumen:
El archivo hover-card.tsx provee una implementación lista para usar de tarjetas de información flotante (hover-cards) en React, asegurando accesibilidad, animaciones y una apariencia moderna y personalizable gracias a la integración con Radix UI y utilidades CSS. Es ideal para mostrar información adicional sobre elementos al pasar el cursor, sin necesidad de clics.
