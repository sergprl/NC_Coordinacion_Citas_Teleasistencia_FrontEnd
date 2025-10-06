// src/pages/DoctorSearch.tsx
import React, { useState } from 'react';
import { mockDoctors, mockSpecialties } from '../utils/mockData';
import type { Doctor } from '../types';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const DoctorSearch: React.FC = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [doctors] = useState<Doctor[]>(mockDoctors);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-Background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-Text-Primary mb-3">
            Encuentra tu especialista
          </h1>
          <p className="text-Text-Secondary text-lg">
            Más de 10,000 médicos certificados disponibles para ti
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre o especialidad..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 text-lg rounded-xl border-2 border-gray-200 focus:border-Primary-500 focus:outline-none transition-colors"
            />
            <svg 
              className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Specialties Filter */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-Text-Primary mb-4">Especialidades</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedSpecialty('all')}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                selectedSpecialty === 'all'
                  ? 'bg-Primary-500 text-white shadow-md'
                  : 'bg-white text-Text-Primary border border-gray-200 hover:border-Primary-500'
              }`}
            >
              Todas
            </button>
            {mockSpecialties.map(specialty => (
              <button
                key={specialty.id}
                onClick={() => setSelectedSpecialty(specialty.name)}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedSpecialty === specialty.name
                    ? 'bg-Primary-500 text-white shadow-md'
                    : 'bg-white text-Text-Primary border border-gray-200 hover:border-Primary-500'
                }`}
              >
                <span className="text-xl">{specialty.icon}</span>
                {specialty.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-Text-Secondary">
            {filteredDoctors.length} {filteredDoctors.length === 1 ? 'resultado' : 'resultados'} encontrados
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map(doctor => (
            <Card key={doctor.id} hover padding="none" className="overflow-hidden">
              {/* Doctor Header */}
              <div className="relative h-32 bg-gradient-to-r from-Primary-500 to-Primary-700">
                <div className="absolute -bottom-12 left-6">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                  />
                </div>
                {doctor.available && (
                  <div className="absolute top-4 right-4 bg-Success-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    Disponible
                  </div>
                )}
              </div>

              {/* Doctor Info */}
              <div className="pt-16 px-6 pb-6">
                <h3 className="text-xl font-bold text-Text-Primary mb-1">
                  {doctor.name}
                </h3>
                <p className="text-Primary-500 font-medium mb-3">
                  {doctor.specialty}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-Text-Secondary">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-Accent-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold">{doctor.rating}</span>
                    <span>({doctor.reviewsCount})</span>
                  </div>
                  <div>
                    {doctor.experience} años exp.
                  </div>
                </div>

                {/* Languages */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {doctor.languages.map((lang, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-Text-Secondary text-xs rounded"
                    >
                      {lang}
                    </span>
                  ))}
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-Text-Secondary">Desde</p>
                    <p className="text-2xl font-bold text-Text-Primary">
                      ${(doctor.price / 1000).toFixed(0)}k
                    </p>
                  </div>
                  <Button size="sm">
                    Ver perfil
                  </Button>
                </div>

                {doctor.nextAvailable && (
                  <p className="mt-3 text-xs text-Secondary-400 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {doctor.nextAvailable}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-Text-Primary mb-2">
              No se encontraron resultados
            </h3>
            <p className="text-Text-Secondary">
              Intenta con otra búsqueda o especialidad
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorSearch;