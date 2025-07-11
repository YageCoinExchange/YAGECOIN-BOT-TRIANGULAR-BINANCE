import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }

## Análisis detallado de `textarea.tsx`

El archivo `textarea.tsx` define un **componente reutilizable de React** llamado `Textarea`, que encapsula y estiliza el elemento HTML `<textarea>` para ser usado de forma coherente y personalizada en la interfaz de usuario de la aplicación.

---

## ¿Qué hace exactamente este archivo?

### 1. **Importaciones**
- **React:** Para definir el componente y manejar referencias (`forwardRef`).
- **cn:** Función utilitaria que permite combinar clases CSS de forma condicional y elegante (usualmente con Tailwind CSS).

---

### 2. **Definición del componente `Textarea`**

- **Uso de `forwardRef`:**  
  Permite que el componente reciba una referencia externa (`ref`), útil para controlar el foco o integrar con formularios.
- **Props:**  
  Acepta todas las propiedades estándar de un `<textarea>` en React, incluyendo `className` para estilos personalizados.

- **Renderizado y estilos:**  
  - Renderiza un `<textarea>` que:
    - Ocupa el ancho completo del contenedor (`w-full`)
    - Tiene una altura mínima de 80px (`min-h-[80px]`)
    - Bordes redondeados y color de fondo según el tema.
    - Espaciado interno (`px-3 py-2`) y fuente base (`text-base`).
    - Placeholder estilizado y transición de foco con anillo de color (`focus-visible:ring-2`), mejorando la accesibilidad y experiencia visual.
    - Permite agregar o sobrescribir clases con la prop `className`.

---

### 3. **DisplayName y exportación**

- Define el `displayName` como `"Textarea"` para facilitar la depuración y herramientas de desarrollo.
- Exporta el componente `Textarea` para su uso global en la aplicación.

---

## **Resumen funcional**

- **Función principal:**  
  Proveer un `<textarea>` con estilos modernos y consistentes, fácil de personalizar y de integrar en formularios o cualquier parte de la aplicación.
- **Accesibilidad:**  
  Mejora el enfoque y la experiencia de usuario gracias a los estilos de foco y placeholder.
- **Flexibilidad:**  
  Permite usar características estándar del `<textarea>` y personalizar su apariencia según las necesidades del proyecto.

---

## **Ejemplo de uso**

```tsx
<Textarea placeholder="Escribe tu comentario aquí..." rows={4} />
