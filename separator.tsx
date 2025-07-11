"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }

## Análisis detallado de `separator.tsx`

El archivo `separator.tsx` define un **componente reutilizable de React** llamado `Separator`, pensado para crear líneas divisorias (separadores) en la interfaz de usuario, usando la librería [@radix-ui/react-separator](https://www.radix-ui.com/primitives/docs/components/separator) como base.

---

## ¿Qué hace exactamente este archivo?

### 1. **Importaciones**
- **React**: Para crear componentes y referencias.
- **@radix-ui/react-separator**: Provee el componente base accesible y configurable para separadores.
- **cn**: Función utilitaria para combinar dinámicamente clases CSS.

---

### 2. **Definición del componente `Separator`**

- **Estructura**:
  - Utiliza `React.forwardRef` para permitir el uso de referencias en el componente.
  - El componente es un wrapper de `SeparatorPrimitive.Root` de Radix UI.

- **Props principales**:
  - `orientation`: Define si el separador es horizontal (`"horizontal"`, por defecto) o vertical (`"vertical"`).
  - `decorative`: Booleano que indica si el separador es solo decorativo (por defecto `true`), usado para accesibilidad.
  - `className`: Permite agregar clases CSS personalizadas.
  - `...props`: Permite pasar cualquier otra prop estándar de Radix.

- **Estilos**:
  - Siempre incluye `shrink-0 bg-border` para el color y que no se reduzca en flex layouts.
  - Si es horizontal: `h-[1px] w-full` (línea de 1px de alto, ancho completo).
  - Si es vertical: `h-full w-[1px]` (línea de 1px de ancho, alto completo).
  - Se pueden agregar estilos adicionales mediante `className`.

- **Accesibilidad**:
  - La prop `decorative` (por defecto `true`) indica si el separador es solo visual, evitando que sea anunciado por lectores de pantalla si no es relevante semánticamente.

---

### 3. **Exportación**
- Se exporta el componente `Separator` para ser utilizado en cualquier parte de la aplicación.

---

## **Resumen funcional**

- Permite agregar **líneas divisorias horizontales o verticales** en la UI, totalmente estilizadas y accesibles.
- Basado en Radix UI, mantiene buenas prácticas de accesibilidad y flexibilidad.
- El desarrollador puede personalizar orientación, estilos y semántica del separador fácilmente.

---

## **Ejemplo de uso**

```tsx
<Separator /> // Línea horizontal por defecto

<Separator orientation="vertical" className="mx-2" /> // Línea vertical con margen horizontal
