"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }


## Análisis detallado de `tabs.tsx`

El archivo `tabs.tsx` define un conjunto de **componentes reutilizables de React** para crear interfaces de pestañas (tabs) estilizadas y accesibles, utilizando como base la librería [@radix-ui/react-tabs](https://www.radix-ui.com/primitives/docs/components/tabs). Estos componentes están diseñados para proveer una experiencia consistente y flexible para la navegación por secciones o vistas dentro de una misma página.

---

## ¿Qué hace exactamente este archivo?

### 1. **Composición de componentes**

- **Tabs:**  
  Es un alias directo de `TabsPrimitive.Root`. Es el contenedor principal que gestiona el estado y la lógica de las pestañas.

- **TabsList:**  
  Wrapper para la lista de botones/pestañas (`TabsPrimitive.List`).  
  - Aplica estilos visuales:  
    - `inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground`
    - Esto crea una barra horizontal, con fondo, bordes redondeados y padding.
  - Permite añadir clases extras mediante `className`.

- **TabsTrigger:**  
  Wrapper para cada "pestaña" individual (`TabsPrimitive.Trigger`).  
  - Estiliza cada pestaña con:
    - Espaciado (`px-3 py-1.5`), tipografía, transición de color, y estados de foco/accesibilidad.
    - Cambios visuales cuando la pestaña está activa o se enfoca.
  - Soporta personalización vía `className`.

- **TabsContent:**  
  Wrapper para el contenido que se muestra cuando una pestaña está activa (`TabsPrimitive.Content`).  
  - Aplica margen superior y estilos de foco para accesibilidad.
  - Permite personalización por clases.

---

### 2. **Accesibilidad y usabilidad**

- Al estar basado en Radix UI, todos los componentes implementan roles ARIA correctamente, navegación por teclado y gestión de foco.
- Los estilos aseguran que el usuario pueda identificar claramente la pestaña activa y navegar de manera fluida.

---

### 3. **Personalización**

- Todos los componentes aceptan la prop `className` para adaptar estilos según las necesidades del proyecto.
- Los estilos base están pensados para integrarse con sistemas de diseño modernos (por ejemplo, Tailwind CSS).

---

## **Resumen funcional**

- Permite construir **interfaces de pestañas profesionales, accesibles y personalizables**.
- Facilita dividir contenido en secciones dentro de una misma página, mejorando la experiencia de usuario.
- Listo para integrarse en dashboards, formularios extensos, paneles de configuración, etc.

---

## **Ejemplo de uso**

```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Pestaña 1</TabsTrigger>
    <TabsTrigger value="tab2">Pestaña 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Contenido de la pestaña 1</TabsContent>
  <TabsContent value="tab2">Contenido de la pestaña 2</TabsContent>
</Tabs>
