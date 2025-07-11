"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3 min-w-10",
        sm: "h-9 px-2.5 min-w-9",
        lg: "h-11 px-5 min-w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }


## Análisis detallado de `toggle.tsx`

El archivo `toggle.tsx` implementa un **componente de React reutilizable** llamado `Toggle`, que sirve como un botón con estado on/off (toggle button) y que puede ser personalizado en variante visual y tamaño. El componente está enfocado en la accesibilidad, el diseño moderno y la reutilización, usando como base la librería [@radix-ui/react-toggle](https://www.radix-ui.com/primitives/docs/components/toggle).

---

## ¿Qué hace exactamente este archivo?

### 1. **Importaciones**
- **React**: Para crear componentes y manejar referencias.
- **@radix-ui/react-toggle**: Proporciona la lógica y accesibilidad del toggle.
- **class-variance-authority (`cva`) y VariantProps**: Permite crear variantes de estilos (por ejemplo, tipos de borde, tamaños) de forma declarativa y reutilizable.
- **cn**: Función utilitaria para combinar clases CSS condicionalmente.

---

### 2. **Definición de variantes de estilos (`toggleVariants`)**

- Usa `cva` para definir estilos reutilizables según:
  - **`variant`**: Estilo general del botón (`default` o `outline`).
  - **`size`**: Tamaño del botón (`default`, `sm`, `lg`).
- Cada combinación de variante y tamaño aplica diferentes clases de Tailwind CSS para ajustar el aspecto visual y la interacción (hover, focus, etc).
- Los valores por defecto son `variant: "default"` y `size: "default"`.

---

### 3. **Componente `Toggle`**

- Utiliza `React.forwardRef` para permitir referencias externas (útil en formularios y manejo de foco).
- Combina las clases generadas por `toggleVariants` con clases adicionales pasadas por `className`.
- Acepta todas las props estándar del componente raíz de Radix, además de las variantes y tamaño definidos.
- La representación visual y el comportamiento del botón se adaptan automáticamente según las props `variant` y `size`.

---

### 4. **Exportación**

- Exporta el componente `Toggle` y las variantes (`toggleVariants`) para su uso en otros componentes o para crear grupos de toggles consistentes.

---

## **Resumen funcional**

- **Función principal:** Provee un botón con estado on/off, estilizado y accesible, que puede personalizarse fácilmente en tamaño y apariencia.
- **Accesibilidad:** Hereda la accesibilidad de Radix UI (roles, navegación por teclado, foco visible).
- **Personalización:** Permite adaptar la apariencia a diferentes contextos de UI sin duplicar código de estilos.
- **Reutilización:** Puede usarse solo o como parte de un grupo de toggles (por ejemplo, filtros, selecciones de vista, etc).

---

## **Ejemplo de uso**

```tsx
<Toggle variant="outline" size="lg" pressed={isActive} onPressedChange={setIsActive}>
  Activo
</Toggle>
