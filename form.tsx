"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}


#Propósito general
El archivo form.tsx define un conjunto de componentes y hooks de React para construir formularios avanzados, reutilizables y altamente integrados con la librería react-hook-form. Los componentes están diseñados para ofrecer una estructura clara, soporte de validaciones, mensajes de error, accesibilidad y estilos consistentes en toda la aplicación.

Componentes y lógica principal
1. Form
Es simplemente un alias de FormProvider de react-hook-form.
Permite envolver toda la jerarquía del formulario y compartir el contexto de react-hook-form a todos los componentes hijos.
2. FormField
Componente que envuelve un campo de formulario, utiliza el Controller de react-hook-form para conectar el input con el sistema de formularios.
Usa un contexto (FormFieldContext) para compartir el nombre del campo con otros componentes relacionados (label, control, mensaje, etc.).
Permite desacoplar la lógica de los inputs y los metadatos de los campos.
3. useFormField
Hook personalizado que combina los contextos de campo y de item, y extrae información útil sobre el estado del campo (nombre, ids, error, etc.) usando el contexto de react-hook-form.
Facilita el acceso a los IDs y mensajes de error, y los propaga a los componentes hijos para mejorar la accesibilidad (por ejemplo, aria-describedby, aria-invalid).
4. FormItem
Componente contenedor para un campo de formulario.
Provee un contexto con un ID único para referencias accesibles entre label, control, descripción y mensaje.
Aplica un espaciado vertical entre los elementos del campo.
5. FormLabel
Enlaza el label con el input correspondiente usando el contexto.
Cambia el color del texto si el campo tiene un error (clase text-destructive).
Usa el componente Label previamente definido en el proyecto.
6. FormControl
Enlaza el input real (o slot) con los IDs y atributos ARIA necesarios para accesibilidad.
Marca el campo como inválido si hay error.
Usa el componente Slot de Radix UI para permitir flexibilidad en el tipo de input/renderizado.
7. FormDescription
Muestra una descripción opcional del campo.
Usa el ID de descripción para accesibilidad.
8. FormMessage
Muestra el mensaje de error si existe, o cualquier otro mensaje pasado como hijo.
El mensaje es accesible y se muestra con estilo de error.
Flujo típico de uso
Los componentes están diseñados para ser usados juntos, así:

TSX
<Form {...methods}>
  <FormField name="email" control={methods.control} render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <input type="email" {...field} />
      </FormControl>
      <FormDescription>Ingresa tu correo electrónico</FormDescription>
      <FormMessage />
    </FormItem>
  )} />
</Form>
Características clave
Integración avanzada con react-hook-form: Controla el estado, validación y errores del formulario.
Accesibilidad: Usa IDs y atributos ARIA correctamente para asociar labels, descripciones y mensajes con los inputs.
Reutilización y composición: Los componentes pueden ser anidados y reutilizados para distintos campos y formularios.
Estilizado consistente: Usa clases utilitarias y la función cn para estilos consistentes y personalizables.
Soporte para mensajes de error y descripciones: Muestra mensajes relevantes para el usuario de forma automática.
¿Qué NO hace este archivo?
No define la lógica de validación ni procesamiento de datos del formulario (eso lo hace react-hook-form y el código del usuario).
No incluye inputs personalizados, solo la infraestructura para conectar los inputs con el sistema de formularios.
No maneja el envío del formulario ni la lógica de negocio asociada.
En resumen:
Este archivo implementa una infraestructura moderna, accesible y reutilizable para construir formularios en React, completamente integrada con react-hook-form, facilitando la gestión de estado, validaciones, mensajes de error y estilos, mientras asegura buenas prácticas de accesibilidad y composición de componentes.    
