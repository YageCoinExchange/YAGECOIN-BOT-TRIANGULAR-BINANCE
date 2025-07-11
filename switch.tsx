"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }


## Análisis detallado de `switch.tsx`

El archivo `switch.tsx` define un **componente reutilizable de React** llamado `Switch`, que implementa un interruptor (switch/toggle) de interfaz de usuario, similar al que se usa para activar o desactivar configuraciones. Este componente utiliza la librería [@radix-ui/react-switch](https://www.radix-ui.com/primitives/docs/components/switch) como base, asegurando accesibilidad y buenas prácticas de UI.

---

## ¿Qué hace exactamente este archivo?

### 1. **Importaciones**
- **React**: Para crear componentes y manejar referencias (`forwardRef`).
- **@radix-ui/react-switch**: Provee el comportamiento, accesibilidad y estructura semántica del interruptor.
- **cn**: Utilidad para combinar clases CSS condicionalmente (usualmente con Tailwind CSS u otro sistema de utilidades).

---

### 2. **Definición del componente `Switch`**

- **Uso de `forwardRef`**: Permite que el componente acepte y reenvíe referencias, útil para formularios y accesibilidad.
- **Props**:
  - Acepta todas las propiedades estándar de `SwitchPrimitives.Root` de Radix, incluyendo personalización de clases (`className`).
- **Estructura**:
  - `SwitchPrimitives.Root` es el contenedor principal del switch (el track).  
    - Aplica clases para tamaño, forma, transición, enfoque accesible (`focus-visible`), y color de fondo dinámico según el estado (`data-[state=checked]`).
  - `SwitchPrimitives.Thumb` es el "pulsador" o círculo que se mueve al activar/desactivar.
    - Está animado para trasladarse de un extremo al otro del track según el estado (`data-[state=checked]:translate-x-5`).

- **Personalización**:
  - Permite agregar clases adicionales mediante la prop `className`.
  - El diseño visual es moderno, con animación fluida, bordes redondeados y sombra.

---

### 3. **Accesibilidad y usabilidad**

- El componente hereda la accesibilidad de Radix UI, permitiendo interacción por teclado, foco visible y roles ARIA correctos.
- Puede ser utilizado en formularios como cualquier control nativo.

---

### 4. **Exportación**

- Exporta sólo el componente `Switch`, listo para usarse en cualquier parte de la aplicación.

---

## **Resumen funcional**

- Proporciona un **interruptor (toggle switch) moderno, accesible y personalizable** para activar/desactivar configuraciones en la UI.
- Listo para integrarse en formularios, paneles de usuario, dashboards, etc.
- Fácil de personalizar visualmente vía la prop `className`.

---

## **Ejemplo de uso**

```tsx
<Switch checked={value} onCheckedChange={setValue} />
