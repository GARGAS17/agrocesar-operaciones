import React from 'https://esm.sh/react@18.2.0';
import htm from 'https://esm.sh/htm@3.1.1';
const html = htm.bind(React.createElement);

const LIQUIDACIONES_MOCK = [
  { id: 'LIQ-001', pedido: 'PED-002', producto: 'Tomate Chonto',  valor: '$450.000', comision: '$45.000', neto: '$405.000', estado: 'Pagado',    fecha: '2026-09-30' },
  { id: 'LIQ-002', pedido: 'PED-004', producto: 'Mango Tommy',    valor: '$320.000', comision: '$32.000', neto: '$288.000', estado: 'Pagado',    fecha: '2026-09-25' },
  { id: 'LIQ-003', pedido: 'PED-001', producto: 'Yuca Costeña',   valor: '$750.000', comision: '$75.000', neto: '$675.000', estado: 'Pendiente', fecha: '2026-10-05' },
  { id: 'LIQ-004', pedido: 'PED-003', producto: 'Plátano Hartón', valor: '$280.000', comision: '$28.000', neto: '$252.000', estado: 'Pendiente', fecha: '2026-10-10' },
];

const totalPagado    = LIQUIDACIONES_MOCK.filter(l => l.estado === 'Pagado')   .reduce((s, l) => s + parseInt(l.neto.replace(/\D/g,'')), 0);
const totalPendiente = LIQUIDACIONES_MOCK.filter(l => l.estado === 'Pendiente').reduce((s, l) => s + parseInt(l.neto.replace(/\D/g,'')), 0);

export function Liquidaciones() {
  return html`
    <div>
      <div class="agro-op-page-header">
        <h1>Liquidaciones</h1>
        <p>Historial de pagos por tus ventas en el Marketplace.</p>
      </div>

      <div class="agro-op-stats-row">
        <div class="agro-op-stat agro-op-stat--green">
          <span class="agro-op-stat-label">✅ Total recibido</span>
          <span class="agro-op-stat-value">$${totalPagado.toLocaleString('es-CO')}</span>
        </div>
        <div class="agro-op-stat agro-op-stat--yellow">
          <span class="agro-op-stat-label">⏳ Por recibir</span>
          <span class="agro-op-stat-value">$${totalPendiente.toLocaleString('es-CO')}</span>
        </div>
        <div class="agro-op-stat agro-op-stat--blue">
          <span class="agro-op-stat-label">📦 Ventas totales</span>
          <span class="agro-op-stat-value">${LIQUIDACIONES_MOCK.length}</span>
        </div>
      </div>

      <div class="agro-op-card agro-op-card--no-pad">
        <table class="agro-op-table">
          <thead>
            <tr>
              <th>ID</th><th>Pedido</th><th>Producto</th>
              <th>Valor venta</th><th>Comisión (10%)</th>
              <th>Neto a recibir</th><th>Fecha pago</th><th>Estado</th>
            </tr>
          </thead>
          <tbody>
            ${LIQUIDACIONES_MOCK.map(l => html`
              <tr key=${l.id}>
                <td class="agro-op-id">${l.id}</td>
                <td class="agro-op-id">${l.pedido}</td>
                <td>${l.producto}</td>
                <td class="agro-op-money">${l.valor}</td>
                <td class="agro-op-money agro-op-money--red">${l.comision}</td>
                <td class="agro-op-money agro-op-money--green">${l.neto}</td>
                <td>${l.fecha}</td>
                <td>
                  <span class="agro-op-badge"
                    style=${{ 
                      background: l.estado === 'Pagado' ? '#dcfce7' : '#fef9c3',
                      color:      l.estado === 'Pagado' ? '#166534' : '#854d0e'
                    }}>
                    ${l.estado === 'Pagado' ? '✅ Pagado' : '⏳ Pendiente'}
                  </span>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
