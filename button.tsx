import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

#Copilot said: Por supuesto, aquí tienes un resumen detallado
Por supuesto, aquí tienes un resumen detallado de lo que hace el archivo button.tsx:

Propósito general
El archivo define un componente reutilizable de botón (Button) para una aplicación React, con soporte para múltiples variantes visuales y tamaños, usando Tailwind CSS y la librería class-variance-authority (CVA) para manejar estilos condicionales. Esto permite crear botones coherentes, accesibles y altamente personalizables en toda la aplicación.

Componentes y lógica
1. buttonVariants
Utiliza cva de class-variance-authority para crear una función de variantes de estilos.
Define clases base para el botón (alineación, bordes, tipografía, transiciones, etc.).
Permite dos tipos de variantes:
variant: Define el estilo visual del botón:
default: Botón principal.
destructive: Botón para acciones peligrosas (rojo).
outline: Botón con borde, fondo transparente.
secondary: Botón secundario.
ghost: Botón sin fondo, solo con hover.
link: Botón con apariencia de enlace.
size: Define el tamaño del botón:
default: Tamaño estándar.
sm: Pequeño.
lg: Grande.
icon: Botón cuadrado para íconos.
Define valores por defecto para ambas variantes.
2. ButtonProps
Extiende las propiedades estándar de <button> de React.
Agrega el tipo de variantes y un booleano opcional asChild.
3. Button
Componente principal, usa React.forwardRef para referencias externas.
Permite renderizar como un <button> o como cualquier otro componente usando asChild (útil para enlaces o wrappers personalizados).
Aplica los estilos combinando variantes y clases adicionales mediante la función cn.
Pasa todas las props y la referencia al componente final.
4. Exportaciones
Exporta el componente Button y la función de variantes buttonVariants para usos avanzados.
¿Qué NO hace este archivo?
No implementa lógica de negocio ni eventos personalizados.
No gestiona el estado de loading, deshabilitado, etc. (solo lo que soporta el <button> estándar).
No define el contenido o íconos del botón, solo el contenedor y los estilos.
Ejemplo de uso
TSX
<Button>Botón principal</Button>
<Button variant="destructive">Eliminar</Button>
<Button size="sm">Pequeño</Button>
<Button asChild>
  <a href="/ruta">Como enlace</a>
</Button>
Resumen rápido
Este archivo ofrece un botón reutilizable y estilizado con múltiples variantes y tamaños, fácil de integrar y personalizar en tu aplicación React, con soporte para renderizar como otros elementos si es necesario. Utiliza Tailwind CSS para los estilos y CVA para las variantes.
