import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }


## Análisis detallado de `skeleton.tsx`

El archivo `skeleton.tsx` define un **componente reutilizable de React** llamado `Skeleton`. Este componente se utiliza para mostrar un "esqueleto" o placeholder animado mientras se están cargando datos o contenidos en la interfaz de usuario. Esta técnica es común en aplicaciones modernas para mejorar la percepción de velocidad y experiencia de usuario durante la carga de información.

---

## ¿Qué hace exactamente este archivo?

### 1. **Importaciones**
- Importa la función `cn` desde `@/lib/utils`, que probablemente sirve para combinar clases CSS de manera condicional.

### 2. **Componente `Skeleton`**
- **Props:** Acepta todas las propiedades estándar de un `<div>` de React (`React.HTMLAttributes<HTMLDivElement>`), incluyendo `className` para personalización de estilos.
- **Renderizado:**
  - Renderiza un `<div>` con las siguientes clases CSS por defecto:
    - `animate-pulse`: Aplica una animación de "pulso" que da la sensación de que el elemento está cargando.
    - `rounded-md`: Bordes redondeados medianos.
    - `bg-muted`: Fondo con un color neutro o atenuado, típico de placeholders.
  - Permite agregar clases adicionales mediante `className`.
  - Todos los demás props se pasan directamente al `<div>`, permitiendo modificar atributos como tamaño, id, etc.

---

## **Resumen funcional**

- **Función principal:** Actuar como placeholder visual animado en lugares donde se espera que los datos tarden en cargarse (por ejemplo, en tarjetas, listas, avatares, formularios, etc.).
- **Personalizable:** Puedes cambiar tamaño, forma o estilos con la prop `className`.
- **Sencillo y eficiente:** No tiene lógica adicional; es solo un contenedor estilizado y animado.

---

## **Ejemplo de uso**

```tsx
<Skeleton className="h-6 w-32 mb-2" />  // Línea de texto simulada
<Skeleton className="h-10 w-10 rounded-full" /> // Avatar circular en carga
