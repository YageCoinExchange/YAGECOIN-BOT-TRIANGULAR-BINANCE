"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }

## Análisis detallado de `scroll-area.tsx`

El archivo `scroll-area.tsx` define dos componentes reutilizables de React: `ScrollArea` y `ScrollBar`. Estos componentes proporcionan una **zona de desplazamiento (scroll area) personalizada** y estilizada para la interfaz de usuario, utilizando como base la librería [@radix-ui/react-scroll-area](https://www.radix-ui.com/primitives/docs/components/scroll-area).

---

## ¿Qué hace exactamente este archivo?

### 1. **Componente `ScrollArea`**
- Es un wrapper (envoltorio) para el componente `ScrollAreaPrimitive.Root` de Radix.
- Permite personalizar clases CSS (`className`) y acepta referencias (`ref`).
- Dentro del área, renderiza:
    - **Viewport:** (`ScrollAreaPrimitive.Viewport`) que recibe los `children` (contenido desplazable) y se ajusta al tamaño completo del contenedor, heredando los bordes redondeados.
    - **ScrollBar:** Un scroll bar personalizado (definido abajo).
    - **Corner:** (`ScrollAreaPrimitive.Corner`) para manejar el caso donde hay tanto scroll horizontal como vertical.
- Aplica las clases `relative overflow-hidden` (y cualquier otra proporcionada por `className`) para el manejo visual y de layout.
- Es totalmente reutilizable y adaptable.

### 2. **Componente `ScrollBar`**
- Wrapper de `ScrollAreaPrimitive.ScrollAreaScrollbar` de Radix.
- Permite orientación vertical u horizontal (por defecto vertical).
- Aplica estilos visuales diferentes según la orientación:
    - Vertical: `h-full w-2.5 border-l ...`
    - Horizontal: `h-2.5 flex-col border-t ...`
- Usa un thumb (`ScrollAreaPrimitive.ScrollAreaThumb`) estilizado con borde redondeado y color (`bg-border`) para el "agarre" del scrollbar.
- Permite personalización adicional con `className`.
- Usa `forwardRef` para poder ser referenciado si es necesario.

### 3. **Utilidades**
- Usa la función `cn` para combinar clases CSS dinámicamente.
- Exporta ambos componentes para ser utilizados en cualquier parte de la aplicación.

---

## **Resumen funcional**

- **Facilita la creación de zonas de scroll personalizadas**, con barras de desplazamiento visualmente coherentes e integradas con el resto de la UI.
- **Reemplaza los scrollbars nativos** (que pueden ser inconsistentes entre navegadores y sistemas operativos) por versiones estilizadas y controladas.
- **Accesibilidad y flexibilidad:** Al estar basado en Radix, mantiene buenas prácticas de accesibilidad y permite personalización avanzada de estilos.

---

## **Ejemplo de uso típico**

```tsx
<ScrollArea className="h-64 w-96">
  <div>Contenido muy largo aquí...</div>
</ScrollArea>
