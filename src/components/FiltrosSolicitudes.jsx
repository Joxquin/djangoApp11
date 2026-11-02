import React from 'react';
import { Layers, Clock, ArrowRightCircle, CheckCircle2 } from 'lucide-react';

function FiltrosSolicitudes({ filtroActual, onCambiarFiltro, conteos }) {
  const filtros = [
    { id: 'todas', label: 'Todas', icon: Layers, count: conteos.todas },
    { id: 'pendiente', label: 'Pendientes', icon: Clock, count: conteos.pendiente },
    { id: 'en proceso', label: 'En Proceso', icon: ArrowRightCircle, count: conteos['en proceso'] },
    { id: 'resuelta', label: 'Resueltas', icon: CheckCircle2, count: conteos.resuelta }
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#f1f4f9] rounded-2xl w-fit border border-[#e2e8f0]/60">
      {filtros.map((f) => {
        const Icon = f.icon;
        const isActive = filtroActual === f.id;
        return (
          <button
            key={f.id}
            type="button"
            onClick={() => onCambiarFiltro(f.id)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isActive
                ? 'bg-white text-[#005ac1] shadow-sm font-bold'
                : 'text-[#44474e] hover:text-[#191c1d] hover:bg-white/50'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{f.label}</span>
            <span
              className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                isActive
                  ? 'bg-[#005ac1]/10 text-[#005ac1]'
                  : 'bg-black/5 text-[#74777f]'
              }`}
            >
              {f.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default FiltrosSolicitudes;
