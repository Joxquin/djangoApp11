import React from 'react';
import { Inbox } from 'lucide-react';
import SolicitudItem from './SolicitudItem';

function ListaSolicitudes({ solicitudes, onCambiarEstado, onEliminar }) {
  if (solicitudes.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 border border-[#e2e8f0]/80 text-center shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-3xl bg-[#f1f4f9] flex items-center justify-center text-[#74777f] mb-3">
          <Inbox className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h4 className="text-base font-bold text-[#191c1d]">No hay solicitudes registradas</h4>
        <p className="text-xs text-[#74777f] mt-1 max-w-xs">
          No se encontraron solicitudes con el criterio seleccionado o aún no se han registrado incidencias.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3.5">
      {solicitudes.map((solicitud) => (
        <SolicitudItem
          key={solicitud.id}
          solicitud={solicitud}
          onCambiarEstado={onCambiarEstado}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  );
}

export default ListaSolicitudes;
