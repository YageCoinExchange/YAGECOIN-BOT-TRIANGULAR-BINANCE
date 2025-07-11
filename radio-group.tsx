"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }


## Análisis detallado de `radio-group.tsx`

El archivo `radio-group.tsx` define dos componentes reutilizables de React para construir **grupos de botones de opción (radio buttons)** personalizados, usando la librería [@radix-ui/react-radio-group](https://www.radix-ui.com/primitives/docs/components/radio-group) como base. Está optimizado para un diseño visual moderno y accesible.

---

## ¿Qué hace exactamente este archivo?

### 1. **Importaciones**
- **React**: Para crear componentes y manejar referencias (`forwardRef`).
- **@radix-ui/react-radio-group**: Provee los componentes accesibles y la lógica de grupo de radio.
- **Circle (lucide-react)**: Ícono SVG de círculo, usado como indicador visual del radio seleccionado.
- **cn**: Función utilitaria para combinar clases CSS condicionalmente.

---

### 2. **Componentes definidos**

#### a) `RadioGroup`
- **Función:** Es el contenedor principal para el grupo de radios.
- **Implementación:**  
  - Usa el componente `Root` de Radix UI.
  - Aplica un layout de grilla con separación (`grid gap-2`).
  - Permite modificar estilos mediante la prop `className`.
  - Usa `forwardRef` para compatibilidad con referencias.
- **Propósito:** Agrupa varios radios para que sólo uno pueda estar seleccionado a la vez (comportamiento estándar de radio group).

#### b) `RadioGroupItem`
- **Función:** Representa cada opción individual (botón de radio) dentro del grupo.
- **Implementación:**
  - Usa el componente `Item` de Radix UI.
  - Aplica estilos: forma circular, borde, color, foco accesible, tamaño fijo (`h-4 w-4`).
  - Usa el componente `Indicator` de Radix para mostrar el círculo interior (ícono `Circle`) cuando el radio está seleccionado.
  - Permite añadir clases personalizadas vía `className`.
  - Usa `forwardRef` para referencias.
- **Propósito:** Permite seleccionar una opción dentro del grupo, mostrando claramente cuál está activa.

---

### 3. **Accesibilidad**
Ambos componentes, al estar basados en Radix UI, cumplen con buenas prácticas de accesibilidad (navegación por teclado, roles ARIA, foco visual, etc).

---

### 4. **Exportación**
Se exportan ambos componentes (`RadioGroup`, `RadioGroupItem`) para ser usados en otras partes de la aplicación.

---

## **Resumen funcional**

- Permite construir **grupos de botones de opción** con estilos personalizados y accesibles.
- Cada grupo permite seleccionar solo una opción a la vez.
- El estilo y el indicador visual (círculo relleno) son consistentes y modernos.
- Es altamente reutilizable y fácil de integrar en formularios y paneles de configuración.

---

## **Ejemplo de uso**

```tsx
<RadioGroup defaultValue="option1">
  <RadioGroupItem value="option1" />
  <RadioGroupItem value="option2" />
  <RadioGroupItem value="option3" />
</RadioGroup>
