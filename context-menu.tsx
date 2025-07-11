"use client"

import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const ContextMenu = ContextMenuPrimitive.Root

const ContextMenuTrigger = ContextMenuPrimitive.Trigger

const ContextMenuGroup = ContextMenuPrimitive.Group

const ContextMenuPortal = ContextMenuPrimitive.Portal

const ContextMenuSub = ContextMenuPrimitive.Sub

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
))
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
))
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
))
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
))
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
))
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
ContextMenuShortcut.displayName = "ContextMenuShortcut"

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}


#Propósito general
El archivo context-menu.tsx define una serie de componentes reutilizables en React para construir menús contextuales (menus que aparecen al hacer clic derecho o acción similar) accesibles y altamente personalizables, usando la librería @radix-ui/react-context-menu como base. Los componentes también emplean utilidades de Tailwind CSS para el estilo y algunos íconos de lucide-react para la presentación visual.

Componentes principales
El archivo reexporta y/o extiende varios componentes de Radix Context Menu:

ContextMenu

Componente raíz que envuelve toda la lógica del menú contextual.
ContextMenuTrigger

Elemento que desencadena la apertura del menú (por ejemplo, el área donde se hace clic derecho).
ContextMenuContent

El contenido principal del menú, mostrado en un portal para asegurar visibilidad y manejo correcto de capas/z-index.
Añade estilos para fondo, borde, sombra y animaciones de apertura/cierre.
ContextMenuItem

Elemento de menú individual.
Soporta la prop inset para mayor indentación.
Gestiona estados como foco, selección y deshabilitado.
ContextMenuCheckboxItem

Elemento tipo casilla de verificación dentro del menú.
Muestra un check (<Check />) cuando está seleccionado.
ContextMenuRadioItem

Elemento tipo opción de radio dentro del menú.
Muestra un círculo (<Circle />) cuando está seleccionado.
ContextMenuLabel

Etiqueta/separador de sección del menú.
Soporta indentación (inset).
ContextMenuSeparator

Línea divisoria entre secciones del menú.
ContextMenuShortcut

Permite mostrar atajos de teclado alineados a la derecha de los elementos del menú.
ContextMenuGroup

Agrupa elementos para organización visual y lógica.
ContextMenuPortal

Renderiza el menú en un portal React (fuera del flujo normal del DOM).
ContextMenuSub / ContextMenuSubTrigger / ContextMenuSubContent

Permiten menús contextuales anidados (submenús).
El subtrigger añade un icono de flecha (<ChevronRight />) para indicar el submenú.
ContextMenuRadioGroup

Agrupa elementos de radio para selección exclusiva.
Características técnicas
Accesibilidad: Utiliza Radix UI para gestionar accesibilidad, estados y eventos de teclado.
Estilizado: Usa clases utilitarias de Tailwind CSS y la función cn para combinar estilos.
Iconografía: Usa íconos de lucide-react para checks, radios y flechas.
Flexibilidad: Permite crear menús simples o complejos (con submenús, grupos, radios, checkboxes, etiquetas, separadores, atajos...).
¿Qué NO hace este archivo?
No introduce lógica personalizada de negocio ni manipulación de datos.
No implementa lógica para mostrar/ocultar el menú (eso depende de los componentes Radix y el usuario).
No contiene ejemplos de uso ni lógica de integración; solo define los componentes base y sus estilos.
Ejemplo de uso básico
TSX
<ContextMenu>
  <ContextMenuTrigger>
    <div>Haz clic derecho aquí</div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Opción 1</ContextMenuItem>
    <ContextMenuItem inset>Opción 2</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem checked={true}>Activar algo</ContextMenuCheckboxItem>
    <ContextMenuRadioGroup>
      <ContextMenuRadioItem value="a">Radio A</ContextMenuRadioItem>
      <ContextMenuRadioItem value="b">Radio B</ContextMenuRadioItem>
    </ContextMenuRadioGroup>
    <ContextMenuSub>
      <ContextMenuSubTrigger>Más opciones</ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <ContextMenuItem>Subopción 1</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
  </ContextMenuContent>
</ContextMenu>
Resumen:
El archivo context-menu.tsx provee una infraestructura completa y accesible para menús contextuales en React, soportando submenús, grupos, atajos, radios, checkboxes y estilos visuales modernos, facilitando la construcción de menús contextuales avanzados en la aplicación.
