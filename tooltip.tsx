"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }


## Análisis detallado de `tooltip.tsx`

El archivo `tooltip.tsx` define un conjunto de **componentes reutilizables de React** para crear tooltips (cuadros de texto flotantes que aparecen al pasar el mouse o enfocar un elemento), utilizando como base la librería [@radix-ui/react-tooltip](https://www.radix-ui.com/primitives/docs/components/tooltip). Está diseñado para facilitar la integración de tooltips accesibles, personalizables y visualmente consistentes en una aplicación React/Next.js.

---

## ¿Qué hace exactamente este archivo?

### 1. **Importaciones**
- **React:** Para la creación y manipulación de componentes.
- **@radix-ui/react-tooltip:** Provee la lógica, accesibilidad y estructura base del tooltip.
- **cn:** Utilidad para combinar clases CSS de manera condicional (probablemente relacionada con Tailwind CSS).

---

### 2. **Componentes Exportados**

- **TooltipProvider:**  
  Proveedor de contexto para tooltips. Se usa para envolver una sección donde se necesite manejar tooltips, permitiendo que compartan comportamiento y configuración global.

- **Tooltip:**  
  Componente raíz que gestiona el estado de visibilidad del tooltip (apertura/cierre). Actúa como contenedor principal de cada tooltip.

- **TooltipTrigger:**  
  Componente que envuelve el elemento interactivo (por ejemplo, un botón o icono) que al ser enfocado o hovered, dispara la aparición del tooltip.

- **TooltipContent:**  
  Componente que representa el contenido visible del tooltip.  
  - Usa `React.forwardRef` para permitir referencias externas (accesibilidad y animaciones).
  - Permite personalizar la posición mediante la prop `sideOffset` (desplazamiento respecto al trigger, por defecto 4px).
  - Aplica una serie de clases para:
    - Fondo, borde y color de texto.
    - Padding y tamaño de fuente.
    - Sombras y animaciones de entrada/salida.
    - Z-index alto para que el tooltip no quede tapado por otros elementos.
  - Permite agregar clases adicionales mediante la prop `className`.

---

### 3. **Características clave**

- **Accesibilidad:**  
  Hereda la accesibilidad y el manejo de foco de Radix UI, asegurando que los tooltips sean navegables por teclado y funcionen bien para usuarios de tecnologías asistivas.
- **Animaciones y estilos:**  
  El tooltip aparece y desaparece con animaciones suaves, tiene fondo y borde personalizados, y un z-index alto para evitar problemas de superposición.
- **Flexibilidad:**  
  Permite ajustar el desplazamiento (`sideOffset`) y personalizar estilos fácilmente.

---

## **Resumen funcional**

- **Función principal:**  
  Permitir agregar tooltips accesibles y estilizados a cualquier elemento de la interfaz, de manera sencilla y consistente.
- **Estructura modular:**  
  Los componentes pueden ser usados juntos para crear tooltips en cualquier parte de la aplicación.

---

## **Ejemplo de uso**

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <button>Info</button>
    </TooltipTrigger>
    <TooltipContent>
      Este botón muestra información adicional.
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
