"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

#Propósito general
El archivo checkbox.tsx define un componente de casilla de verificación (checkbox) reutilizable en React, altamente accesible y estilizado. Se apoya en @radix-ui/react-checkbox para el control de estado, accesibilidad y eventos, mientras que utiliza utilidades de Tailwind CSS y la función cn para la gestión de clases CSS.

Funcionamiento y estructura
Importaciones

React: para crear el componente y manejar referencias.
@radix-ui/react-checkbox: provee los componentes Root (el checkbox en sí) e Indicator (el indicador visual cuando está marcado).
Check de lucide-react: ícono SVG que muestra la marca de verificación.
cn: función utilitaria para combinar clases CSS dinámicamente (probablemente maneja condicionales y arrays).
Definición del componente Checkbox

Usa React.forwardRef para pasar una referencia al elemento raíz, facilitando su integración en formularios y el control por librerías externas.
Renderiza un <CheckboxPrimitive.Root>:
Usa clases utilitarias para tamaño (h-4 w-4), forma (rounded-sm), borde, colores y estados de foco y deshabilitado.
Permite añadir clases adicionales mediante la prop className.
Dentro del root, incluye <CheckboxPrimitive.Indicator>:
Centra el contenido (el check) y aplica el color correcto.
Renderiza el ícono <Check /> de 16x16 px (h-4 w-4) como marca de verificación.
Expone el displayName para facilitar la depuración y el uso en herramientas de desarrollo.
Exportación

Exporta sólo el componente Checkbox para su uso en otros archivos.
¿Qué NO hace este archivo?
No gestiona directamente el estado checked/unchecked/indeterminate: eso lo maneja Radix UI y el componente padre.
No implementa validaciones ni lógica de formulario.
No maneja etiquetas ni descripciones (solo la casilla visual).
Ejemplo de uso
TSX
<Checkbox checked={value} onCheckedChange={setValue} />
En resumen:
Este archivo implementa una casilla de verificación accesible, estilizada y lista para usarse con formularios modernos en React, integrando Radix UI para accesibilidad y eventos, y usando Tailwind/CSS utilitario para el estilo visual.
