"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}


## Análisis detallado de `select.tsx`

El archivo `select.tsx` define una colección de **componentes reutilizables de React** para construir menús desplegables tipo "Select" personalizados, usando como base la librería [@radix-ui/react-select](https://www.radix-ui.com/primitives/docs/components/select). Estos componentes están diseñados para proporcionar una experiencia de selección avanzada, accesible y estilizada en la interfaz de usuario.

---

## ¿Qué hace exactamente este archivo?

### 1. **Composición y propósito de los componentes**

- **Select, SelectGroup, SelectValue**:  
  Son alias directos de los componentes principales de Radix UI. Proveen la estructura base del select: el contenedor, grupos de opciones y el valor seleccionado.

- **SelectTrigger**:  
  - Es el botón que el usuario ve y pulsa para abrir el menú.
  - Usa un ícono de flecha hacia abajo (`ChevronDown`).
  - Aplica estilos modernos (borde, fondo, transición, foco, etc.).
  - Permite personalizar clases y pasar children.

- **SelectContent**:  
  - Renderiza el menú desplegable con las opciones.
  - Usa un portal (`SelectPrimitive.Portal`) para mostrar el menú flotante sobre otros elementos de la UI.
  - Incluye botones de scroll (`SelectScrollUpButton`, `SelectScrollDownButton`) para menús extensos.
  - Soporta posicionamiento tipo "popper" (flotante y alineado al trigger).
  - Permite personalización de estilos y posición.

- **SelectScrollUpButton / SelectScrollDownButton**:  
  - Botones para desplazar el contenido del menú hacia arriba o abajo cuando hay muchas opciones.
  - Usan íconos de flecha hacia arriba y hacia abajo.

- **SelectLabel**:  
  - Permite mostrar etiquetas/separadores en el menú (por ejemplo, para agrupar opciones).
  - Con estilos para distinguirlo del resto de opciones.

- **SelectItem**:  
  - Renderiza cada opción individual del menú.
  - Soporta selección visual (ícono `Check` cuando está seleccionada).
  - Maneja estados de foco, deshabilitado, etc.
  - Permite personalización de clases.

- **SelectSeparator**:  
  - Línea divisoria para separar grupos de opciones.

---

### 2. **Accesibilidad y usabilidad**
- Basados en Radix UI, todos los componentes cumplen estándares de accesibilidad.
- Permiten navegación por teclado, foco visible, roles ARIA, y soporte para lectores de pantalla.
- Permiten usar menús desplegables grandes con scroll y botones de desplazamiento.

---

### 3. **Personalización**
- El archivo utiliza una función utilitaria `cn` para combinar dinámicamente clases CSS, facilitando la personalización visual.
- Componentes preparados para recibir clases adicionales y props extendidas.

---

## **Resumen funcional**

- Permite construir **menús desplegables personalizados, accesibles y modernos** para seleccionar opciones.
- Soporta agrupación, separación, scroll y visualización del valor seleccionado.
- Listo para integrarse en formularios, paneles de configuración y cualquier parte de la aplicación donde se requiera selección de opciones.

---

## **Ejemplo de uso**

```tsx
<Select>
  <SelectTrigger>Selecciona una opción</SelectTrigger>
  <SelectContent>
    <SelectItem value="opcion1">Opción 1</SelectItem>
    <SelectItem value="opcion2">Opción 2</SelectItem>
  </SelectContent>
</Select>
