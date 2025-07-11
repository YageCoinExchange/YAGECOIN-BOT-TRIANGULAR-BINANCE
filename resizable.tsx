"use client"

import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }

## Análisis detallado de `resizable.tsx`

El archivo `resizable.tsx` define **componentes reutilizables de React** para construir paneles redimensionables ("resizables") en la interfaz de usuario, usando la librería [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels) como base. Estos componentes permiten crear layouts modernos donde el usuario puede ajustar el tamaño de distintas secciones de la pantalla de manera visual e interactiva.

---

## ¿Qué hace exactamente este archivo?

### 1. **Importaciones**
- **`GripVertical` (lucide-react):** Ícono de barras verticales usado para indicar que un área es "resizable" (se puede arrastrar).
- **`react-resizable-panels`:** Proporciona los componentes base para paneles redimensionables.
- **`cn` (from "@/lib/utils")**: Función utilitaria para combinar clases CSS condicionalmente.

---

### 2. **Componentes definidos**

#### a) `ResizablePanelGroup`
- **Función:** Es el contenedor principal de un grupo de paneles redimensionables.
- **Implementación:**  
  - Usa el componente `PanelGroup` de la librería base.
  - Añade estilos para que el grupo ocupe todo el alto y ancho, y para que soporte tanto disposición horizontal como vertical (cambia layout según la dirección del grupo).
  - Permite agregar clases adicionales mediante la prop `className`.
- **Propósito:** Agrupa varios paneles y gestiona la lógica de redimensionamiento entre ellos.

#### b) `ResizablePanel`
- **Función:** Es simplemente un alias directo de `ResizablePrimitive.Panel`.
- **Propósito:** Representa cada panel individual dentro del grupo y puede ser redimensionado por el usuario.

#### c) `ResizableHandle`
- **Función:** Renderiza el "handle" (zona de agarre) entre paneles, permitiendo al usuario arrastrar para cambiar el tamaño de los paneles adyacentes.
- **Props:**
    - `withHandle`: Si es `true`, muestra un ícono visual (`GripVertical`) que indica que el área es interactiva.
    - `className`: Para estilos personalizados.
- **Implementación:**
    - Usa `PanelResizeHandle` de la librería base.
    - Añade clases para el diseño visual y el foco accesible.
    - Si `withHandle` está activado, renderiza un pequeño recuadro con el ícono de barras verticales.
- **Propósito:** Mejora la UX y accesibilidad de la interfaz, haciendo evidente dónde el usuario puede arrastrar para redimensionar.

---

### 3. **Exportación**
Exporta los tres componentes: `ResizablePanelGroup`, `ResizablePanel`, y `ResizableHandle` para ser usados y combinados en cualquier parte de la aplicación.

---

## **Resumen funcional**

- Proporciona una **abstracción simple y estilizada** para implementar layouts de paneles redimensionables, permitiendo al usuario ajustar el tamaño de las distintas áreas de la UI.
- La integración de `withHandle` y el ícono mejora la usabilidad y la accesibilidad visual.
- No contiene lógica de negocio ni de almacenamiento de estados de tamaño, delegando todo al control de la librería base y los estados locales donde se utilicen estos componentes.

---

## **Ejemplo de uso típico**

```tsx
<ResizablePanelGroup direction="horizontal">
  <ResizablePanel>Panel Izquierdo</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel>Panel Derecho</ResizablePanel>
</ResizablePanelGroup>
