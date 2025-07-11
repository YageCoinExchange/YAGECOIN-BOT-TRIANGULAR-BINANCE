"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}


#Copilot said: Aquí tienes un resumen detallado sobre lo
Aquí tienes un resumen detallado sobre lo que hace el archivo drawer.tsx:

Propósito general
El archivo drawer.tsx define un conjunto de componentes reutilizables en React para crear un Drawer (panel deslizante desde abajo), común en interfaces móviles y modernas, usando la librería vaul como base. Los componentes están estilizados y estructurados para ser fácilmente integrados y personalizados dentro de la aplicación.

Componentes definidos y su función
Drawer

Componente raíz del drawer, usando DrawerPrimitive.Root de vaul.
Permite pasar la prop shouldScaleBackground (por defecto true) para decidir si el fondo de la pantalla se escala al abrir el drawer.
Pasa el resto de las props a la raíz del drawer.
DrawerTrigger

Elemento que dispara la apertura del drawer (por ejemplo, un botón).
DrawerPortal

Portal para renderizar el drawer fuera del flujo normal del DOM, permitiendo que se muestre por encima del resto del contenido.
DrawerClose

Elemento (por ejemplo, un botón) que cierra el drawer.
DrawerOverlay

Capa semitransparente negra que cubre el fondo cuando el drawer está abierto.
Usa clases para asegurarse de que cubre toda la pantalla (fixed inset-0 z-50 bg-black/80).
Permite personalizar clases con la prop className.
DrawerContent

Contenedor principal del contenido del drawer.
Aparece en la parte inferior de la pantalla, con esquinas superiores redondeadas y sombra.
Incluye un "handle" visual (barra pequeña gris en la parte superior) para indicar que puede deslizarse.
Renderiza el contenido que se le pase como hijos (children).
Incluye el overlay y se renderiza en el portal.
DrawerHeader

Sección de encabezado para el contenido del drawer, alineado y con padding.
DrawerFooter

Sección de pie del drawer, útil para botones o acciones, con padding y espacio entre elementos.
DrawerTitle

Componente para el título del drawer, con fuente grande y negrita.
DrawerDescription

Componente para una descripción secundaria, con fuente pequeña y color atenuado.
Características técnicas
Composición modular: permite armar un drawer completo o usar solo las partes necesarias.
Accesibilidad y usabilidad: aprovecha las ventajas de la librería vaul para manejar foco, animaciones, portales y eventos correctamente.
Estilizado: utiliza utilidades (cn) para combinar clases y personalizar estilos, probablemente con Tailwind CSS.
Animación y capas: el overlay y el contenido del drawer están en z-index alto y usan transiciones suaves.
¿Qué NO hace este archivo?
No maneja lógica de negocio ni estados propios, solo la presentación y estructura.
No implementa lógica interna de apertura/cierre más allá de lo que provee vaul.
No define el contenido del drawer, solo su estructura visual y funcional.
Ejemplo de uso
TSX
<Drawer>
  <DrawerTrigger>Mostrar menú</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Mi Drawer</DrawerTitle>
      <DrawerDescription>Descripción opcional.</DrawerDescription>
    </DrawerHeader>
    {/* Contenido principal aquí */}
    <DrawerFooter>
      <button>Cerrar</button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
En resumen:
Este archivo proporciona una suite modular de componentes para crear drawers (paneles deslizantes) accesibles, visualmente atractivos y fáciles de integrar en una aplicación React, utilizando la librería vaul y utilidades de estilos para asegurar flexibilidad y coherencia visual.
