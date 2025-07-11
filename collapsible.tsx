"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }


#Copilot said: Aquí tienes un resumen detallado sobre el
Aquí tienes un resumen detallado sobre el archivo collapsible.tsx:

Propósito general
El archivo collapsible.tsx define y exporta componentes relacionados con la funcionalidad de contenido colapsable (expandible/plegable) en una interfaz de usuario React, utilizando la librería @radix-ui/react-collapsible para asegurar accesibilidad, animaciones y control de estado.

¿Qué hace exactamente el archivo?
Importación de Radix Collapsible:

Importa todos los componentes del paquete @radix-ui/react-collapsible bajo el alias CollapsiblePrimitive.
Reexportación de componentes:

Define y reexporta:
Collapsible: Componente raíz que controla el estado colapsado/expandido del contenido.
CollapsibleTrigger: Componente que actúa como disparador (usualmente un botón o ícono) para expandir o contraer el contenido.
CollapsibleContent: Componente que contiene el contenido que se muestra u oculta al colapsar/expandir.
No añade lógica ni estilos personalizados:

No agrega lógica adicional, estados, ni clases CSS.
Su único objetivo es reexportar los componentes de Radix para su uso directo en la app, posiblemente para centralizar los imports o facilitar futuras personalizaciones.
¿Qué NO hace este archivo?
No implementa ningún comportamiento propio, solo actúa como un “proxy” a los componentes de Radix.
No contiene lógica de presentación, ni ejemplos de uso.
No añade props, validaciones ni wrappers adicionales.
Ejemplo de uso típico
TSX
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./collapsible";

<Collapsible>
  <CollapsibleTrigger>Mostrar/Ocultar</CollapsibleTrigger>
  <CollapsibleContent>
    <p>Este contenido se puede expandir o contraer.</p>
  </CollapsibleContent>
</Collapsible>
Resumen rápido
collapsible.tsx simplemente reexporta los componentes principales de contenido colapsable de Radix UI para ser usados en la aplicación, facilitando la creación de secciones expandibles y accesibles sin añadir lógica ni estilos propios. Es un archivo de “plumbing” o infraestructura para mantener ordenado el código base.
