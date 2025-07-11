import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}

## Análisis detallado de `pagination.tsx`

El archivo `pagination.tsx` define un conjunto de **componentes reutilizables de React** que permiten construir una **interfaz de paginación** estilizada y accesible. Está pensado para ser usado como parte de una aplicación web (probablemente con Tailwind CSS y Radix UI), facilitando la navegación entre páginas de datos (por ejemplo, tablas o listados extensos).

---

## Componentes definidos

### 1. **Pagination**
- **Función:** Componente principal que representa el contenedor de la paginación.
- **Detalles:** Renderiza un `<nav>` con atributos de accesibilidad (`role="navigation"`, `aria-label="pagination"`).
- **Estilo:** Centra su contenido horizontalmente (`flex`, `justify-center`).

### 2. **PaginationContent**
- **Función:** Contenedor de los ítems de la paginación.
- **Detalles:** Renderiza un `<ul>` con `flex` y `gap-1` para espaciar los elementos de la paginación.

### 3. **PaginationItem**
- **Función:** Representa cada elemento individual de la paginación (por ejemplo, un número de página, anterior, siguiente, etc.).
- **Detalles:** Renderiza un `<li>`.

### 4. **PaginationLink**
- **Función:** Componente de enlace para cada número de página o botón.
- **Props importantes:**
    - `isActive`: Si está activa (página actual), aplica un estilo diferente.
    - `size`: Tamaño del botón, por defecto "icon".
- **Detalles:** Renderiza un `<a>` con clases dinámicas usando la función `buttonVariants`. Usa los estilos "outline" si es la página activa, y "ghost" si no.

### 5. **PaginationPrevious**
- **Función:** Botón/enlace "Anterior".
- **Detalles:** Usa el componente `PaginationLink` con un ícono de flecha izquierda (`ChevronLeft`) y el texto "Previous". Incluye accesibilidad con `aria-label="Go to previous page"`.

### 6. **PaginationNext**
- **Función:** Botón/enlace "Siguiente".
- **Detalles:** Similar a "Anterior", pero con flecha derecha (`ChevronRight`) y el texto "Next".

### 7. **PaginationEllipsis**
- **Función:** Representa el separador "..." cuando hay muchas páginas (paginación truncada).
- **Detalles:** Renderiza un `<span>` con el ícono `MoreHorizontal` y una etiqueta accesible oculta "More pages".

---

## Utilidades y dependencias

- **`cn`**: Función utilitaria para concatenar clases CSS condicionalmente.
- **`buttonVariants` y `ButtonProps`**: Se importan del sistema de UI de botones del proyecto, para aplicar estilos coherentes a los enlaces de paginación.
- **Íconos de lucide-react**: Para flechas y elipsis.

---

## Exportación

Todos los componentes se exportan individualmente, permitiendo su composición y personalización en otros archivos o vistas.

---

## Resumen funcional

- **Proporciona todos los elementos necesarios para construir fácilmente una barra de paginación** accesible, interactiva y visualmente consistente.
- **Permite personalización**: Los componentes pueden combinarse y estilizarse según las necesidades del proyecto.
- **Accesibilidad**: Usa roles, labels y contenido alternativo para lectores de pantalla.
- **No contiene lógica de paginación interna** (no calcula páginas ni maneja estados), solo la presentación visual y los handlers de navegación deben implementarse donde se use.

---

**En resumen:**  
Este archivo es una librería de componentes visuales para paginación, lista para ser integrada en listados, tablas o cualquier vista que requiera navegación por páginas de contenido.

¿Te gustaría ver un ejemplo de uso o explicación de algún componente en concreto?
