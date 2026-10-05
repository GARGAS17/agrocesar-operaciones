import React, { useState } from 'https://esm.sh/react@18.2.0';
import htm from 'https://esm.sh/htm@3.1.1';
const html = htm.bind(React.createElement);

const CATEGORIAS = ['Tubérculos', 'Hortalizas', 'Frutas', 'Procesados', 'Granos', 'Hierbas'];
const UNIDADES   = ['kg', 'Unidad', 'Bulto (50kg)', 'Caja', 'Tonelada'];

export function PublicarProducto({ usuario }) {
  const [form, setForm] = useState({
    nombre: '', categoria: 'Tubérculos', precio: '',
    cantidad: '', unidad: 'kg', descripcion: '',
    municipio: '', fechaCosecha: ''
  });
  const [exito, setExito] = useState(false);
  const [error, setError]   = useState('');

  const set = (campo, valor) => setForm(f => ({ ...f, [campo]: valor }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.precio || !form.cantidad) {
      setError('Por favor completa los campos obligatorios (*)');
      return;
    }
    setError('');

    const producto = {
      id: Date.now(),
      nombre:       form.nombre,
      categoria:    form.categoria,
      precio:       parseFloat(form.precio),
      cantidad:     parseFloat(form.cantidad),
      unidad:       form.unidad,
      descripcion:  form.descripcion,
      municipio:    form.municipio,
      fechaCosecha: form.fechaCosecha,
      productor:    usuario?.nombre || 'Productor',
      imagen: 'https://images.unsplash.com/photo-1595856424599-e65bf33f07be?auto=format&fit=crop&w=600&q=80'
    };

    window.dispatchEvent(new CustomEvent('producto:publicado', { detail: producto }));

    setExito(true);
    setForm({ nombre: '', categoria: 'Tubérculos', precio: '', cantidad: '', unidad: 'kg', descripcion: '', municipio: '', fechaCosecha: '' });
    setTimeout(() => setExito(false), 5000);
  };

  return html`
    <div>
      <div class="agro-op-page-header">
        <h1>Publicar Nuevo Producto</h1>
        <p>Añade los productos de tu cosecha directamente al Marketplace.</p>
      </div>

      <div class="agro-op-card">
        ${exito && html`
          <div class="agro-op-alert agro-op-alert--success">
            ✅ Producto publicado con éxito en el catálogo.
          </div>
        `}
        ${error && html`
          <div class="agro-op-alert agro-op-alert--error">
            ⚠️ ${error}
          </div>
        `}

        <form onSubmit=${handleSubmit}>
          <div class="agro-op-form-grid">

            <div class="agro-op-form-group agro-op-col-2">
              <label class="agro-op-label">Nombre del Producto *</label>
              <input type="text" class="agro-op-input"
                placeholder="Ej. Yuca Costeña"
                value=${form.nombre}
                onInput=${e => set('nombre', e.target.value)}
                required />
            </div>

            <div class="agro-op-form-group">
              <label class="agro-op-label">Categoría *</label>
              <select class="agro-op-select"
                value=${form.categoria}
                onChange=${e => set('categoria', e.target.value)}>
                ${CATEGORIAS.map(c => html`<option key=${c} value=${c}>${c}</option>`)}
              </select>
            </div>

            <div class="agro-op-form-group">
              <label class="agro-op-label">Precio (COP) *</label>
              <input type="number" class="agro-op-input"
                placeholder="Ej. 15000"
                value=${form.precio}
                onInput=${e => set('precio', e.target.value)}
                required />
            </div>

            <div class="agro-op-form-group">
              <label class="agro-op-label">Cantidad disponible *</label>
              <input type="number" class="agro-op-input"
                placeholder="Ej. 200"
                value=${form.cantidad}
                onInput=${e => set('cantidad', e.target.value)}
                required />
            </div>

            <div class="agro-op-form-group">
              <label class="agro-op-label">Unidad de medida</label>
              <select class="agro-op-select"
                value=${form.unidad}
                onChange=${e => set('unidad', e.target.value)}>
                ${UNIDADES.map(u => html`<option key=${u} value=${u}>${u}</option>`)}
              </select>
            </div>

            <div class="agro-op-form-group">
              <label class="agro-op-label">Municipio de origen</label>
              <input type="text" class="agro-op-input"
                placeholder="Ej. Valledupar"
                value=${form.municipio}
                onInput=${e => set('municipio', e.target.value)} />
            </div>

            <div class="agro-op-form-group">
              <label class="agro-op-label">Fecha de cosecha</label>
              <input type="date" class="agro-op-input"
                value=${form.fechaCosecha}
                onChange=${e => set('fechaCosecha', e.target.value)} />
            </div>

            <div class="agro-op-form-group agro-op-col-2">
              <label class="agro-op-label">Descripción del producto</label>
              <textarea class="agro-op-input agro-op-textarea"
                placeholder="Describe las características de tu producto: variedad, estado de madurez, condiciones de cultivo..."
                value=${form.descripcion}
                onInput=${e => set('descripcion', e.target.value)}
                rows="3" />
            </div>

          </div>

          <div class="agro-op-form-actions">
            <button type="submit" class="agro-op-btn">
              📦 Publicar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}
