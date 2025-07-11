"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}


## Análisis detallado de `toast.tsx`

El archivo `toast.tsx` define un **sistema de notificaciones tipo "toast"** como conjunto de componentes React reutilizables y personalizables, utilizando la librería [@radix-ui/react-toast](https://www.radix-ui.com/primitives/docs/components/toast) y utilidades modernas de estilización como Tailwind CSS y class-variance-authority. Estos toasts son mensajes emergentes, breves y no intrusivos que aparecen en la interfaz para informar al usuario de acciones, errores, éxitos, etc.

---

## ¿Qué hace exactamente este archivo?

### 1. **Componentes principales y estructura**

- **ToastProvider:**  
  Proveedor de contexto que envuelve la aplicación o sección donde se quieren mostrar los toasts. Esencial para gestionar el ciclo de vida de las notificaciones.

- **ToastViewport:**  
  Define la zona de la pantalla donde se renderizan los toasts.  
  - Estilizado para ser responsivo y posicionarse en la parte superior o inferior derecha, adaptándose a diferentes tamaños de pantalla.
  - Permite scroll si hay múltiples toasts.

- **Toast:**  
  Componente principal de la notificación.  
  - Usa la función `cva` para permitir variantes visuales (`default`, `destructive`), cambiando colores y estilos según la severidad del mensaje.
  - Puede recibir clases y variantes para personalización.

- **ToastAction:**  
  Botón de acción dentro del toast (por ejemplo, "Deshacer", "Reintentar").
  - Estilizado como botón pequeño, interactivo y accesible.

- **ToastClose:**  
  Botón para cerrar la notificación (ícono de "X").
  - Se posiciona en la esquina superior derecha del toast.
  - Solo aparece al hacer hover o tener foco, con transiciones de opacidad.

- **ToastTitle y ToastDescription:**  
  - `ToastTitle`: Muestra el título o encabezado del toast (fuente semibold, tamaño pequeño).
  - `ToastDescription`: Texto descriptivo o información adicional (opacidad atenuada).

---

### 2. **Personalización y variantes**

- **`toastVariants` con `cva`:**
  - Permite cambiar el tipo de toast (`default` para notificaciones normales, `destructive` para errores o advertencias) aplicando diferentes colores y bordes.
  - Facilita la extensión a otros estilos si es necesario.

- **Props y Tipos:**
  - `ToastProps` y `ToastActionElement` para tipar correctamente los componentes y acciones, ayudando al desarrollo seguro en TypeScript.

---

### 3. **Accesibilidad y usabilidad**

- Los componentes de Radix aseguran roles ARIA correctos, navegación por teclado y foco visible.
- Las transiciones y los estados hover/focus mejoran la experiencia de usuario.

---

### 4. **Exportación**

- Exporta todos los componentes y tipos necesarios para construir un sistema de toasts completo y flexible.

---

## **Resumen funcional**

- Permite crear un sistema de notificaciones toast **moderno, accesible y personalizable** para mostrar mensajes informativos, de error, advertencia, éxito, etc.
- Soporta acciones rápidas y cierre manual de las notificaciones.
- Fácil de integrar en cualquier parte de una aplicación React/Next.js.

---

## **Ejemplo de uso**

```tsx
<ToastProvider>
  <ToastViewport />
  <Toast variant="destructive">
    <ToastTitle>Error</ToastTitle>
    <ToastDescription>Ocurrió un problema inesperado.</ToastDescription>
    <ToastAction altText="Reintentar">Reintentar</ToastAction>
    <ToastClose />
  </Toast>
</ToastProvider>
