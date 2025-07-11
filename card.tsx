import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

#Propósito general
El archivo card.tsx define una familia de componentes reutilizables para construir tarjetas ("cards") en una interfaz de usuario con React. Estos componentes están estilizados con clases utilitarias (probablemente usando Tailwind CSS) y están diseñados para proporcionar una estructura visual consistente y flexible para mostrar información agrupada (por ejemplo, vistas de resumen, paneles, widgets, etc.).

Componentes definidos
Card

Es el contenedor principal de la tarjeta.
Renderiza un <div> con esquinas redondeadas, borde, fondo y sombra suave.
Permite añadir clases adicionales y props estándar de <div>.
Usa forwardRef para compatibilidad con referencias externas.
CardHeader

Sección superior de la tarjeta.
Renderiza un <div> con padding y disposición vertical.
Ideal para incluir título y descripción.
CardTitle

Componente para el título de la tarjeta.
Texto grande, en negrita, sin separación entre líneas.
Usualmente se coloca dentro del CardHeader.
CardDescription

Componente para una descripción secundaria o subtítulo.
Texto pequeño y color atenuado, útil para contexto adicional bajo el título.
CardContent

Sección principal de contenido de la tarjeta.
Padding alrededor y sin padding superior para alinearse visualmente con el header.
CardFooter

Sección inferior de la tarjeta.
Flexbox horizontal para alinear elementos (como botones o acciones).
Padding y sin padding superior, para alineación visual con el contenido principal.
Características técnicas
Todos los componentes aceptan la prop className para personalizar estilos y combinan esas clases con estilos base usando la función utilitaria cn.
Se utiliza React.forwardRef en todos los componentes para admitir referencias externas, lo que mejora la integración con librerías y la accesibilidad.
Son componentes "presentacionales": solo definen estructura y estilos, no contienen lógica de negocio ni estados internos.
¿Qué NO hace este archivo?
No maneja lógica de datos ni manipulación de estado.
No incluye lógica funcional como manejo de clics, navegación, etc.
No impone contenido, solo estructura: el contenido real lo proporcionan los componentes hijos que se incluyan al usarlos.
Ejemplo de uso
TSX
<Card>
  <CardHeader>
    <CardTitle>Resumen de Usuario</CardTitle>
    <CardDescription>Información clave del usuario</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Aquí va el contenido principal */}
  </CardContent>
  <CardFooter>
    {/* Aquí van las acciones, por ejemplo, botones */}
  </CardFooter>
</Card>
En resumen:
El archivo proporciona una estructura de tarjeta modular, flexible y estilizada para usar en diferentes partes de la UI de la aplicación, permitiendo reutilización y consistencia visual.
