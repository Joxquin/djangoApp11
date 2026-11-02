import React from 'react';
import { Trash2, User, Clock, CheckCircle2, AlertTriangle, ArrowRightCircle } from 'lucide-react';

function SolicitudItem({ solicitud, onCambiarEstado, onEliminar }) {
  const { id, titulo, descripcion, solicitante, prioridad, estado, fecha } = solicitud;

  const prioridadEstilos = {
    baja: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200/60',
      dot: 'bg-emerald-500',
      label: 'Baja'
    },
    media: {
      bg: 'bg-amber-50 text-amber-800 border-amber-200/60',
      dot: 'bg-amber-500',
      label: 'Media'
    },
    alta: {
      bg: 'bg-rose-50 text-rose-800 border-rose-200/60',
      dot: 'bg-rose-500',
      label: 'Alta'
    }
  }[prioridad] || { bg: 'bg-slate-50 text-slate-800', dot: 'bg-slate-500', label: prioridad };

  const estadoConfig = {
    pendiente: {
      label: 'Pendiente',
      icon: Clock,
      badge: 'bg-[#fff0db] text-[#825500] border-[#ffdcb2]',
      container: 'border-l-4 border-l-[#ffb74d]'
    },
    'en proceso': {
      label: 'En Proceso',
      icon: ArrowRightCircle,
      badge: 'bg-[#e0f0ff] text-[#004e9a] border-[#b6dfff]',
      container: 'border-l-4 border-l-[#2196f3]'
    },
    resuelta: {
      label: 'Resuelta',
      icon: CheckCircle2,
      badge: 'bg-[#d6f5e3] text-[#0f6735] border-[#b3edc8]',
      container: 'border-l-4 border-l-[#4caf50]'
    }
  }[estado] || {
    label: estado,
    icon: Clock,
    badge: 'bg-gray-100 text-gray-800 border-gray-200',
    container: 'border-l-4 border-l-gray-400'
  };

  const EstadoIcon = estadoConfig.icon;

  return (
    <div className={`bg-white rounded-3xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#e2e8f0]/80 transition-all hover:shadow-md ${estadoConfig.container}`}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${prioridadEstilos.bg}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${prioridadEstilos.dot}`}></span>
              Prioridad {prioridadEstilos.label}
            </span>
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${estadoConfig.badge}`}>
              <EstadoIcon className="w-3.5 h-3.5" />
              {estadoConfig.label}
            </span>
            {fecha && (
              <span className="text-[11px] text-[#74777f] font-medium ml-1">
                {fecha}
              </span>
            )}
          </div>
          <h3 className="text-base font-bold text-[#191c1d] tracking-tight pt-1">
            {titulo}
          </h3>
        </div>

        <button
          onClick={() => onEliminar(id)}
          title="Eliminar solicitud"
          className="self-end sm:self-start p-2 rounded-2xl text-[#74777f] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <p className="text-sm text-[#44474e] leading-relaxed mb-4 whitespace-pre-wrap">
        {descripcion}
      </p>

      <div className="pt-3 border-t border-[#f1f4f9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-medium text-[#44474e]">
          <div className="w-7 h-7 rounded-full bg-[#f1f4f9] flex items-center justify-center text-[#74777f]">
            <User className="w-3.5 h-3.5" />
          </div>
          <span>Solicitado por: <strong className="text-[#191c1d]">{solicitante}</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor={`estado-${id}`} className="text-xs font-medium text-[#74777f]">
            Estado:
          </label>
          <select
            id={`estado-${id}`}
            value={estado}
            onChange={(e) => onCambiarEstado(id, e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#f1f4f9] text-xs font-semibold text-[#191c1d] border border-transparent hover:border-[#cbd5e1] focus:outline-none focus:ring-2 focus:ring-[#005ac1] cursor-pointer transition-all"
          >
            <option value="pendiente">Pendiente</option>
            <option value="en proceso">En proceso</option>
            <option value="resuelta">Resuelta</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SolicitudItem;
