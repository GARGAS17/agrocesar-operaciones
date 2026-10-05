import React, { useState } from 'https://esm.sh/react@18.2.0';
import htm from 'https://esm.sh/htm@3.1.1';

// Habilitar HTM sobre React
const html = htm.bind(React.createElement);

export function Operaciones() {
  const [formData, setFormData] = useState({ nombre: '', categoria: 'Tubérculos', precio: '' });
  const [mensajeExito, setMensajeExito] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Crear el objeto del nuevo producto
    const nuevoProducto = {
      id: Date.now(),
      nombre: formData.nombre,
      precio: parseFloat(formData.precio),
      productor: 'Mi Finca (Panel Admin)', // En producción vendría del Auth JWT
      categoria: formData.categoria,
      imagen: 'https://images.unsplash.com/photo-1595856424599-e65bf33f07be?auto=format&fit=crop&w=600&q=80' // Imagen genérica de campo
    };

    // CONTRATO CLAVE: Emitir evento al Shell para que el MFE Catálogo reaccione
    const evento = new CustomEvent('producto:publicado', { detail: nuevoProducto });
    window.dispatchEvent(evento);

    // Feedback visual
    setMensajeExito(true);
    setFormData({ nombre: '', categoria: 'Tubérculos', precio: '' }); // Reset
    setTimeout(() => setMensajeExito(false), 4000);
  };

  return html`
    <div className="agro-op-wrapper">
      <aside className="agro-op-sidebar">
        <div className="agro-op-brand">
          <svg viewBox="0 0 24 24"><path d="M12 2L2 12h3v8h14v-8h3L12 2zm0 2.83L19.17 12H17v6H7v-6H4.83L12 4.83z"/></svg>
          Productor
        </div>
        <div className="agro-op-nav-item active">📦 Publicar Inventario</div>
        <div className="agro-op-nav-item">📋 Mis Pedidos</div>
        <div className="agro-op-nav-item">💰 Liquidaciones</div>
      </aside>
      
      <main className="agro-op-main">
        <div className="agro-op-header">
          <h1>Publicar Nuevo Producto</h1>
          <p>Añade los productos de tu cosecha directamente al Marketplace.</p>
        </div>

        <div className="agro-op-card">
          ${mensajeExito && html`
            <div className="agro-op-alert">
              <span>✅</span> Producto publicado con éxito en el catálogo.
            </div>
          `}
          
          <form onSubmit=${handleSubmit}>
            <div className="agro-op-form-group">
              <label className="agro-op-label">Nombre del Producto</label>
              <input 
                type="text" 
                className="agro-op-input" 
                placeholder="Ej. Yuca Costeña" 
                value=${formData.nombre}
                onInput=${e => setFormData({ ...formData, nombre: e.target.value })}
                required 
              />
            </div>

            <div className="agro-op-form-group">
              <label className="agro-op-label">Categoría</label>
              <select 
                className="agro-op-select"
                value=${formData.categoria}
                onChange=${e => setFormData({ ...formData, categoria: e.target.value })}
              >
                <option value="Tubérculos">Tubérculos</option>
                <option value="Hortalizas">Hortalizas</option>
                <option value="Frutas">Frutas</option>
                <option value="Procesados">Procesados</option>
              </select>
            </div>

            <div className="agro-op-form-group">
              <label className="agro-op-label">Precio (COP por Unidad/Kilo)</label>
              <input 
                type="number" 
                className="agro-op-input" 
                placeholder="Ej. 15000" 
                value=${formData.precio}
                onInput=${e => setFormData({ ...formData, precio: e.target.value })}
                required 
              />
            </div>

            <button type="submit" className="agro-op-btn">
              Publicar Producto
            </button>
          </form>
        </div>
      </main>
    </div>
  `;
}
