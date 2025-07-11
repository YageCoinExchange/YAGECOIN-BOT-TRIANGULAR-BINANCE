"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }


## Análisis detallado de `sonner.tsx`

El archivo `sonner.tsx` define un **componente reutilizable de React** llamado `Toaster`, que sirve como envoltorio para mostrar notificaciones tipo "toast" (mensajes emergentes) en la interfaz de usuario, integrando temas y estilos personalizados.

---

## ¿Qué hace exactamente este archivo?

### 1. **Importaciones**
- **`useTheme` de `next-themes`:** Hook que permite acceder al tema actual de la aplicación (oscuro, claro o sistema).
- **`Toaster` de `sonner`:** Componente de la librería [`sonner`](https://sonner.emilkowal.ski/) que gestiona la visualización y animación de notificaciones toast.

### 2. **Definición de tipos**
- **`ToasterProps`:** Define los props del componente, reutilizando los de `Sonner`.

### 3. **Componente `Toaster`**
- Usa el hook `useTheme` para obtener el tema actual (`theme`). Si no está definido, usa `"system"` por defecto.
- Renderiza el componente `Sonner` (de la librería) con:
  - El tema configurado dinámicamente según el tema global de la app.
  - La clase raíz `"toaster group"` para facilitar la personalización global con Tailwind CSS o CSS Modules.
  - La prop `toastOptions` para definir clases CSS personalizadas para los elementos internos de los toasts:
    - **toast:** Fondo, color de texto, borde y sombra.
    - **description:** Color de texto para la descripción secundaria.
    - **actionButton:** Estilos para el botón de acción principal.
    - **cancelButton:** Estilos para el botón de cancelar.
  - Todos los props adicionales (`...props`) se pasan a `Sonner` para mayor flexibilidad.

### 4. **Exportación**
- Exporta el componente `Toaster` para ser utilizado en cualquier parte de la aplicación.

---

## **Resumen funcional**

- **Función principal:** Provee una forma centralizada, accesible y tematizada de mostrar notificaciones toast en la aplicación, asegurando que respetan el tema visual oscuro/claro y los estilos de la UI.
- **Flexibilidad:** Permite personalizar los estilos de los toasts fácilmente y adaptar el tema dinámicamente.
- **Integración:** Listo para integrarse en el layout principal de la app (generalmente colocado en la raíz para captar todas las notificaciones).

---

## **Ejemplo de uso**

```tsx
<Toaster position="top-right" />
// Luego en cualquier parte: toast("Operación exitosa")
