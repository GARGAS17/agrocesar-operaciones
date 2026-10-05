import React from 'https://esm.sh/react@18.2.0';
import htm from 'https://esm.sh/htm@3.1.1';
const html = htm.bind(React.createElement);

export function Sidebar({ activa, onChange, usuario }) {
  const items = [
    { id: 'publicar',      icono: '📦', label: 'Publicar Inventario' },
    { id: 'pedidos',       icono: '📋', label: 'Mis Pedidos' },
    { id: 'liquidaciones', icono: '💰', label: 'Liquidaciones' },
  ];

  return html`
    <aside class="agro-op-sidebar">
      <div class="agro-op-brand">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 12h3v8h14v-8h3L12 2zm0 2.83L19.17 12H17v6H7v-6H4.83L12 4.83z"/>
        </svg>
        Productor
      </div>

      ${usuario && html`
        <div class="agro-op-user">
          <div class="agro-op-avatar">${(usuario.nombre || 'P')[0].toUpperCase()}</div>
          <div class="agro-op-user-info">
            <span class="agro-op-user-name">${usuario.nombre || 'Productor'}</span>
            <span class="agro-op-user-role">Panel de control</span>
          </div>
        </div>
      `}

      <nav class="agro-op-nav">
        ${items.map(item => html`
          <button
            key=${item.id}
            class=${'agro-op-nav-item' + (activa === item.id ? ' active' : '')}
            onClick=${() => onChange(item.id)}
          >
            <span class="agro-op-nav-icon">${item.icono}</span>
            ${item.label}
          </button>
        `)}
      </nav>
    </aside>
  `;
}
