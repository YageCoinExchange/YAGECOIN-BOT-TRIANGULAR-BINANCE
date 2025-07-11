"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}


## Análisis detallado de `sheet.tsx`

El archivo `sheet.tsx` define una serie de **componentes reutilizables de React** para construir **"sheets"** (paneles deslizantes o "drawers") en la interfaz de usuario, utilizando como base la librería [@radix-ui/react-dialog](https://www.radix-ui.com/primitives/docs/components/dialog). Los sheets son paneles modales que aparecen desde un lado de la pantalla (derecha, izquierda, arriba o abajo) y se suelen usar para mostrar menús, formularios o información adicional sin abandonar la vista actual.

---

## ¿Qué hace exactamente este archivo?

### 1. **Componentes base importados y wrappers**

- **Sheet, SheetTrigger, SheetClose, SheetPortal**
  - Son aliases directos de los componentes de Radix Dialog (`Root`, `Trigger`, `Close`, `Portal`), que gestionan la estructura y el ciclo de vida del sheet.

- **SheetOverlay**
  - Renderiza una superposición oscura (`Overlay`) que cubre el resto de la pantalla cuando el sheet está abierto. Usa animaciones para aparecer/desaparecer y puede recibir clases personalizadas.

- **sheetVariants** (con `cva`)
  - Define variantes de estilos para el panel según el lado desde el que aparece (`right`, `left`, `top`, `bottom`).
  - Permite animaciones y estilos distintos para cada posición, usando utilidades de Tailwind y Radix.
  - Es altamente configurable y se usa para generar las clases del contenido del sheet.

---

### 2. **Componentes principales del sheet**

- **SheetContent**
  - Renderiza el contenido principal del panel, posicionándolo (por defecto desde la derecha).
  - Aplica animaciones y estilos según el lado desde el que aparece (usando `sheetVariants`).
  - Incluye el botón de cierre (ícono X), posicionado en la esquina superior derecha.
  - Permite pasar children (contenido) y clases personalizadas.

- **SheetHeader**
  - Wrapper para el encabezado del panel. Usa diseño responsivo y permite estilos personalizados.

- **SheetFooter**
  - Wrapper para el pie del panel. Por defecto, en mobile apila los elementos en columna inversa, y en escritorio los alinea horizontalmente hacia la derecha.

- **SheetTitle**
  - Componente para mostrar el título del sheet, estilizado con fuente semibold y tamaño grande.

- **SheetDescription**
  - Componente para colocar una descripción o subtítulo en el sheet, con estilos secundarios.

---

### 3. **Exportación**

Todos los componentes (`Sheet`, `SheetPortal`, `SheetOverlay`, `SheetTrigger`, `SheetClose`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription`) se exportan individualmente para poder ser usados y combinados en otras partes de la aplicación.

---

## **Resumen funcional**

- **Permite crear paneles deslizantes (sheets/drawers) altamente personalizables y accesibles** con animaciones y posicionamiento flexible.
- **Basado en Radix UI:** Aprovecha la accesibilidad, gestión de portales y ciclo de vida de modales de Radix.
- **Personalización visual:** Soporta variantes de posición (derecha, izquierda, arriba, abajo) y estilos adaptables.
- **Facilita la integración:** Los componentes pueden ser usados de forma modular para construir sheets complejos con encabezado, contenido, pie de página, títulos y descripciones.

---

## **Ejemplo de uso**

```tsx
<Sheet>
  <SheetTrigger>Mostrar panel</SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Título del panel</SheetTitle>
      <SheetDescription>Descripción opcional</SheetDescription>
    </SheetHeader>
    <div>Contenido principal...</div>
    <SheetFooter>
      <button>Acción</button>
    </SheetFooter>
  </SheetContent>
</Sheet>
