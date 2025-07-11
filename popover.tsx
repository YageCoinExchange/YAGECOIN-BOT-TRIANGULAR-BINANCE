"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }

## Análisis detallado de `popover.tsx`

El archivo `popover.tsx` define y exporta un pequeño conjunto de **componentes reutilizables de React** para crear popovers (ventanas emergentes flotantes) en la interfaz de usuario, utilizando la librería [@radix-ui/react-popover](https://www.radix-ui.com/primitives/docs/components/popover) como base.

## ¿Qué hace exactamente?

### 1. **Importaciones**
- **React**: Para usar componentes y forwardRef.
- **@radix-ui/react-popover**: Librería que proporciona la funcionalidad accesible y controlada para popovers.
- **cn (from "@/lib/utils")**: Función utilitaria para combinar clases CSS condicionalmente.

### 2. **Definición de Componentes**

- **Popover**: Es un alias directo de `PopoverPrimitive.Root`. Representa el componente raíz del popover, es decir, el contexto que contiene el trigger y el contenido.
- **PopoverTrigger**: Es un alias de `PopoverPrimitive.Trigger`. Es el componente que, al hacer clic o enfocar, abrirá el popover (por ejemplo, un botón o un ícono).
- **PopoverContent**: Es un componente personalizado que utiliza `React.forwardRef` para permitir el manejo de referencias y añade estilos personalizados.
  - **Props principales**:
    - `align`: Determina la alineación horizontal del popover respecto al trigger (por defecto "center").
    - `sideOffset`: Espacio entre el trigger y el popover (por defecto 4 px).
    - `className`: Permite agregar clases adicionales.
  - **Renderizado**:
    - Utiliza un portal (`PopoverPrimitive.Portal`) para renderizar el contenido fuera del flujo normal del DOM, lo que ayuda a evitar problemas de stacking/contexto.
    - El contenido tiene clases CSS que aplican estilos visuales (tamaño, bordes, fondo, sombras) y animaciones según el estado del popover (apertura/cierre, desvanecido, deslizamiento).
    - Permite pasar cualquier otra propiedad adicional de `PopoverPrimitive.Content`.

### 3. **Exportación**
Exporta los tres componentes (`Popover`, `PopoverTrigger`, `PopoverContent`) para que puedan ser usados y compuestos en otras partes de la aplicación.

---

## **Resumen funcional**
- **Facilita la creación de popovers accesibles, animados y consistentes** en el proyecto, usando una base robusta (Radix UI) y permitiendo personalización visual.
- **Abstracción**: Oculta los detalles de Radix y los estilos, proveyendo una API simple y coherente.
- **Usabilidad**: El desarrollador puede importar estos componentes y construir popovers fácilmente, solo componiendo `Popover`, `PopoverTrigger` y `PopoverContent`.

---

## **Ejemplo de uso típico**

```tsx
<Popover>
  <PopoverTrigger>
    <Button>Mostrar info</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>Este es el contenido del popover.</p>
  </PopoverContent>
</Popover>
