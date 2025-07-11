"use client"

import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    )}
    {...props}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
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
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}


#Propósito general
El archivo command.tsx define una serie de componentes reutilizables de React para crear un Command Palette (paleta de comandos) estilo VS Code en una aplicación web. Esta paleta permite a los usuarios buscar y ejecutar comandos de manera rápida y accesible, usando la librería cmdk para la lógica principal, y Radix UI Dialog para el modal/dialogo, junto con utilidades de Tailwind CSS para el estilo.

Componentes definidos
Command

Componente raíz que encapsula el comportamiento y la interfaz de la paleta de comandos.
Añade estilos personalizados y acepta referencias (forwardRef) para integración con otras librerías.
CommandDialog

Envoltorio que abre la paleta de comandos dentro de un modal/dialogo accesible.
Usa los componentes de Dialog de Radix UI para la ventana modal.
Renderiza la estructura de la paleta dentro del diálogo, con estilos para asegurar integración visual.
CommandInput

Campo de entrada de búsqueda de la paleta.
Incluye un ícono de búsqueda (Search de lucide-react) al inicio.
Estilizado para alinearse y ser accesible.
CommandList

Contenedor para los resultados/ítems de la paleta.
Permite scroll vertical y asegura una altura máxima.
CommandEmpty

Mensaje que se muestra cuando no hay resultados en la búsqueda.
Centrado y con padding adecuado.
CommandGroup

Permite agrupar comandos bajo un encabezado.
Estilizado para separar visualmente diferentes grupos de comandos.
CommandItem

Representa cada comando disponible en la lista.
Incluye estados visuales para selección, hover y deshabilitado.
Soporta atajos de teclado y otros elementos.
CommandSeparator

Línea divisoria para separar grupos o secciones dentro de la paleta.
CommandShortcut

Permite mostrar atajos de teclado a la derecha de los comandos.
Estilizado con fuentes pequeñas y color atenuado.
Funcionalidad y comportamiento
Permite construir una paleta de comandos modal y accesible, con búsqueda rápida, agrupación, atajos y separación visual.
Toda la lógica reactiva y de accesibilidad es manejada por las librerías cmdk y @radix-ui/react-dialog.
Los estilos se aplican usando clases utilitarias (cn) y Tailwind CSS.
Composición modular: puedes usar sólo los componentes que necesites o combinarlos para crear una experiencia completa de Command Palette.
¿Qué NO hace este archivo?
No define la lógica de los comandos ni los datos; sólo provee la estructura y estilos para la UI.
No implementa lógica personalizada de búsqueda o ejecución; eso depende del uso que se le dé en la aplicación.
Ejemplo de uso básico
TSX
<CommandDialog open={isOpen} onOpenChange={setIsOpen}>
  <CommandInput placeholder="Buscar comando..." />
  <CommandList>
    <CommandEmpty>No se encontraron comandos.</CommandEmpty>
    <CommandGroup heading="Navegación">
      <CommandItem>
        Ir al dashboard
        <CommandShortcut>⌘D</CommandShortcut>
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Acciones">
      <CommandItem>
        Cerrar sesión
        <CommandShortcut>⌘Q</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>
En resumen:
El archivo command.tsx implementa una infraestructura modular y estilizada de paleta de comandos, accesible y personalizable, lista para integrarse en cualquier aplicación React moderna para mejorar la navegación y la experiencia de usuario.
