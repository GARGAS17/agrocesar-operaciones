import React from 'https://esm.sh/react@18.2.0';
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';
import htm from 'https://esm.sh/htm@3.1.1';
import { Operaciones } from './Operaciones.js';

const html = htm.bind(React.createElement);

// Objeto para mantener referencias a los "roots" de React y poder desmontarlos limpiamente
const reactRoots = {};

const injectStyles = () => {
  if (!document.getElementById('agro-op-styles')) {
    const link = document.createElement('link');
    link.id = 'agro-op-styles';
    link.rel = 'stylesheet';
    // Uso avanzado de import.meta.url para evitar problemas de CORS y ruteo en el Shell
    link.href = new URL('./styles.css', import.meta.url).href; 
    document.head.appendChild(link);
  }
};

window.mountAgroOperaciones = (containerId, props) => {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`[MFE Operaciones] Error: No se encontró el contenedor '#${containerId}'`);
    return;
  }
  
  injectStyles();
  
  // React 18 createRoot API
  const root = createRoot(container);
  reactRoots[containerId] = root;
  
  root.render(html`<${Operaciones} ...${props} />`);
  console.info(`[MFE Operaciones] ✅ Montado exitosamente con React 18 en #${containerId}`);
};

window.unmountAgroOperaciones = (containerId) => {
  const root = reactRoots[containerId];
  if (root) {
    root.unmount(); // Destruye el árbol de React y limpia listeners/memoria
    delete reactRoots[containerId];
    console.info(`[MFE Operaciones] 🧹 Desmontado limpiamente.`);
  }
};
