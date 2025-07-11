"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
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
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
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
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}

#Propósito general
Este archivo define una serie de componentes de React para construir un diálogo de alerta (“alert dialog”) reutilizable en una aplicación. Utiliza la librería @radix-ui/react-alert-dialog para la lógica accesible y agrega estilos y personalizaciones para integrarlo visualmente y funcionalmente en la aplicación, normalmente con Tailwind CSS.

Componentes definidos
AlertDialog

Es el componente raíz que envuelve todo el diálogo de alerta, basado en el componente Root de Radix.
AlertDialogTrigger

Componente que actúa como disparador para abrir el diálogo de alerta (un botón o elemento clickable).
AlertDialogPortal

Gestiona el portal (renderizado fuera de la jerarquía normal del DOM) para el contenido del diálogo.
AlertDialogOverlay

Renderiza el fondo oscuro semitransparente detrás del diálogo.
Usa animaciones y transición de opacidad según el estado (abierto/cerrado).
Permite personalización de clases (usualmente con Tailwind) y reenvía referencias (refs).
AlertDialogContent

Representa el contenido principal del diálogo (la ventana emergente).
Centra el contenido, aplica estilos de fondo, borde y animaciones.
Está envuelto en el Portal e incluye el Overlay.
Permite contenido personalizado y refs.
AlertDialogHeader

Un contenedor para la cabecera del diálogo (normalmente para el título y/o descripción).
Dispone los elementos en columna con espaciado y alineación responsiva.
AlertDialogFooter

Un contenedor para los botones de acción (como aceptar/cancelar).
Disponibles en columna para móvil y en fila alineados a la derecha en escritorio.
AlertDialogTitle

El título del diálogo, con fuente semibold y tamaño grande.
Reenvía referencias y permite clases personalizadas.
AlertDialogDescription

Una descripción secundaria, con fuente pequeña y color atenuado.
AlertDialogAction

Botón para la acción principal (por ejemplo, “Aceptar” o “Confirmar”).
Usa una variante de estilos de botón personalizados (importados de otro archivo).
AlertDialogCancel

Botón para la acción de cancelar/cerrar el diálogo.
Usa variante “outline” y estilos de margen para disposición responsiva.
Utilidades y dependencias
@radix-ui/react-alert-dialog: Provee la lógica accesible para diálogos de alerta.
cn: Función utilitaria para combinar dinámicamente clases CSS.
buttonVariants: Función (definida externamente) que retorna las clases necesarias para los diferentes estilos de botones.
"use client": Indica que este archivo debe ejecutarse en el cliente (Next.js).
Resumen funcional
Permite crear fácilmente diálogos de alerta personalizados y accesibles.
Cada parte del diálogo (trigger, overlay, content, header, footer, title, description, actions) está separada en componentes para máxima flexibilidad y reutilización.
Usa estilos responsivos y animaciones para una mejor experiencia de usuario.
Los botones y la disposición se adaptan a escritorio y móvil.
¿Qué no hace?
No gestiona el estado abierto/cerrado directamente (eso lo maneja Radix y el componente padre).
No define contenido o lógica de negocio propia, solo estructura y estilos.
No implementa lógica personalizada de botones; los eventos deben ser definidos donde se use el componente.
Resumen rápido
Este archivo ofrece todos los componentes necesarios para mostrar y estilizar un diálogo de alerta accesible y moderno en React/Next.js, usando Radix y Tailwind CSS, listos para ser usados y personalizados en cualquier parte de la aplicación.
