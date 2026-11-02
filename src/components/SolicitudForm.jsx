import React, { useState } from 'react';
import { PlusCircle, AlertCircle } from 'lucide-react';

function SolicitudForm({ onAgregarSolicitud }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [solicitante, setSolicitante] = useState('');
  const [prioridad, setPrioridad] = useState('media');
  const [errores, setErrores] = useState({});

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!titulo.trim()) {
      nuevosErrores.titulo = 'El título de la solicitud es obligatorio';
    }
    if (!descripcion.trim()) {
      nuevosErrores.descripcion = 'La descripción es obligatoria';
    }
    if (!solicitante.trim()) {
      nuevosErrores.solicitante = 'El nombre del solicitante es obligatorio';
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    onAgregarSolicitud({
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      solicitante: solicitante.trim(),
      prioridad
    });

    setTitulo('');
    setDescripcion('');
    setSolicitante('');
    setPrioridad('media');
    setErrores({});
  };

  return (
    <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#e2e8f0]/80 transition-all">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-[#005ac1]/10 flex items-center justify-center text-[#005ac1]">
          <PlusCircle className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#191c1d]">Nueva Solicitud</h2>
          <p className="text-xs text-[#44474e]">Ingresa los datos para registrar la incidencia técnica</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#44474e] mb-1.5">
            Título de la solicitud
          </label>
          <input
            type="text"
            placeholder="Ej. Problema de acceso a VPN corporativa"
            value={titulo}
            onChange={(e) => {
              setTitulo(e.target.value);
              if (errores.titulo) setErrores((prev) => ({ ...prev, titulo: null }));
            }}
            className={`w-full px-4 py-3 rounded-2xl bg-[#f1f4f9] text-[#191c1d] placeholder-[#74777f] text-sm focus:outline-none focus:ring-2 transition-all ${
              errores.titulo
                ? 'ring-2 ring-[#ba1a1a] bg-[#ffdad6]/20'
                : 'focus:ring-[#005ac1] focus:bg-white'
            }`}
          />
          {errores.titulo && (
            <p className="flex items-center gap-1.5 text-xs text-[#ba1a1a] mt-1.5 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errores.titulo}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#44474e] mb-1.5">
            Nombre del solicitante
          </label>
          <input
            type="text"
            placeholder="Ej. Carlos Mendoza"
            value={solicitante}
            onChange={(e) => {
              setSolicitante(e.target.value);
              if (errores.solicitante) setErrores((prev) => ({ ...prev, solicitante: null }));
            }}
            className={`w-full px-4 py-3 rounded-2xl bg-[#f1f4f9] text-[#191c1d] placeholder-[#74777f] text-sm focus:outline-none focus:ring-2 transition-all ${
              errores.solicitante
                ? 'ring-2 ring-[#ba1a1a] bg-[#ffdad6]/20'
                : 'focus:ring-[#005ac1] focus:bg-white'
            }`}
          />
          {errores.solicitante && (
            <p className="flex items-center gap-1.5 text-xs text-[#ba1a1a] mt-1.5 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errores.solicitante}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#44474e] mb-1.5">
            Prioridad asignada
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'baja', label: 'Baja', color: 'hover:bg-emerald-50 peer-checked:bg-emerald-100 peer-checked:text-emerald-900 peer-checked:border-emerald-300' },
              { id: 'media', label: 'Media', color: 'hover:bg-amber-50 peer-checked:bg-amber-100 peer-checked:text-amber-900 peer-checked:border-amber-300' },
              { id: 'alta', label: 'Alta', color: 'hover:bg-rose-50 peer-checked:bg-rose-100 peer-checked:text-rose-900 peer-checked:border-rose-300' },
            ].map((item) => (
              <label key={item.id} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="prioridad"
                  value={item.id}
                  checked={prioridad === item.id}
                  onChange={(e) => setPrioridad(e.target.value)}
                  className="peer sr-only"
                />
                <div className={`py-2.5 px-3 text-center rounded-2xl text-xs font-semibold border border-transparent transition-all bg-[#f1f4f9] text-[#44474e] ${item.color}`}>
                  {item.label}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#44474e] mb-1.5">
            Descripción de la incidencia
          </label>
          <textarea
            rows="3"
            placeholder="Detalla los síntomas o requerimiento para el equipo técnico..."
            value={descripcion}
            onChange={(e) => {
              setDescripcion(e.target.value);
              if (errores.descripcion) setErrores((prev) => ({ ...prev, descripcion: null }));
            }}
            className={`w-full px-4 py-3 rounded-2xl bg-[#f1f4f9] text-[#191c1d] placeholder-[#74777f] text-sm focus:outline-none focus:ring-2 transition-all resize-none ${
              errores.descripcion
                ? 'ring-2 ring-[#ba1a1a] bg-[#ffdad6]/20'
                : 'focus:ring-[#005ac1] focus:bg-white'
            }`}
          ></textarea>
          {errores.descripcion && (
            <p className="flex items-center gap-1.5 text-xs text-[#ba1a1a] mt-1.5 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errores.descripcion}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-[#005ac1] hover:bg-[#00489b] text-white font-semibold text-sm tracking-wide shadow-sm hover:shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          Registrar Solicitud
        </button>
      </form>
    </div>
  );
}

export default SolicitudForm;
