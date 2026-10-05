import React, { useState } from 'https://esm.sh/react@18.2.0';
import htm from 'https://esm.sh/htm@3.1.1';
const html = htm.bind(React.createElement);

const PEDIDOS_MOCK = [
  { id: 'PED-001', producto: 'Yuca Costeña',  cantidad: '50 kg',  comprador: 'Mercado Central Bogotá', estado: 'Pendiente',  fecha: '2026-10-01', total: '$750.000'  },
  { id: 'PED-002', producto: 'Tomate Chonto', cantidad: '30 kg',  comprador: 'Fruver Los Andes',        estado: 'Entregado', fecha: '2026-09-28', total: '$450.000'  },
  { id: 'PED-003', producto: 'Plátano Hartón',cantidad: '100 kg', comprador: 'Supermercado La 14',      estado: 'En camino', fecha: '2026-10-03', total: '$280.000'  },
  { id: 'PED-004', producto: 'Mango Tommy',   cantidad: '80 unid',comprador: 'Tienda Online AgroCesar', estado: 'Entregado', fecha: '2026-09-20', total: '$320.000'  },
];

const ESTADO_BADGE = {
  'Pendiente':  { bg: '#fef9c3', color: '#854d0e', label: '⏳ Pendiente'  },
  'En camino':  { bg: '#dbeafe', color: '#1e40af', label: '🚚 En camino'  },
  'Entregado':  { bg: '#dcfce7', color: '#166534', label: '✅ Entregado'  },
  'Cancelado':  { bg: '#fee2e2', color: '#991b1b', label: '❌ Cancelado'  },
};

export function MisPedidos() {
  const [filtro, setFiltro] = useState('Todos');
  const estados = ['Todos', 'Pendiente', 'En camino', 'Entregado'];
  const pedidos = filtro === 'Todos' ? PEDIDOS_MOCK : PEDIDOS_MOCK.filter(p => p.estado === filtro);

  return html`
    <div>
      <div class="agro-op-page-header">
        <h1>Mis Pedidos</h1>
        <p>Seguimiento de todos los pedidos recibidos en tu finca.</p>
      </div>

      <div class="agro-op-filters">
        ${estados.map(e => html`
          <button key=${e}
            class=${'agro-op-filter-btn' + (filtro === e ? ' active' : '')}
            onClick=${() => setFiltro(e)}>
            ${e}
          </button>
        `)}
      </div>

      <div class="agro-op-card agro-op-card--no-pad">
        ${pedidos.length === 0
          ? html`<p class="agro-op-empty">No hay pedidos con ese estado.</p>`
          : html`
            <table class="agro-op-table">
              <thead>
                <tr>
                  <th>ID</th><th>Producto</th><th>Cantidad</th>
                  <th>Comprador</th><th>Total</th><th>Fecha</th><th>Estado</th>
                </tr>
              </thead>
              <tbody>
                ${pedidos.map(p => html`
                  <tr key=${p.id}>
                    <td class="agro-op-id">${p.id}</td>
                    <td>${p.producto}</td>
                    <td>${p.cantidad}</td>
                    <td>${p.comprador}</td>
                    <td class="agro-op-money">${p.total}</td>
                    <td>${p.fecha}</td>
                    <td>
                      <span class="agro-op-badge"
                        style=${{ background: ESTADO_BADGE[p.estado]?.bg, color: ESTADO_BADGE[p.estado]?.color }}>
                        ${ESTADO_BADGE[p.estado]?.label}
                      </span>
                    </td>
                  </tr>
                `)}
              </tbody>
            </table>
          `
        }
      </div>
    </div>
  `;
}
