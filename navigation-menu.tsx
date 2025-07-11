import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
)

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      className
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}


#El archivo navigation-menu.tsx define un conjunto de componentes de React para construir un menú de navegación interactivo y estilizado, basado en la librería @radix-ui/react-navigation-menu (Radix UI) y con utilidades de estilizado como class-variance-authority (cva) y la función cn (para concatenar clases CSS).

Resumen detallado
1. Importaciones
React y sus tipos para refs y props.
Radix Navigation Menu Primitives: componentes base accesibles y personalizables para construir menús de navegación.
class-variance-authority (cva): para crear estilos variantes reutilizables.
ChevronDown (lucide-react): ícono de flecha para indicar submenús desplegables.
cn: función utilitaria para unir clases CSS condicionalmente.
@/lib/utils: ruta relativa para utilidades internas del proyecto.
2. Componentes principales
Cada componente envuelve y personaliza un componente base de Radix, agregando clases CSS y, en algunos casos, contenido extra:

a) NavigationMenu
Es el componente raíz del menú.
Permite recibir children (los elementos del menú) y props adicionales.
Agrega clases para alineación y capas z-index, y renderiza el viewport del menú.
b) NavigationMenuList
Lista de elementos del menú (ul o lista).
Alinea los ítems horizontalmente y agrega espaciado.
c) NavigationMenuItem
Referencia directa a NavigationMenuPrimitive.Item.
Representa un ítem individual del menú.
d) navigationMenuTriggerStyle
Con cva se definen variantes de estilos para los triggers (botones desplegables del menú).
e) NavigationMenuTrigger
Renderiza un botón que actúa como trigger para mostrar el submenú.
Añade el ícono de ChevronDown, que rota cuando el submenú está abierto/cerrado.
Usa los estilos definidos en navigationMenuTriggerStyle.
f) NavigationMenuContent
Renderiza el contenido del submenú asociado a un trigger.
Añade clases para animaciones de apertura/cierre y transiciones.
g) NavigationMenuLink
Referencia directa a NavigationMenuPrimitive.Link.
Para enlaces de navegación dentro del menú.
h) NavigationMenuViewport
Renderiza el contenedor animado que despliega el contenido de los submenús.
Alinea el viewport y aplica estilos de fondo, borde y animación.
i) NavigationMenuIndicator
Renderiza un indicador visual (triangulito) debajo del trigger activo, para mostrar qué submenú está abierto.
Aplica animaciones para aparecer/desaparecer.
3. Exportaciones
Exporta todos los componentes y el estilo para que puedan ser usados en otras partes de la aplicación, permitiendo construir menús complejos, accesibles y responsivos.

¿Qué resuelve este archivo?
Proporciona una interfaz de navegación accesible y personalizable.
Facilita la creación de menús con submenús, animaciones, indicadores y estilos consistentes.
Permite la composición y reutilización de los componentes del menú en otras partes del proyecto.
¿Cómo usar estos componentes?
Normalmente, se usan así:

TSX
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Productos</NavigationMenuTrigger>
      <NavigationMenuContent>
        {/* Items del submenú */}
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/contacto">Contacto</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
Resumen técnico
El archivo implementa un menú de navegación compuesto y accesible.
Usa Radix UI para la lógica base y estados del menú.
Añade estilos customizados y animaciones para una mejor experiencia visual.
Exporta todos los componentes necesarios para armar menús jerárquicos y responsivos.
