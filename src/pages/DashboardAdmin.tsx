import React, { useState, useMemo } from 'react';

// Tipos
interface Appointment {
  id: string;
  patientName: string;
  patientAge: number;
  patientGender: 'male' | 'female';
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  type: 'presencial' | 'virtual';
  status: 'pendiente' | 'confirmada' | 'completada' | 'cancelada';
  reason: string;
}

// Datos de ejemplo
const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientName: 'Juan Pérez',
    patientAge: 45,
    patientGender: 'male',
    doctorName: 'Dra. María González',
    specialty: 'Cardiología',
    date: '2025-10-05',
    time: '10:00',
    type: 'virtual',
    status: 'confirmada',
    reason: 'Control de presión arterial'
  },
  {
    id: '2',
    patientName: 'Ana Martínez',
    patientAge: 32,
    patientGender: 'female',
    doctorName: 'Dr. Carlos Ramírez',
    specialty: 'Medicina General',
    date: '2025-10-05',
    time: '11:30',
    type: 'presencial',
    status: 'pendiente',
    reason: 'Consulta general'
  },
  {
    id: '3',
    patientName: 'Pedro Gómez',
    patientAge: 28,
    patientGender: 'male',
    doctorName: 'Dra. Laura Torres',
    specialty: 'Dermatología',
    date: '2025-10-06',
    time: '09:00',
    type: 'virtual',
    status: 'completada',
    reason: 'Revisión de tratamiento'
  },
  {
    id: '4',
    patientName: 'María López',
    patientAge: 67,
    patientGender: 'female',
    doctorName: 'Dr. José Hernández',
    specialty: 'Geriatría',
    date: '2025-10-06',
    time: '14:00',
    type: 'presencial',
    status: 'confirmada',
    reason: 'Chequeo anual'
  },
  {
    id: '5',
    patientName: 'Roberto Silva',
    patientAge: 19,
    patientGender: 'male',
    doctorName: 'Dra. Carmen Ruiz',
    specialty: 'Psicología',
    date: '2025-10-07',
    time: '16:00',
    type: 'virtual',
    status: 'cancelada',
    reason: 'Terapia'
  },
  {
    id: '6',
    patientName: 'Lucía Fernández',
    patientAge: 41,
    patientGender: 'female',
    doctorName: 'Dr. Miguel Ángel',
    specialty: 'Nutrición',
    date: '2025-10-08',
    time: '10:30',
    type: 'presencial',
    status: 'pendiente',
    reason: 'Plan alimenticio'
  }
];

const AdminDashboard: React.FC = () => {
  const [appointments] = useState<Appointment[]>(mockAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [ageFilter, setAgeFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Estadísticas
  const stats = useMemo(() => ({
    total: appointments.length,
    pendientes: appointments.filter(a => a.status === 'pendiente').length,
    confirmadas: appointments.filter(a => a.status === 'confirmada').length,
    completadas: appointments.filter(a => a.status === 'completada').length,
    canceladas: appointments.filter(a => a.status === 'cancelada').length,
    virtuales: appointments.filter(a => a.type === 'virtual').length,
    presenciales: appointments.filter(a => a.type === 'presencial').length
  }), [appointments]);

  // Filtrado de citas
  const filteredAppointments = useMemo(() => {
    return appointments.filter(apt => {
      const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           apt.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
      const matchesGender = genderFilter === 'all' || apt.patientGender === genderFilter;
      const matchesType = typeFilter === 'all' || apt.type === typeFilter;
      
      let matchesAge = true;
      if (ageFilter === 'young') matchesAge = apt.patientAge < 30;
      else if (ageFilter === 'adult') matchesAge = apt.patientAge >= 30 && apt.patientAge < 60;
      else if (ageFilter === 'senior') matchesAge = apt.patientAge >= 60;
      
      return matchesSearch && matchesStatus && matchesGender && matchesAge && matchesType;
    });
  }, [appointments, searchTerm, statusFilter, genderFilter, ageFilter, typeFilter]);

  // Estilos de estado
  const getStatusStyles = (status: string) => {
    const styles = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      confirmada: 'bg-blue-100 text-blue-800',
      completada: 'bg-green-100 text-green-800',
      cancelada: 'bg-red-100 text-red-800'
    };
    return styles[status as keyof typeof styles] || '';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      pendiente: '⏳',
      confirmada: '✓',
      completada: '✔',
      cancelada: '✕'
    };
    return icons[status as keyof typeof icons] || '';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Panel Administrativo
        </h1>
        <p className="text-gray-600">
          Gestión y monitoreo de citas médicas
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Citas</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">{stats.pendientes}</div>
          <div className="text-sm text-gray-600">Pendientes</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{stats.confirmadas}</div>
          <div className="text-sm text-gray-600">Confirmadas</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{stats.completadas}</div>
          <div className="text-sm text-gray-600">Completadas</div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Búsqueda */}
          <div className="lg:col-span-2">
            <input
              type="text"
              placeholder="Buscar paciente, médico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filtro Estado */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="confirmada">Confirmada</option>
            <option value="completada">Completada</option>
            <option value="cancelada">Cancelada</option>
          </select>

          {/* Filtro Sexo */}
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos los sexos</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
          </select>

          {/* Filtro Edad */}
          <select
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todas las edades</option>
            <option value="young">&lt; 30 años</option>
            <option value="adult">30-59 años</option>
            <option value="senior">≥ 60 años</option>
          </select>

          {/* Filtro Tipo */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos los tipos</option>
            <option value="virtual">Virtual</option>
            <option value="presencial">Presencial</option>
          </select>
        </div>
      </div>

      {/* Resultados */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Citas ({filteredAppointments.length})
          </h2>
        </div>

        {/* Tabla de citas */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Edad
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Sexo
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Médico
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Especialidad
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Fecha/Hora
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {apt.patientName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {apt.patientAge}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {apt.patientGender === 'male' ? '♂' : '♀'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {apt.doctorName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {apt.specialty}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <div>{new Date(apt.date).toLocaleDateString('es-ES')}</div>
                    <div className="text-xs text-gray-500">{apt.time}</div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      apt.type === 'virtual' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {apt.type === 'virtual' ? '💻 Virtual' : '🏥 Presencial'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyles(apt.status)}`}>
                      {getStatusIcon(apt.status)} {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() => setSelectedAppointment(apt)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No se encontraron citas
            </h3>
            <p className="text-gray-600">
              Intenta ajustar los filtros de búsqueda
            </p>
          </div>
        )}
      </div>

      {/* Modal de detalle */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  Detalle de Cita
                </h3>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Paciente</label>
                  <p className="text-gray-900 font-semibold">{selectedAppointment.patientName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Edad</label>
                  <p className="text-gray-900">{selectedAppointment.patientAge} años</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Sexo</label>
                  <p className="text-gray-900">{selectedAppointment.patientGender === 'male' ? 'Masculino' : 'Femenino'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Médico</label>
                  <p className="text-gray-900 font-semibold">{selectedAppointment.doctorName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Especialidad</label>
                  <p className="text-gray-900">{selectedAppointment.specialty}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Fecha y Hora</label>
                  <p className="text-gray-900">
                    {new Date(selectedAppointment.date).toLocaleDateString('es-ES')} - {selectedAppointment.time}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Tipo</label>
                  <p className="text-gray-900">{selectedAppointment.type === 'virtual' ? 'Virtual' : 'Presencial'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Estado</label>
                  <span className={`inline-block px-3 py-1 rounded text-sm font-medium ${getStatusStyles(selectedAppointment.status)}`}>
                    {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Motivo de Consulta</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded">{selectedAppointment.reason}</p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Editar Cita
              </button>
              <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Cancelar Cita
              </button>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;