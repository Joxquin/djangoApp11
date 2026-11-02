import React, { useState } from 'react';
import { Headphones, ShieldAlert, CheckCircle, Clock3 } from 'lucide-react';
import SolicitudForm from './components/SolicitudForm';
import ListaSolicitudes from './components/ListaSolicitudes';
import FiltrosSolicitudes from './components/FiltrosSolicitudes';

function App() {
  const [solicitudes, setSolicitudes] = useState([
    {
      id: 1,
      titulo: 'Fallo de acceso al servidor de base de datos',
      descripcion: 'El equipo de contabilidad no puede autenticarse en el servidor interno de Postgres desde las 8:30 AM.',
      solicitante: 'Marcela Vega',
      prioridad: 'alta',
      estado: 'en proceso',
      fecha: '02/11/2026'
    },
    {
      id: 2,
      titulo: 'Instalación de paquete ofimático y licencias',
      descripcion: 'Se requiere actualización de paquete ofimático para el nuevo colaborador del área comercial.',
      solicitante: 'Rodrigo Salas',
      prioridad: 'baja',
      estado: 'resuelta',
      fecha: '02/11/2026'
    },
    {
      id: 3,
      titulo: 'Intermitencia en red inalámbrica sala de juntas',
      descripcion: 'La señal Wi-Fi presenta pérdidas continuas de paquetes durante las videollamadas con clientes.',
      solicitante: 'Valeria Castro',
      prioridad: 'media',
      estado: 'pendiente',
      fecha: '02/11/2026'
    }
  ]);

  const [filtro, setFiltro] = useState('todas');

  const agregarSolicitud = (datos) => {
    const nuevaSolicitud = {
      id: Date.now(),
      ...datos,
      estado: 'pendiente',
      fecha: new Date().toLocaleDateString('es-ES')
    };
    setSolicitudes([nuevaSolicitud, ...solicitudes]);
  };

  const cambiarEstado = (id, nuevoEstado) => {
    setSolicitudes(
      solicitudes.map((s) => (s.id === id ? { ...s, estado: nuevoEstado } : s))
    );
  };

  const eliminarSolicitud = (id) => {
    setSolicitudes(solicitudes.filter((s) => s.id !== id));
  };

  const solicitudesFiltradas = solicitudes.filter((s) => {
    if (filtro === 'todas') return true;
    return s.estado === filtro;
  });

  const conteos = {
    todas: solicitudes.length,
    pendiente: solicitudes.filter((s) => s.estado === 'pendiente').length,
    'en proceso': solicitudes.filter((s) => s.estado === 'en proceso').length,
    resuelta: solicitudes.filter((s) => s.estado === 'resuelta').length
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc] px-4 py-8 md:py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#e2e8f0]/80">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#005ac1] text-white flex items-center justify-center shadow-md shadow-[#005ac1]/20">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#191c1d]">
                Soporte Técnico
              </h1>
              <p className="text-xs sm:text-sm text-[#44474e]">
                Sistema centralizado para administración y seguimiento de incidencias
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200/60 text-xs font-semibold">
              <Clock3 className="w-4 h-4 text-amber-600" />
              <span>{conteos.pendiente} Pendientes</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-blue-50 text-blue-900 border border-blue-200/60 text-xs font-semibold">
              <ShieldAlert className="w-4 h-4 text-blue-600" />
              <span>{conteos['en proceso']} En Proceso</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-emerald-50 text-emerald-900 border border-emerald-200/60 text-xs font-semibold">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>{conteos.resuelta} Resueltas</span>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <section className="lg:col-span-5 sticky top-6">
            <SolicitudForm onAgregarSolicitud={agregarSolicitud} />
          </section>

          <section className="lg:col-span-7 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-[#191c1d]">
                  Solicitudes Activas
                </h2>
                <p className="text-xs text-[#74777f]">
                  Mostrando {solicitudesFiltradas.length} de {solicitudes.length} solicitudes
                </p>
              </div>

              <FiltrosSolicitudes
                filtroActual={filtro}
                onCambiarFiltro={setFiltro}
                conteos={conteos}
              />
            </div>

            <ListaSolicitudes
              solicitudes={solicitudesFiltradas}
              onCambiarEstado={cambiarEstado}
              onEliminar={eliminarSolicitud}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
