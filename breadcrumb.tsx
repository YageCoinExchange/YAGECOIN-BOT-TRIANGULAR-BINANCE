import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}

#Copilot said: Aquí tienes un resumen detallado de lo
Aquí tienes un resumen detallado de lo que hace el archivo breadcrumb.tsx:

Propósito general
El archivo breadcrumb.tsx define un conjunto de componentes reutilizables de React para implementar una barra de navegación de tipo breadcrumb (“migas de pan”) en una aplicación web. Las breadcrumbs ayudan a los usuarios a entender su ubicación dentro de la jerarquía de la aplicación y permiten una navegación rápida entre niveles.

Componentes definidos
Breadcrumb

Componente principal, un contenedor <nav> con atributo aria-label="breadcrumb" para accesibilidad.
Puede recibir un separador personalizado a través de la prop separator.
BreadcrumbList

Renderiza una lista ordenada (<ol>) que contiene los distintos elementos del breadcrumb.
Aplica clases para disposición horizontal, separación y estilos de texto.
BreadcrumbItem

Representa un elemento individual (<li>) dentro del breadcrumb.
Usa flexbox para alinear el contenido.
BreadcrumbLink

Componente para los enlaces de las migas de pan.
Permite renderizar un <a> o cualquier otro componente (usando la prop asChild).
Añade un efecto visual al hacer hover.
BreadcrumbPage

Indica el elemento actual de la navegación (la página donde el usuario se encuentra).
Renderiza un <span> con atributos de accesibilidad (aria-disabled="true", aria-current="page").
BreadcrumbSeparator

Renderiza un separador visual entre los elementos del breadcrumb.
Por defecto usa el icono de flecha (ChevronRight), pero puede recibir un separador personalizado mediante children.
BreadcrumbEllipsis

Componente visual para indicar que hay más elementos intermedios no mostrados (“...”).
Utiliza el icono MoreHorizontal.
Incluye texto accesible solo para lectores de pantalla ("More").
Utilidades y dependencias
Radix UI Slot: Permite flexibilidad para renderizar componentes personalizados en lugar de <a>.
lucide-react: Provee los iconos (ChevronRight y MoreHorizontal).
cn: Función utilitaria para combinar clases (probablemente usando Tailwind CSS).
¿Qué NO hace este archivo?
No contiene lógica para construir automáticamente la ruta de navegación; espera que los elementos sean definidos por el desarrollador.
No maneja rutas ni redirecciones.
No incluye lógica de negocio ni gestión de estado.
Ejemplo de uso
TSX
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/productos">Productos</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Detalles</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
Resumen:
El archivo proporciona una familia de componentes accesibles y altamente personalizables para construir breadcrumbs en React, usando estilos modernos y buenas prácticas de accesibilidad. Permite separar la navegación en pasos, mostrar el elemento actual y manejar casos donde hay demasiados elementos (ellipsis). No contiene lógica de rutas ni maneja dinámicamente los datos; su uso y composición es manual en cada contexto de la app.
