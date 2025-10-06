// src/components/common/DoctorCard.tsx
import React from 'react';
import type { Doctor } from '../../types';
import Button from './Button';

interface DoctorCardProps {
  doctor: Doctor;
  onViewProfile?: (doctorId: string) => void;
  onBookAppointment?: (doctorId: string) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ 
  doctor, 
  onViewProfile, 
  onBookAppointment 
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Header con foto */}
      <div className="flex items-start gap-4 p-6 pb-4">
        <div className="relative">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
          />
          {doctor.available && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-Success-500 border-2 border-white rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-Text-Primary truncate">
            {doctor.name}
          </h3>
          <p className="text-Primary-500 font-medium text-sm mb-1">
            {doctor.specialty}
          </p>
          
          <div className="flex items-center gap-3 text-xs text-Text-Secondary">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-Accent-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold">{doctor.rating}</span>
              <span>| {doctor.reviewsCount} calificaciones</span>
            </div>
          </div>
        </div>

        {doctor.available && (
          <span className="px-2 py-1 bg-green-50 text-Success-500 text-xs font-medium rounded">
            Videoconsulta
          </span>
        )}
      </div>

      {/* Info adicional */}
      <div className="px-6 pb-4 space-y-2">
        <div className="flex items-center text-sm text-Text-Secondary">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <span className="truncate">
            Próxima disponibilidad
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-gray-50 rounded p-2">
            <div className="font-bold text-Text-Primary">9 oct.</div>
            <div className="text-Text-Secondary">Desde 09:00</div>
          </div>
          <div className="bg-gray-50 rounded p-2">
            <div className="font-bold text-Text-Primary">10 oct.</div>
            <div className="text-Text-Secondary">Desde 09:00</div>
          </div>
          <div className="bg-gray-50 rounded p-2">
            <div className="font-bold text-Text-Primary">14 oct.</div>
            <div className="text-Text-Secondary">Desde 10:00</div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {doctor.languages.slice(0, 3).map((lang, idx) => (
            <span 
              key={idx}
              className="px-2 py-1 bg-gray-100 text-Text-Secondary text-xs rounded"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      {/* Footer con consultorio y botón */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <div className="text-sm text-Text-Secondary">
          Consultorio 1
        </div>
        <Button 
          size="sm"
          onClick={() => onViewProfile?.(doctor.id)}
          className="px-4"
        >
          Ver todas
        </Button>
      </div>
    </div>
  );
};

export default DoctorCard;