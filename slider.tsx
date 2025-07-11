"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }


## Análisis detallado de `slider.tsx`

El archivo `slider.tsx` define un **componente reutilizable de React** llamado `Slider` que implementa un control deslizante (slider) personalizado utilizando la librería [@radix-ui/react-slider](https://www.radix-ui.com/primitives/docs/components/slider). Este componente está diseñado para proporcionar una experiencia visual moderna, accesible y adaptable para seleccionar valores dentro de un rango, por ejemplo, ajustar volúmenes, porcentajes o configuraciones numéricas en una interfaz.

---

## ¿Qué hace exactamente este archivo?

### 1. **Importaciones**
- **React:** Para crear el componente y manejar referencias (`forwardRef`).
- **@radix-ui/react-slider:** Proporciona la funcionalidad base, accesibilidad y lógica de los sliders.
- **cn:** Función utilitaria para combinar clases CSS de manera condicional.

---

### 2. **Definición del componente `Slider`**

- **Uso de `forwardRef`:** Permite que el componente acepte y reenvíe una referencia a su elemento raíz, útil para integraciones avanzadas.
- **Props:** 
  - Acepta todas las propiedades estándar del componente base de Radix (`SliderPrimitive.Root`), además de permitir la personalización de clases (`className`).

- **Estructura interna:**
  - `SliderPrimitive.Root`: Contenedor principal del slider.
    - Clases: `relative flex w-full touch-none select-none items-center` para asegurar disposición horizontal, responsividad y evitar selecciones accidentales.
  - `SliderPrimitive.Track`: Barra de fondo del slider (toda la pista).
    - Clases: `relative h-2 w-full grow overflow-hidden rounded-full bg-secondary` para visual moderno y responsivo.
  - `SliderPrimitive.Range`: Barra que indica el rango seleccionado (la parte activa del slider).
    - Clases: `absolute h-full bg-primary` para destacar el rango seleccionado.
  - `SliderPrimitive.Thumb`: El "pulgar" o botón deslizante que el usuario puede arrastrar.
    - Clases: `block h-5 w-5 rounded-full border-2 border-primary bg-background` y estilos de foco para accesibilidad.

- **Personalización:**  
  Permite agregar estilos adicionales mediante la prop `className`.

---

### 3. **Accesibilidad y usabilidad**

- **Radix UI** asegura accesibilidad total: navegación por teclado, foco visual, roles ARIA, y soporte para lectores de pantalla.
- El componente es completamente controlado y puede integrarse en formularios o paneles de configuración.

---

### 4. **Exportación**

- Solo exporta el componente `Slider`, listo para ser utilizado en cualquier parte de la aplicación.

---

## **Resumen funcional**

- Proporciona un **slider visual, accesible y personalizable** para seleccionar valores dentro de un rango.
- Listo para usarse en formularios, dashboards, configuraciones de usuario, etc.
- Permite personalización avanzada vía clases CSS y props extendidas.

---

## **Ejemplo de uso**

```tsx
<Slider min={0} max={100} step={1} defaultValue={[50]} />
