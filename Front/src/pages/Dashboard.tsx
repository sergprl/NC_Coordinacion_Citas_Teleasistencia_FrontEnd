// src/pages/Dashboard.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Dashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'appointments' | 'history' | 'profile'>('appointments');

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const upcomingAppointments = [
    {
      id: '1',
      doctor: 'Dra. María González',
      specialty: 'Cardiología',
      date: '2025-10-05',
      time: '10:00 AM',
      type: 'Virtual',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    {
      id: '2',
      doctor: 'Dr. Carlos Ramírez',
      specialty: 'Medicina General',
      date: '2025-10-08',
      time: '3:00 PM',
      type: 'Presencial',
      avatar: 'https://i.pravatar.cc/150?img=12'
    }
  ];

  const medicalHistory = [
    {
      id: '1',
      date: '2025-09-20',
      doctor: 'Dr. Luis Martínez',
      specialty: 'Dermatología',
      diagnosis: 'Consulta de rutina',
      status: 'Completada'
    },
    {
      id: '2',
      date: '2025-08-15',
      doctor: 'Dra. Ana Rodríguez',
      specialty: 'Pediatría',
      diagnosis: 'Chequeo general',
      status: 'Completada'
    }
  ];

  const quickActions = [
    {
      icon: '🔍',
      title: 'Buscar Médico',
      description: 'Encuentra especialistas',
      action: () => navigate('/s/medico-general')
    },
    {
      icon: '📅',
      title: 'Agendar Cita',
      description: 'Nueva consulta',
      action: () => navigate('/s/medico-general')
    },
    {
      icon: '📄',
      title: 'Ver Artículos',
      description: 'Información de salud',
      action: () => navigate('/articulos-medicos')
    },
    {
      icon: '⚙️',
      title: 'Configuración',
      description: 'Ajustes de cuenta',
      action: () => setActiveTab('profile')
    }
  ];

  return (
    <div className="min-h-screen bg-Background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-Text-Primary mb-2">
                ¡Hola, {currentUser?.displayName}!
              </h1>
              <p className="text-Text-Secondary">
                Bienvenido a tu panel de salud
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, idx) => (
              <Card
                key={idx}
                hover
                className="cursor-pointer text-center"
                // onClick={action.action}
              >
                <div className="text-4xl mb-2">{action.icon}</div>
                <h3 className="font-bold text-Text-Primary mb-1">
                  {action.title}
                </h3>
                <p className="text-sm text-Text-Secondary">
                  {action.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-4 border-b border-gray-200">
            {[
              { key: 'appointments', label: 'Citas Próximas', icon: '📅' },
              { key: 'history', label: 'Historial', icon: '📋' },
              { key: 'profile', label: 'Mi Perfil', icon: '👤' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                  activeTab === tab.key
                    ? 'text-Primary-500 border-b-2 border-Primary-500'
                    : 'text-Text-Secondary hover:text-Text-Primary'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <div>
              <h2 className="text-2xl font-bold text-Text-Primary mb-6">
                Próximas Citas
              </h2>
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((apt) => (
                    <Card key={apt.id} hover>
                      <div className="flex items-center gap-6">
                        <img
                          src={apt.avatar}
                          alt={apt.doctor}
                          className="w-20 h-20 rounded-full"
                        />
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold text-Text-Primary mb-1">
                            {apt.doctor}
                          </h3>
                          <p className="text-Primary-500 font-medium mb-2">
                            {apt.specialty}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-Text-Secondary">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                              </svg>
                              {new Date(apt.date).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                              </svg>
                              {apt.time}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              apt.type === 'Virtual' 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-green-100 text-green-700'
                            }`}>
                              {apt.type}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {apt.type === 'Virtual' && (
                            <Button size="sm">Unirse a Video</Button>
                          )}
                          <Button size="sm" variant="outline">
                            Ver Detalles
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="text-xl font-bold text-Text-Primary mb-2">
                    No tienes citas programadas
                  </h3>
                  <p className="text-Text-Secondary mb-6">
                    Agenda tu primera consulta con un especialista
                  </p>
                  <Button onClick={() => navigate('/s/medico-general')}>
                    Buscar Médico
                  </Button>
                </Card>
              )}
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div>
              <h2 className="text-2xl font-bold text-Text-Primary mb-6">
                Historial Médico
              </h2>
              <div className="space-y-4">
                {medicalHistory.map((record) => (
                  <Card key={record.id}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-Text-Primary">
                            {record.doctor}
                          </h3>
                          <span className="px-2 py-1 bg-Success-500 text-white text-xs rounded-full">
                            {record.status}
                          </span>
                        </div>
                        <p className="text-Primary-500 font-medium mb-2">
                          {record.specialty}
                        </p>
                        <p className="text-Text-Secondary mb-1">
                          {record.diagnosis}
                        </p>
                        <p className="text-sm text-Text-Secondary">
                          {new Date(record.date).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        Ver Detalle
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-Text-Primary mb-6">
                Mi Perfil
              </h2>
              <Card>
                <div className="space-y-6">
                  <div className="flex items-center gap-6 pb-6 border-b">
                    <div className="w-24 h-24 bg-Primary-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                      {currentUser?.displayName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-Text-Primary mb-1">
                        {currentUser?.displayName}
                      </h3>
                      <p className="text-Text-Secondary">{currentUser?.email}</p>
                      <p className="text-sm text-Text-Secondary mt-1">
                        Tipo: {currentUser?.userType === 'patient' ? 'Paciente' : 'Médico'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-Text-Primary mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        value={currentUser?.phone || '+57 300 123 4567'}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-Primary-500"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-Text-Primary mb-2">
                        Fecha de Registro
                      </label>
                      <input
                        type="text"
                        value={currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString('es-ES') : 'N/A'}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <Button fullWidth>Editar Perfil</Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;