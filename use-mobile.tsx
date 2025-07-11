import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

## Análisis detallado de `use-mobile.tsx`

El archivo `use-mobile.tsx` define un **custom hook de React** llamado `useIsMobile`, el cual permite detectar y reaccionar automáticamente cuando la interfaz está siendo visualizada en un dispositivo móvil (o una ventana con un ancho típico de móvil).

---

## ¿Qué hace exactamente este archivo?

### 1. **Constante de breakpoint**
- **`MOBILE_BREAKPOINT = 768`**
  - Define el ancho en píxeles (768px) a partir del cual se considera que la pantalla es "móvil".
  - Es un valor estándar para separar interfaces mobile/tablet de desktop.

---

### 2. **Hook `useIsMobile`**

- **Estado interno:**  
  - Usa `React.useState` para guardar si el dispositivo es móvil (`isMobile`).

- **Efecto `useEffect`:**
  - Se ejecuta una sola vez al montar el componente.
  - Crea un objeto `MediaQueryList` usando `window.matchMedia` con la consulta `(max-width: 767px)`.
  - Define una función `onChange` que actualiza el estado `isMobile` dependiendo si el ancho de la ventana es menor que el breakpoint.
  - Añade un event listener a la media query, para que cuando el usuario cambie el tamaño de la ventana (o rote el dispositivo), el estado se actualice automáticamente.
  - Inicializa el estado comprobando el ancho de la ventana en el momento del montaje.
  - Elimina el event listener al desmontar el componente.

- **Valor de retorno:**  
  - Retorna `!!isMobile`, es decir, `true` si la pantalla es menor a 768px, `false` en caso contrario.

---

## **Resumen funcional**

- **Función principal:**  
  Permite saber en tiempo real si la aplicación está siendo visualizada en un dispositivo móvil/ventana pequeña.
- **Reactivo:**  
  Se actualiza automáticamente si el usuario cambia el tamaño de la ventana.
- **Uso típico:**  
  Permite renderizar interfaces, menús, layouts o comportamientos diferentes para móviles y escritorio.

---

## **Ejemplo de uso**

```tsx
const isMobile = useIsMobile();

return (
  <div>
    {isMobile ? "Estás en móvil" : "Estás en escritorio"}
  </div>
)
