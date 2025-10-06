// src/pages/DoctorSearch.tsx
import React, { useState } from 'react';
import { mockDoctors, mockSpecialties } from '../utils/mockData';
import type { Doctor } from '../types';
import SearchBar from '../components/common/SearchBar';
import FilterDropdown from '../components/common/FilterDropdown';
import DoctorCard from '../components/common/DoctorCard';

const DoctorSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('all');
  const [availability, setAvailability] = useState('all');
  const [paymentMethod, setPaymentMethod] = useState('all');
  const [additionalFilters, setAdditionalFilters] = useState('all');
  const [language, setLanguage] = useState('all');
  const [gender, setGender] = useState('all');
  const [specialty, setSpecialty] = useState('all');
  const [doctors] = useState<Doctor[]>(mockDoctors);

  const locationOptions = [
    { value: 'all', label: 'Todas las ubicaciones' },
    { value: 'bogota', label: 'Bogotá' },
    { value: 'medellin', label: 'Medellín' },
    { value: 'cali', label: 'Cali' }
  ];

  const availabilityOptions = [
    { value: 'all', label: 'Cualquier momento' },
    { value: 'today', label: 'Hoy' },
    { value: 'tomorrow', label: 'Mañana' },
    { value: 'week', label: 'Esta semana' }
  ];

  const paymentOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'credit', label: 'Tarjeta de crédito' },
    { value: 'debit', label: 'Tarjeta débito' },
    { value: 'cash', label: 'Efectivo' }
  ];

  const additionalOptions = [
    { value: 'all', label: 'Sin filtro' },
    { value: 'video', label: 'Videoconsulta' },
    { value: 'home', label: 'A domicilio' }
  ];

  const languageOptions = [
    { value: 'all', label: 'Todos los idiomas' },
    { value: 'es', label: 'Español' },
    { value: 'en', label: 'Inglés' },
    { value: 'fr', label: 'Francés' }
  ];

  const genderOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'male', label: 'Masculino' },
    { value: 'female', label: 'Femenino' }
  ];

  const specialtyOptions = [
    { value: 'all', label: 'Todas las especialidades' },
    ...mockSpecialties.map(s => ({ value: s.name, label: s.name }))
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = specialty === 'all' || doctor.specialty === specialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-Background">
      <div className="container mx-auto px-4 py-8">
        {/* Header con búsqueda */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-Text-Primary mb-2">
              Especialista en Medicina Alternativa
            </h1>
          </div>

          {/* Barra de búsqueda principal */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Especialista en Medicina Alternativa"
            />
            <SearchBar
              value={location}
              onChange={setLocation}
              placeholder="Dirección, zona, ciudad"
            />
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-3 items-center">
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>

            <FilterDropdown
              label="Disponibilidad"
              options={availabilityOptions}
              value={availability}
              onChange={setAvailability}
            />

            <FilterDropdown
              label="Formas de pago"
              options={paymentOptions}
              value={paymentMethod}
              onChange={setPaymentMethod}
            />

            <FilterDropdown
              label="Filtros suplementarios"
              options={additionalOptions}
              value={additionalFilters}
              onChange={setAdditionalFilters}
            />

            <FilterDropdown
              label="Idiomas"
              options={languageOptions}
              value={language}
              onChange={setLanguage}
            />

            <FilterDropdown
              label="Sexo"
              options={genderOptions}
              value={gender}
              onChange={setGender}
            />

            <FilterDropdown
              label="Especialidad"
              options={specialtyOptions}
              value={specialty}
              onChange={setSpecialty}
            />

            <button className="flex items-center gap-2 px-4 py-2 text-Primary-500 hover:bg-Primary-50 rounded-lg transition-colors text-sm font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Mapa
            </button>
          </div>
        </div>

        {/* Tabs de ciudades */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['Valle del Cauca', 'Santander', 'Bogotá, D.C.', 'Antioquia', 'Atlántico', 'Tolima'].map((city) => (
            <button
              key={city}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-Primary-500 hover:bg-Primary-50 transition-colors whitespace-nowrap text-sm"
            >
              {city}
            </button>
          ))}
        </div>

        {/* Resultados */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-Text-Primary">
            {filteredDoctors.length} Especialistas en Medicina Alternativa
          </h2>
        </div>

        {/* Grid de médicos */}
        <div className="space-y-4">
          {filteredDoctors.map(doctor => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onViewProfile={(id) => console.log('Ver perfil', id)}
              onBookAppointment={(id) => console.log('Agendar cita', id)}
            />
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-Text-Primary mb-2">
              No se encontraron resultados
            </h3>
            <p className="text-Text-Secondary">
              Intenta ajustar los filtros de búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorSearch;