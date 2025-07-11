"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }


#Propósito general
El archivo input-otp.tsx define un conjunto de componentes reutilizables en React para construir un campo de entrada de código OTP (One-Time Password, o código de un solo uso) con una interfaz visual moderna y accesible. Utiliza la librería input-otp para la lógica principal y Radix UI junto a clases utilitarias para el estilo y la composición.

Componentes definidos y sus funciones
InputOTP

Componente principal del input OTP, basado en el componente OTPInput de la librería input-otp.
Permite personalizar las clases CSS del contenedor y del propio input.
Se puede usar como un input controlado, recibiendo props estándares y referencias (ref).
InputOTPGroup

Componente contenedor para agrupar los slots individuales de cada dígito del OTP.
Usa flexbox para la disposición horizontal de los slots.
InputOTPSlot

Representa un solo slot (casilla) para un dígito del OTP.
Utiliza el contexto OTPInputContext para obtener el estado de cada slot (carácter ingresado, si tiene el caret, si está activo).
Muestra el dígito ingresado, o un caret animado si la casilla está activa (para mejor usabilidad).
Aplica estilos condicionales: borde, fondo, animación y enfoque visual con un anillo cuando es el slot activo.
InputOTPSeparator

Representa un separador visual entre grupos de dígitos del OTP (por ejemplo, para separar grupos de 3-3 o 2-2-2).
Muestra un punto (ícono <Dot /> de lucide-react) y tiene el rol ARIA de "separator" para accesibilidad.
Características técnicas
Accesibilidad: Usa roles y estados visuales apropiados para indicar foco y separación.
Estilizado: Utiliza clases utilitarias (probablemente Tailwind CSS) para estilos modernos y responsivos.
Composición: Los componentes están diseñados para ser usados juntos y permiten construir inputs OTP con cualquier cantidad de dígitos y separadores personalizados.
Animación: El caret (barra de escritura) parpadea cuando la casilla está activa, mejorando la experiencia de usuario.
¿Qué NO hace este archivo?
No maneja lógica de envío ni validación del OTP, solo la presentación y estructura del input.
No integra lógica de backend ni comunicación con APIs.
No impone un número fijo de slots; eso depende de cómo se use el componente.
Ejemplo de uso
TSX
<InputOTP value={otp} onChange={setOtp} length={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSeparator />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSeparator />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
Resumen
input-otp.tsx proporciona una infraestructura modular y estilizada para campos de entrada OTP en React, ofreciendo slots individuales, separadores visuales y una experiencia de usuario moderna y accesible, ideal para flujos de autenticación de dos factores o validación de códigos temporales.
