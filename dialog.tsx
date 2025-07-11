"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
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
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}


#Copilot said: Aquí tienes un análisis detallado de lo
Aquí tienes un análisis detallado de lo que hace el archivo dialog.tsx:

Propósito general
El archivo dialog.tsx define una serie de componentes reutilizables de React para construir diálogos modales (pop-ups) accesibles y con estilos modernos, usando la librería @radix-ui/react-dialog como base. Estos componentes permiten crear modales que cumplen buenas prácticas de accesibilidad, animación y diseño, y son altamente personalizables gracias al uso de utilidades CSS y composición de componentes.

Componentes definidos
Componentes básicos (reexportados directamente de Radix):

Dialog: Componente raíz del sistema de diálogo.
DialogTrigger: Elemento que dispara la apertura del diálogo.
DialogPortal: Renderiza el diálogo en un portal (fuera del flujo normal del DOM).
DialogClose: Botón o elemento para cerrar el diálogo.
Componentes extendidos o personalizados:

DialogOverlay:

Cubre el fondo cuando el diálogo está abierto (capa negra semitransparente).
Añade animaciones de apertura/cierre y z-index alto para asegurar visibilidad.
Usa forwardRef para compatibilidad y estilos personalizados mediante la función utilitaria cn.
DialogContent:

Contenedor principal del contenido del diálogo.
Centrado en pantalla, con padding, bordes, sombra y animaciones de entrada/salida.
Incluye el overlay y el contenido en el portal.
Incluye un botón de cerrar en la esquina superior derecha, con ícono de "X" (lucide-react).
DialogHeader:

Contenedor para la cabecera del diálogo (usualmente para título y/o descripción).
Disposición vertical y centrado o alineación a la izquierda según el tamaño de pantalla.
DialogFooter:

Contenedor para los botones o acciones al pie del diálogo.
Disposición vertical en móvil y horizontal en pantallas grandes.
DialogTitle:

Componente para el título del diálogo, con estilos de fuente destacados.
DialogDescription:

Componente para una descripción secundaria, con colores atenuados y fuente pequeña.
Características técnicas
Accesibilidad:
Usa @radix-ui/react-dialog para asegurar roles ARIA, manejo de foco y navegación por teclado.
Estilos:
Usa clases utilitarias (probablemente Tailwind CSS) y la función cn para combinar y personalizar estilos.
Animaciones:
Añade animaciones CSS para transiciones suaves de aparición y desaparición del modal y el overlay.
Composición:
Los componentes pueden combinarse para crear cualquier tipo de diálogo modal, desde simples alertas hasta formularios complejos.
¿Qué NO hace este archivo?
No maneja lógica de negocio ni estados propios, solo la presentación y accesibilidad.
No implementa lógica personalizada para formularios o validaciones dentro del diálogo.
No contiene lógica para el contenido del diálogo; eso lo define el desarrollador al usar estos componentes.
Ejemplo de uso típico
TSX
<Dialog>
  <DialogTrigger>Mostrar diálogo</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Título del diálogo</DialogTitle>
      <DialogDescription>Descripción opcional</DialogDescription>
    </DialogHeader>
    {/* Aquí va el contenido principal del modal */}
    <DialogFooter>
      <button>Acción</button>
      <DialogClose>Cerrar</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
En resumen:
El archivo dialog.tsx provee una suite de componentes para crear diálogos modales accesibles, modernos y personalizables en React, facilitando la integración de overlays, animaciones, headers, footers, títulos y descripciones, todo basado en las mejores prácticas de accesibilidad y diseño.
