"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }

## Análisis detallado de `toggle-group.tsx`

El archivo `toggle-group.tsx` define dos componentes reutilizables de React, `ToggleGroup` y `ToggleGroupItem`, que sirven para crear grupos de botones tipo "toggle" (interruptores o botones seleccionables), permitiendo seleccionar una o varias opciones visualmente agrupadas y estilizadas de forma coherente.

---

## ¿Qué hace exactamente este archivo?

### 1. **Uso de Radix UI y utilidades**

- Utiliza la librería [@radix-ui/react-toggle-group](https://www.radix-ui.com/primitives/docs/components/toggle-group) como base para la lógica y accesibilidad de grupos de toggles.
- Usa una función de utilidades (`cn`) para componer clases CSS.
- Importa y utiliza variantes de estilos (`toggleVariants`) desde otro archivo para permitir personalización (por ejemplo, tamaño y color).

---

### 2. **Contexto de configuración**

- Define un `ToggleGroupContext` para compartir propiedades de variante (`variant`) y tamaño (`size`) entre el grupo y los items, evitando repetir props en cada hijo y asegurando consistencia visual.

---

### 3. **Componente `ToggleGroup`**

- Es un wrapper alrededor de `ToggleGroupPrimitive.Root`.
- Acepta props estándar y props de variante/tamaño.
- Renderiza a sus hijos envueltos en un proveedor de contexto, pasando `variant` y `size` para uso descendente.
- Permite personalización adicional vía `className`.
- Añade clases para disposición en línea y separación entre items.

---

### 4. **Componente `ToggleGroupItem`**

- Es un wrapper para cada botón individual (`ToggleGroupPrimitive.Item`).
- Consume el contexto para obtener `variant` y `size` (si no se pasan directamente via props).
- Aplica clases dinámicas usando `toggleVariants`, asegurando que todos los items tengan el mismo estilo según el grupo.
- Permite incluir contenido personalizado como íconos o texto.
- Permite sobrescribir estilos con `className`.

---

### 5. **Exportación**

- Exporta ambos componentes para ser usados donde se requiera seleccionar opciones en grupo (por ejemplo, filtros, selección de vista, etc).

---

## **Resumen funcional**

- Permite construir grupos de toggles con estilos y comportamiento consistentes y personalizables.
- Garantiza accesibilidad y navegación por teclado gracias a Radix UI.
- Facilita centralizar el control visual de los toggles a través de contexto para variantes y tamaños.

---

## **Ejemplo de uso**

```tsx
<ToggleGroup variant="outline" size="lg" type="single" value={value} onValueChange={setValue}>
  <ToggleGroupItem value="left">Izquierda</ToggleGroupItem>
  <ToggleGroupItem value="center">Centro</ToggleGroupItem>
  <ToggleGroupItem value="right">Derecha</ToggleGroupItem>
</ToggleGroup>
