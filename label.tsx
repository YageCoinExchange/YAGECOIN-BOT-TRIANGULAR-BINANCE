"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }

#Propósito general
El archivo label.tsx define un componente React llamado Label. Este componente sirve como una etiqueta (label) accesible y reutilizable, diseñada para ser utilizada en formularios y otros lugares donde se requiera asociar texto descriptivo a un elemento de entrada. Se basa en el componente raíz de Radix UI Label y añade personalización de estilos mediante utilidades modernas.

Desglose de la implementación
1. Importaciones
React: Para crear componentes y referencias (forwardRef).
@radix-ui/react-label: Proporciona el componente base LabelPrimitive.Root que gestiona la accesibilidad y asociación entre el label y su input correspondiente.
class-variance-authority (cva): Permite definir variantes de clases CSS para estilos reutilizables y condicionales.
cn: Función utilitaria (probablemente tipo Tailwind CSS) para combinar dinámicamente clases CSS.
2. Definición de variantes de clase
TypeScript
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)
Define un conjunto base de estilos para todas las etiquetas:
text-sm: Tamaño de texto pequeño.
font-medium: Peso de fuente medio.
leading-none: Espaciado entre líneas mínimo.
peer-disabled:cursor-not-allowed y peer-disabled:opacity-70: Cambia el estilo si el input asociado está deshabilitado.
3. Componente Label
Usa React.forwardRef para permitir referencias externas (útil para accesibilidad y control programático).
Combina las clases generadas por labelVariants con cualquier clase adicional pasada por props (className).
Renderiza un <label> accesible gestionado por Radix, con todas las props y ref que recibe.
Permite el uso de variantes de estilo en el futuro gracias a la integración con cva, aunque en este caso solo tiene una variante base.
4. Display Name
Asigna Label.displayName igual al del componente Radix para facilidad en debugging y herramientas de desarrollo.
5. Exportación
Exporta únicamente el componente Label.
¿Qué NO hace este archivo?
No implementa lógica de negocio, validaciones ni control de estados.
No asocia explícitamente el label con un input; se espera que el desarrollador lo haga usando props estándar (htmlFor).
No incluye variantes de estilo adicionales (pero está preparado para ello con cva).
Ejemplo de uso
TSX
<Label htmlFor="email">Correo electrónico</Label>
<input id="email" type="email" />
Resumen
label.tsx proporciona un componente de etiqueta accesible, estilizado y reutilizable para React.
Usa Radix UI para máxima accesibilidad.
Estiliza las etiquetas con utilidades modernas y soporta estados "disabled" del input asociado.
Es la base recomendada para etiquetas en formularios y UI en la aplicación.

