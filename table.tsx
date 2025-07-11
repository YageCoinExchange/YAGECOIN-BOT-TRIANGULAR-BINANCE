import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}


## Análisis detallado de `table.tsx`

El archivo `table.tsx` define un conjunto de **componentes reutilizables de React** para construir tablas estilizadas y coherentes en la interfaz de usuario. Estos componentes encapsulan los elementos HTML estándar de tabla (`<table>`, `<thead>`, `<tbody>`, etc.), agregando estilos modernos y utilidades para facilitar su uso y personalización.

---

## ¿Qué hace exactamente este archivo?

### 1. **Componente principal: `Table`**
- Es un wrapper para el elemento `<table>`.
- Envuelve la tabla en un `<div>` con `overflow-auto` para permitir el scroll horizontal si la tabla es ancha.
- Aplica estilos globales como `w-full` (ancho completo) y `text-sm` (texto pequeño).
- Permite pasar referencias y clases CSS personalizadas.

### 2. **Estructura de componentes secundarios**

Cada parte de la tabla tiene su propio componente, todos usando `React.forwardRef` para permitir referencias externas:

- **TableHeader:** Renderiza un `<thead>` y aplica una clase que agrega borde a las filas del header.
- **TableBody:** Renderiza un `<tbody>` y elimina el borde de la última fila.
- **TableFooter:** Renderiza un `<tfoot>` con borde superior, fondo atenuado y fuente en negrita, además de estilos para filas finales.
- **TableRow:** Renderiza un `<tr>` con borde inferior y transición de color al hacer hover. Si el estado es `selected`, cambia el fondo.
- **TableHead:** Renderiza un `<th>` con padding, alineación a la izquierda, fuente media y color de texto atenuado. Ajusta el padding para celdas que contienen checkboxes.
- **TableCell:** Renderiza un `<td>` con padding y alineación al medio, también ajustando el padding para checkboxes.
- **TableCaption:** Renderiza un `<caption>` estilizado para descripciones o títulos bajo la tabla.

### 3. **Personalización y utilidades**
- Todos los componentes permiten agregar clases adicionales mediante la prop `className`.
- Utilizan la función `cn` para combinar dinámicamente clases CSS, facilitando la personalización.
- Todos los componentes están preparados para ser utilizados juntos y componer tablas accesibles y visualmente consistentes.

---

## **Resumen funcional**

- **Proporciona una API declarativa y modular** para construir tablas avanzadas y estilizadas en una aplicación React.
- **Permite scroll horizontal automático** en tablas anchas gracias al `<div className="overflow-auto">`.
- **Separación clara de responsabilidades:** Cada parte de la tabla se construye y estiliza por separado, facilitando la reutilización y el mantenimiento.
- **Accesibilidad y buenas prácticas:** Al usar elementos HTML semánticos y estilos de interacción visual (hover, seleccionado), mejora la experiencia de usuario.

---

## **Ejemplo de uso**

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Nombre</TableHead>
      <TableHead>Edad</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Ana</TableCell>
      <TableCell>28</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2}>Total: 1 usuario</TableCell>
    </TableRow>
  </TableFooter>
  <TableCaption>Usuarios activos en el sistema</TableCaption>
</Table>
