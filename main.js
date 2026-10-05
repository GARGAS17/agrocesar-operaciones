import React from 'https://esm.sh/react@18.2.0';
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';
import htm from 'https://esm.sh/htm@3.1.1';
import { App } from './components/App.js';

const html = htm.bind(React.createElement);

// Registro de roots de React para mount/unmount limpio
const reactRoots = {};

// Inyecta los estilos CSS solo una vez
const injectStyles = () => {
  if (!document.getElementById('agro-op-styles')) {
    const link = document.createElement('link');
    link.id   = 'agro-op-styles';
    link.rel  = 'stylesheet';
    link.href = new URL('./styles.css', import.meta.url).href;
    document.head.appendChild(link);
  }
};

/**
 * Monta el MFE Operaciones en el contenedor indicado.
 * @param {string} containerId - ID del div donde se monta el MFE
 * @param {object} props        - Props del Shell: { usuario: { nombre, rol, token } }
 */
window.mountAgroOperaciones = (containerId, props = {}) => {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`[MFE Operaciones] ❌ No se encontró el contenedor '#${containerId}'`);
    return;
  }

  injectStyles();

  // Si ya estaba montado, desmonta primero para evitar doble render
  if (reactRoots[containerId]) {
    reactRoots[containerId].unmount();
  }

  const root = createRoot(container);
  reactRoots[containerId] = root;

  const usuario = props.usuario || { nombre: 'Productor', rol: 'productor' };
  root.render(html`<${App} usuario=${usuario} />`);

  console.info(`[MFE Operaciones] ✅ Montado en #${containerId} como "${usuario.nombre}"`);
};

/**
 * Desmonta el MFE y libera toda la memoria de React.
 * @param {string} containerId
 */
window.unmountAgroOperaciones = (containerId) => {
  const root = reactRoots[containerId];
  if (root) {
    root.unmount();
    delete reactRoots[containerId];
    console.info(`[MFE Operaciones] 🧹 Desmontado limpiamente de #${containerId}`);
  }
};
