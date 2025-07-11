import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}


#El archivo layout.tsx define el layout raíz (Root Layout) para una aplicación desarrollada con Next.js (probablemente versión 13 o superior, usando la arquitectura de app directory). Su propósito es envolver todas las páginas y componentes de la aplicación, estableciendo la estructura HTML global y aplicando estilos y metadatos principales.

**Análisis detallado:**

1. **Importaciones:**
   - Importa el tipo `Metadata` de Next.js, que se usa para especificar metadatos del sitio (título, descripción, etc.).
   - Importa los estilos globales desde `globals.css`, asegurando que todos los estilos globales se apliquen a la aplicación entera.

2. **Objeto de metadatos:**
   - Define `metadata`, un objeto que incluye:
     - `title`: Título de la aplicación ('v0 App').
     - `description`: Descripción corta de la app.
     - `generator`: Indica que fue creada con v0.dev (herramienta de generación de UI).

   Estos metadatos se utilizan para mejorar el SEO y la presentación cuando la página es compartida.

3. **RootLayout (componente principal):**
   - Es el layout raíz que Next.js usará para envolver toda la app.
   - Recibe `children`, que representa el contenido de la página actual.
   - Renderiza una estructura HTML básica:
     - `<html lang="en">`: Define el idioma del documento como inglés.
     - `<body>{children}</body>`: Inserta el contenido de la página dentro del body.

**¿Qué NO hace este archivo?**
- No define cabeceras de navegación ni pies de página.
- No incluye lógica de autenticación, providers, ni scripts adicionales.
- No maneja temas (dark/light) ni personalización avanzada del layout.

**Resumen:**  
layout.tsx establece el esqueleto HTML global y los metadatos principales de la app Next.js, asegurando que todos los estilos globales estén disponibles y que el contenido de cada página se integre correctamente en la estructura HTML base.
