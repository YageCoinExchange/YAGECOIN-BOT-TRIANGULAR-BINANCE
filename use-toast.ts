"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }

## Análisis detallado de `use-toast.ts`

El archivo `use-toast.ts` implementa la **lógica central y el custom hook para un sistema de notificaciones tipo "toast"** en React, inspirado en la librería `react-hot-toast`. Este sistema permite mostrar mensajes emergentes y temporales en la interfaz, como avisos de éxito, error, información, etc.

---

## ¿Qué hace exactamente este archivo?

### 1. **Definición de tipos y constantes**

- **ToasterToast:**  
  Tipo que representa un toast individual, incluyendo título, descripción, acciones, etc.
- **TOAST_LIMIT:**  
  Limita la cantidad máxima de toasts activos (en este caso, solo uno a la vez).
- **TOAST_REMOVE_DELAY:**  
  Indica el tiempo (en milisegundos) que un toast permanece antes de ser removido (por defecto, un tiempo extremadamente largo: 1,000,000 ms).

---

### 2. **Acciones y reducer**

Define un patrón de gestión de estado similar a Redux para los toasts, con acciones como:
- **ADD_TOAST:** Agrega un nuevo toast.
- **UPDATE_TOAST:** Actualiza un toast existente.
- **DISMISS_TOAST:** Marca el toast como cerrado (open: false) y lo programa para ser removido.
- **REMOVE_TOAST:** Elimina el toast del estado.

El **reducer** gestiona el arreglo de toasts y aplica las acciones anteriores.

---

### 3. **Gestión de tiempo y eliminación automática**

- Usa un mapa `toastTimeouts` para manejar los timeouts que eliminan automáticamente los toasts después de cierto tiempo.
- La función `addToRemoveQueue` garantiza que cada toast se remueva tras el delay definido.

---

### 4. **Gestión de listeners y estado global**

- Se mantiene una variable `memoryState` como fuente de verdad global del estado de los toasts.
- Un arreglo de `listeners` se utiliza para notificar a todos los componentes que usan el hook cuando hay cambios en el estado global, implementando así un patrón de suscripción.

---

### 5. **Función `toast`**

- Permite crear un nuevo toast de forma programática.
- Devuelve un objeto con métodos para actualizar (`update`) o cerrar (`dismiss`) ese toast específico.

---

### 6. **Hook `useToast`**

- Permite que cualquier componente React acceda al estado actual de los toasts y a las funciones para emitir y cerrar toasts.
- Se encarga de suscribir y desuscribir el componente a los cambios en el estado global de los toasts.

---

## **Resumen funcional**

- **Provee una API para emitir, actualizar y cerrar notificaciones tipo toast** desde cualquier parte de la aplicación React.
- Soporta solo un toast visible a la vez (por el TOAST_LIMIT).
- Maneja la visibilidad y eliminación automática de los toasts tras un tiempo definido.
- Permite acciones dentro de los toasts y control total sobre su ciclo de vida.
- Su arquitectura desacopla la lógica de los toasts de la UI, facilitando su uso con cualquier componente visual que los renderice.

---

## **Ejemplo de uso**

```tsx
const { toast, dismiss } = useToast()

toast({ title: "¡Éxito!", description: "El proceso se completó correctamente." })
