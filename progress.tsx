"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

## Análisis detallado de `progress.tsx`

El archivo `progress.tsx` define un **componente reutilizable de barra de progreso** en React, usando la librería [@radix-ui/react-progress](https://www.radix-ui.com/primitives/docs/components/progress) para manejar la accesibilidad y la lógica base. Este componente está preparado para ser usado en aplicaciones Next.js/React modernas y estilizado con utilidades (probablemente Tailwind CSS).

---

## ¿Qué hace exactamente?

### 1. **Importaciones**
- **React** y utilidades de tipos para refs/props.
- **@radix-ui/react-progress:** Librería de componentes accesibles para barras de progreso.
- **cn:** Función utilitaria para concatenar clases CSS de forma condicional.

### 2. **Componente `Progress`**
- Es un componente funcional que usa `React.forwardRef` para manejar referencias.
- **Props principales**:
  - **className:** Permite agregar clases CSS personalizadas.
  - **value:** El valor numérico de progreso (número entre 0 y 100), determina el avance de la barra.
  - **...props:** Todas las demás props estándar de `ProgressPrimitive.Root`.

- **Estructura interna**:
  - **ProgressPrimitive.Root:** Contenedor principal de la barra, con estilos:
    - `relative h-4 w-full overflow-hidden rounded-full bg-secondary`  
      (Barra horizontal, altura 4, bordes redondeados, color de fondo secundario, etc).
  - **ProgressPrimitive.Indicator:** Indicador visual del progreso.
    - Estilos: `h-full w-full flex-1 bg-primary transition-all`  
      (Toma todo el alto, color principal, transiciones suaves).
    - **Estilo dinámico:**  
      Usa la propiedad CSS `transform: translateX(-${100 - (value || 0)}%)` para mostrar el porcentaje de progreso de izquierda a derecha.

- **Accesibilidad:**  
  El uso de Radix UI garantiza que la barra de progreso sea accesible para lectores de pantalla.

### 3. **Exportación**
- Exporta solo el componente `Progress` para ser reutilizado en otras partes de la aplicación.

---

## **Resumen funcional**

- **Función:** Renderiza una barra de progreso horizontal, visualmente atractiva y accesible.
- **Personalización:** Se puede ajustar el valor de progreso y los estilos visuales.
- **Reutilizable:** Listo para integrarse en cualquier parte del proyecto que requiera mostrar progreso (cargas, procesos, métricas, etc).
- **Accesible:** Cumple estándares de accesibilidad gracias a Radix UI.

---

## **Ejemplo de uso**

```tsx
<Progress value={70} />
