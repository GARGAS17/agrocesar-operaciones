import React, { useState } from 'https://esm.sh/react@18.2.0';
import htm from 'https://esm.sh/htm@3.1.1';
import { Sidebar }          from './Sidebar.js';
import { PublicarProducto } from './PublicarProducto.js';
import { MisPedidos }       from './MisPedidos.js';
import { Liquidaciones }    from './Liquidaciones.js';

const html = htm.bind(React.createElement);

export function App({ usuario }) {
  const [vista, setVista] = useState('publicar');

  const renderVista = () => {
    switch (vista) {
      case 'publicar':      return html`<${PublicarProducto} usuario=${usuario} />`;
      case 'pedidos':       return html`<${MisPedidos}       usuario=${usuario} />`;
      case 'liquidaciones': return html`<${Liquidaciones}    usuario=${usuario} />`;
      default:              return html`<${PublicarProducto} usuario=${usuario} />`;
    }
  };

  return html`
    <div class="agro-op-wrapper">
      <${Sidebar} activa=${vista} onChange=${setVista} usuario=${usuario} />
      <main class="agro-op-main">
        ${renderVista()}
      </main>
    </div>
  `;
}
