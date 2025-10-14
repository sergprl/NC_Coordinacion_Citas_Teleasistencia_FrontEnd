// src/components/forms/MedicoForm.tsx
import React, { useState } from 'react';
import { Input } from '../common/Input';
import Button from '../common/Button';
import Alert from '../common/Alert';

interface MedicoFormProps {
  onSubmit: (data: MedicoFormData) => Promise<void>;
  initialData?: MedicoFormData;
  isLoading?: boolean;
}

export interface MedicoFormData {
  nombre: string;
  apellidos: string;
  dni: string;
  email: string;
  especialidad: string;
  fechaGraduacion: string;
  fechaIncorporacion: string;
  genero?: string;
}

const specialties = [
  'Cardiología',
  'Dermatología',
  'Medicina General',
  'Pediatría',
  'Psicología',
  'Nutrición',
  'Cirugía General',
  'Oftalmología',
  'Otorrinolaringología',
  'Neurología'
];

const MedicoForm: React.FC<MedicoFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<MedicoFormData>(
    initialData || {
      nombre: '',
      apellidos: '',
      dni: '',
      email: '',
      especialidad: '',
      fechaGraduacion: '',
      fechaIncorporacion: '',
      genero: ''
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [apiError, setApiError] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.apellidos.trim()) newErrors.apellidos = 'Los apellidos son requeridos';
    if (!formData.dni.trim()) newErrors.dni = 'El DNI es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.especialidad) newErrors.especialidad = 'Selecciona una especialidad';
    if (!formData.fechaGraduacion) newErrors.fechaGraduacion = 'La fecha de graduación es requerida';
    if (!formData.fechaIncorporacion) newErrors.fechaIncorporacion = 'La fecha de incorporación es requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    setSuccessMessage('');

    if (!validateForm()) return;

    try {
      await onSubmit(formData);
      setSuccessMessage('Médico guardado exitosamente');
      if (!initialData) {
        setFormData({
          nombre: '',
          apellidos: '',
          dni: '',
          email: '',
          especialidad: '',
          fechaGraduacion: '',
          fechaIncorporacion: '',
          genero: ''
        });
      }
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : 'Error al guardar el médico'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {successMessage && (
        <Alert type="success" autoClose={3000}>
          {successMessage}
        </Alert>
      )}

      {apiError && (
        <Alert type="error" onClose={() => setApiError('')}>
          {apiError}
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          error={errors.nombre}
          required
          placeholder="Ej: Juan"
        />

        <Input
          label="Apellidos"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          error={errors.apellidos}
          required
          placeholder="Ej: Pérez García"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="DNI"
          name="dni"
          value={formData.dni}
          onChange={handleChange}
          error={errors.dni}
          required
          placeholder="Ej: 123456789"
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
          placeholder="Ej: juan@example.com"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-Text-Primary mb-2">
            Especialidad
            <span className="text-Error-500 ml-1">*</span>
          </label>
          <select
            name="especialidad"
            value={formData.especialidad}
            onChange={handleChange}
            className={`
              w-full px-4 py-3 border-2 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-Primary-500 focus:border-transparent
              ${errors.especialidad ? 'border-Error-500' : 'border-gray-200'}
            `}
          >
            <option value="">Selecciona una especialidad</option>
            {specialties.map(spec => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
          {errors.especialidad && (
            <p className="mt-1 text-sm text-Error-500">{errors.especialidad}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-Text-Primary mb-2">
            Género
          </label>
          <select
            name="genero"
            value={formData.genero || ''}
            onChange={handleChange}
            className="
              w-full px-4 py-3 border-2 border-gray-200 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-Primary-500 focus:border-transparent
            "
          >
            <option value="">Selecciona género</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
            <option value="other">Otro</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Fecha de Graduación"
          name="fechaGraduacion"
          type="date"
          value={formData.fechaGraduacion}
          onChange={handleChange}
          error={errors.fechaGraduacion}
          required
        />

        <Input
          label="Fecha de Incorporación"
          name="fechaIncorporacion"
          type="date"
          value={formData.fechaIncorporacion}
          onChange={handleChange}
          error={errors.fechaIncorporacion}
          required
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          loading={isLoading}
          fullWidth
        >
          {initialData ? 'Actualizar Médico' : 'Crear Médico'}
        </Button>
      </div>
    </form>
  );
};

export default MedicoForm;