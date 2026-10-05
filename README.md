# AgroCesar: MFE Operaciones (Panel de Productor)

Este repositorio contiene el Micro Frontend (MFE) responsable del panel de control para los productores, donde pueden publicar su inventario agrícola.

## 🛠 Tecnologías (Cumpliendo el límite de 200KB)
* **React 18 & ReactDOM 18** (vía ESM CDN, sin Node.js ni Webpack).
* **HTM (Hyperscript Tagged Markup)** para escribir JSX sin compilación.
* **CSS Vainilla** para diseño premium de bajo peso.

## 🤝 Contratos de Integración
Este MFE exporta las siguientes funciones globales para que el App Shell las consuma:

* **Montaje:** `window.mountAgroOperaciones(containerId, props)`
* **Desmontaje:** `window.unmountAgroOperaciones(containerId)`
* **Eventos Salientes:** Al enviar el formulario, emite `producto:publicado` hacia el Event Bus de `window`.

## 🧪 Cómo probarlo localmente
1. Clona este repositorio.
2. Levanta un servidor local en esta carpeta (ej. usando la extensión *Live Server* o `npx serve`).
3. Abre el archivo `contrato.html` para visualizar el Sandbox interactivo y probar que los eventos se despachen correctamente.

## 🚀 Despliegue
Este repositorio incluye `vercel.json` y `netlify.toml` preconfigurados con cabeceras `Access-Control-Allow-Origin: *` para evitar errores de CORS al ser consumido desde otros dominios.
