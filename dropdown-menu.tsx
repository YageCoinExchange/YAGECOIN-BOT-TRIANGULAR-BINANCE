"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}

#Propósito General
El archivo dropdown-menu.tsx define una colección de componentes de React para construir menús desplegables (dropdown menus) accesibles y completamente personalizados, utilizando la librería @radix-ui/react-dropdown-menu como base. Los componentes están diseñados para ser altamente reutilizables y estilizados (probablemente con Tailwind CSS y la función cn) y ofrecen soporte para submenús, grupos, checkboxes, radios, atajos, y más.

Componentes Definidos
DropdownMenu
Componente raíz del menú desplegable. Envuelve toda la lógica y el estado del menú.

DropdownMenuTrigger
Elemento que activa la apertura del menú (por ejemplo, un botón o ícono).

DropdownMenuContent
El contenedor principal del menú. Se renderiza en un portal para asegurar visibilidad y control de capas (z-index).
Incluye estilos para fondo, borde, sombras y animaciones de apertura/cierre.

DropdownMenuItem
Elemento individual del menú (opción seleccionable).
Soporta la prop inset para añadir indentación opcional.

DropdownMenuCheckboxItem
Elemento que actúa como una casilla de verificación dentro del menú.
Muestra un check (<Check />) cuando está seleccionado.

DropdownMenuRadioItem
Elemento tipo radio dentro del menú (permite selección exclusiva dentro de un grupo).
Muestra un círculo (<Circle />) cuando está seleccionado.

DropdownMenuLabel
Etiqueta o título de sección dentro del menú.
Soporta la prop inset para indentación.

DropdownMenuSeparator
Línea divisoria entre secciones del menú.

DropdownMenuShortcut
Permite mostrar atajos de teclado o textos alineados a la derecha de los ítems, usando un <span> estilizado.

DropdownMenuGroup
Permite agrupar varios ítems bajo una lógica y/o estilo común.

DropdownMenuPortal
Renderiza el menú en un portal, fuera del flujo normal del DOM (útil para overlays).

DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent
Permiten crear submenús anidados:

DropdownMenuSubTrigger: Elemento que activa un submenú, muestra una flecha (<ChevronRight />) al final.
DropdownMenuSubContent: El contenido del submenú, con estilos y animaciones.
DropdownMenuSub: Componente lógico para manejar el submenú.
DropdownMenuRadioGroup
Agrupa elementos radio para que sólo uno pueda estar seleccionado simultáneamente.

Características Técnicas
Accesibilidad:
Usa Radix UI, asegurando roles ARIA, navegación por teclado y enfoque correcto.
Estilizado:
Utiliza la función cn para componer clases CSS dinámicamente (probablemente con Tailwind CSS).
Iconografía:
Usa íconos de lucide-react para checks, círculos y flechas de submenú.
Animaciones y Layout:
Aplican animaciones a la apertura/cierre de menús y submenús, y aseguran un layout moderno y responsivo.
¿Qué NO hace este archivo?
No implementa lógica de negocio ni maneja datos del menú; solo define la estructura y apariencia.
No gestiona el estado externo de los ítems (checked, selected, etc.), eso depende de las props y el uso externo.
No incluye ejemplos de uso ni lógica de integración directa con la aplicación.
Ejemplo de Uso Básico
TSX
<DropdownMenu>
  <DropdownMenuTrigger>Opciones</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Perfil</DropdownMenuLabel>
    <DropdownMenuItem>Mi Cuenta</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuCheckboxItem checked={true}>Notificaciones</DropdownMenuCheckboxItem>
      <DropdownMenuRadioGroup value="a">
        <DropdownMenuRadioItem value="a">Modo A</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="b">Modo B</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuGroup>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Más opciones</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Sub Opción 1</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  </DropdownMenuContent>
</DropdownMenu>
En resumen:
El archivo dropdown-menu.tsx implementa una suite modular y accesible de componentes para menús desplegables avanzados en React, soportando menús anidados, checkboxes, radios, grupos, atajos y más, todo con estilos modernos y listos para personalización.
