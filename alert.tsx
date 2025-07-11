import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }

#Propósito general
El archivo alert.tsx define un conjunto de componentes reutilizables de React para mostrar mensajes de alerta (alertas visuales) en una aplicación, permitiendo diferentes variantes de estilo (normal o destructiva). Estos componentes están diseñados para ser fácilmente integrables y personalizables, usando utilidades modernas como Tailwind CSS y class-variance-authority para la gestión de estilos.

Componentes y funcionalidad
1. alertVariants
Utiliza la función cva de la librería class-variance-authority para definir las variantes de estilos del componente de alerta.
Define dos variantes:
default: Estilo estándar, con fondo y texto normales.
destructive: Estilo para alertas de tipo destructivo (errores o advertencias críticas), cambiando color de borde y texto.
Incluye utilidades avanzadas de Tailwind para posicionar íconos SVG y el contenido relativo a ellos.
2. Alert
Componente principal de alerta (div) que acepta props estándar de div y una variante de estilo.
Usa React.forwardRef para pasar referencias al elemento DOM.
Recibe la variante (default o destructive) y aplica los estilos correspondientes usando alertVariants.
Usa la función cn (probablemente un combinador de clases) para unir los estilos dinámicamente.
Añade el atributo role="alert" para accesibilidad.
3. AlertTitle
Componente para el título de la alerta (h5).
Usa React.forwardRef y permite clases personalizadas.
Aplica estilos de espaciado, fuente y seguimiento de texto.
4. AlertDescription
Componente para la descripción o contenido de la alerta (div).
Usa React.forwardRef.
Estiliza el texto para que sea más legible, especialmente en párrafos.
5. Exportaciones
Exporta los tres componentes: Alert, AlertTitle, y AlertDescription para ser usados en otras partes de la aplicación.
Resumen funcional
Este archivo proporciona una manera fácil y consistente de mostrar alertas en la aplicación.
Permite alertas normales o destructivas, dependiendo del contexto (por ejemplo, éxito, advertencia o error).
Optimiza la accesibilidad y la personalización visual.
Los componentes se pueden usar así:
TSX
<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Ha ocurrido un problema inesperado.</AlertDescription>
</Alert>
¿Qué no hace este archivo?
No contiene lógica para mostrar u ocultar la alerta (eso debe hacerse en el componente que use estas alertas).
No maneja acciones del usuario (como cerrar la alerta).
No incluye la lógica para mostrar diferentes íconos (pero si se pone un SVG como hijo, se posiciona automáticamente).
En resumen:
El archivo define una familia de componentes de alerta reutilizables y estilizados, utilizando variantes para distintos tipos de mensajes, optimizados para accesibilidad y personalización visual dentro de una aplicación React con Tailwind CSS.
