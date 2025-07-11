"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }


#Propósito general
El archivo define un conjunto de componentes personalizados de React para construir un acordeón (accordion), es decir, una interfaz de usuario que permite expandir y contraer secciones de contenido. Utiliza la librería @radix-ui/react-accordion para la funcionalidad base y agrega estilos y componentes personalizados para integrarlo con el diseño de la aplicación.

Componentes definidos
Accordion

Es simplemente una referencia al componente raíz de Radix (AccordionPrimitive.Root).
Se utiliza como contenedor principal del acordeón.
AccordionItem

Un componente que representa cada ítem/sección del acordeón.
Usa React.forwardRef para poder manejar referencias (útil para animaciones/accesibilidad).
Añade una clase de borde inferior (border-b) para separar visualmente cada ítem.
Permite pasar clases personalizadas adicionales.
AccordionTrigger

Es el botón/cabecera que el usuario hace clic para expandir o contraer la sección.
Se compone de un header y un trigger con estilos personalizados:
Ocupa todo el ancho, tiene padding en Y, fuente en negrita, transición de todos los estilos, y subrayado al pasar el mouse.
Incluye un ícono de flecha (ChevronDown de lucide-react) que rota 180° cuando la sección está abierta (usando la clase [[data-state=open]>svg]:rotate-180).
Usa React.forwardRef y permite clases adicionales.
El displayName se copia del componente original de Radix.
AccordionContent

Es el contenido que se expande o contrae.
Usa React.forwardRef y permite clases adicionales.
Añade animaciones de apertura/cierre usando las utilidades de Radix (data-[state=closed] y data-[state=open]).
El contenido real se envuelve en un div con padding inferior y superior.
Utilidades y dependencias
@radix-ui/react-accordion: Provee la lógica de acordeón accesible (abrir/cerrar, manejo de teclado, etc).
lucide-react: Provee el ícono de flecha (ChevronDown).
cn: Es una función utilitaria (probablemente una abreviatura de "classNames") para combinar clases de Tailwind CSS de manera dinámica.
"use client": Indica que este archivo es un componente de React que se debe renderizar en el cliente (Next.js).
¿Qué no hace este archivo?
No implementa ninguna lógica de negocio propia, ni maneja datos.
No contiene estilos CSS propios; depende de Tailwind CSS y utilidades externas.
No renderiza el acordeón con datos concretos; solamente exporta los componentes para que sean usados en otro lugar.
Resumen ultra-rápido
Este archivo provee un set de componentes reutilizables de acordeón basados en Radix y Tailwind, listos para ser usados en la UI de la aplicación con animaciones, accesibilidad y estilos modernos.
