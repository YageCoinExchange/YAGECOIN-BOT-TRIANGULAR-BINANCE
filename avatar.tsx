"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }

#Propósito general
El archivo avatar.tsx define tres componentes reutilizables de React para representar avatares de usuario en la interfaz de la aplicación. Utiliza la librería @radix-ui/react-avatar para asegurar accesibilidad y comportamiento consistente, complementándolo con estilos personalizados mediante Tailwind CSS y una función utilitaria cn para gestión de clases.

Componentes definidos
1. Avatar
Es el componente raíz del avatar.
Usa React.forwardRef para permitir referencias externas.
Aplica las siguientes clases por defecto:
relative: posicionamiento relativo para permitir overlays.
flex h-10 w-10 shrink-0 overflow-hidden rounded-full: asegura que el avatar es un círculo de 40x40px, no se deforma y el contenido extra se oculta.
Permite agregar clases adicionales mediante el prop className.
Reexporta el componente Root de Radix Avatar.
2. AvatarImage
Representa la imagen del avatar.
Usa React.forwardRef.
Aplica:
aspect-square h-full w-full: asegura que la imagen ocupa todo el espacio del avatar y mantiene una relación 1:1 (cuadrado).
Permite agregar clases extra.
3. AvatarFallback
Se muestra cuando la imagen del avatar no carga o no está disponible.
Usa React.forwardRef.
Aplica:
flex h-full w-full items-center justify-center rounded-full bg-muted: ocupa todo el espacio, centra el contenido (iniciales, ícono, etc.), fondo de color neutro y forma de círculo.
Permite clases extra.
Funcionamiento resumido
Avatar: contenedor principal, circular y con overflow oculto.
AvatarImage: imagen del usuario, ocupa todo el espacio del Avatar.
AvatarFallback: contenido alternativo para mostrar en caso de que la imagen no esté disponible (usualmente iniciales o un ícono).
¿Qué NO hace este archivo?
No incluye lógica de negocio ni manipulación de datos.
No decide qué mostrar en el fallback, solo provee el espacio y los estilos.
No gestiona el estado de carga de la imagen (lo maneja internamente Radix).
Ejemplo de uso típico
TSX
<Avatar>
  <AvatarImage src="url_de_la_imagen" alt="Usuario" />
  <AvatarFallback>AB</AvatarFallback>
</Avatar>
Resumen:
Este archivo provee componentes de avatar accesibles y estilizados, listos para ser usados en cualquier parte de la aplicación, mostrando la imagen del usuario o un fallback si la imagen falla, todo bajo la filosofía de diseño de Radix UI y Tailwind CSS.
