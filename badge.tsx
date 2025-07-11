import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }


#Propósito general
El archivo badge.tsx define un componente reutilizable de tipo “Badge” (insignia o etiqueta) para aplicaciones en React, permitiendo mostrar pequeñas etiquetas de estado, categorías o información clave. El componente es altamente personalizable mediante variantes de estilo, usando Tailwind CSS y la librería class-variance-authority para la gestión dinámica de clases.

Componentes y lógica
1. badgeVariants
Se define usando cva de class-variance-authority.
Establece las clases base para el badge, incluyendo estilos de:
Alineación (inline-flex, items-center)
Forma (rounded-full)
Bordes, paddings, fuente y transiciones.
Define variantes:
default: Fondo y texto con colores primarios.
secondary: Colores secundarios.
destructive: Para alertas o estados críticos (color destructivo).
outline: Solo texto con color principal, sin fondo.
Permite cambiar el estilo del badge según la variante elegida.
2. BadgeProps
Define las props para el componente:
Hereda todas las props estándar de un div de React.
Permite la prop variant para elegir el tipo de badge.
3. Badge
Es el componente principal.
Recibe className, variant y otras props.
Usa la función utilitaria cn para concatenar clases base, variantes y cualquier clase adicional.
Renderiza un <div> con los estilos y props correspondientes.
4. Exportaciones
Exporta el componente Badge y la función badgeVariants para su uso en otros archivos.
¿Qué NO hace este archivo?
No define lógica de negocio ni interacción.
No gestiona estados, acciones o eventos.
No implementa animaciones avanzadas ni lógica condicional más allá de los estilos.
Ejemplo de uso
TSX
<Badge variant="destructive">Error</Badge>
<Badge variant="secondary">Info</Badge>
<Badge>Por defecto</Badge>
Resumen rápido
badge.tsx proporciona un componente de insignia visual, personalizable y accesible para mostrar estados o categorías en la interfaz, con variantes de color predefinidas y soporte para estilos adicionales mediante props. Ideal para etiquetas de estado, notificaciones o categorías visuales.
