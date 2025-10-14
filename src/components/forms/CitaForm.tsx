// src/components/forms/CitaForm.tsx
import React, { useState } from 'react';
import { Input } from '../common/Input';
import Button from '../common/Button';
import Alert from '../common/Alert';

interface CitaFormProps {
  onSubmit: (data: CitaFormData) => Promise<void>;
  initialData?: CitaFormData;
  isLoading?: boolean;
}

export interface CitaFormData {
  pacienteId: number | string;
  medicoId: number | string;
  fechaCita: string;
  horaEntrada: string;
  horaSalida: string;
  tipoCita: string;
  especialidad: string;
  motivo: string;
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

const CitaForm: React.FC<CitaFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<CitaFormData>(
    initialData || {
      pacienteId: '',
      medicoId: '',
      fechaCita: '',
      horaEntrada: '',
      horaSalida: '',
      tipoCita: 'presencial',
      especialidad: '',
      motivo: ''
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [apiError, setApiError] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.pacienteId) newErrors.pacienteId = 'Selecciona un paciente';
    if (!formData.medicoId) newErrors.medicoId = 'Selecciona un médico';
    if (!formData.fechaCita) newErrors.fechaCita = 'La fecha es requerida';
    if (!formData.horaEntrada) newErrors.horaEntrada = 'La hora de entrada es requerida';
    if (!formData.horaSalida) newErrors.horaSalida = 'La hora de salida es requerida';
    if (!formData.especialidad) newErrors.especialidad = 'Selecciona una especialidad';
    if (!formData.motivo.trim()) newErrors.motivo = 'El motivo es requerido';

    // Validar que la hora de salida sea después de la hora de entrada
    if (formData.horaEntrada && formData.horaSalida) {
      if (formData.horaSalida <= formData.horaEntrada) {
        newErrors.horaSalida = 'La hora de salida debe ser después de la hora de entrada';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
      setSuccessMessage('Cita guardada exitosamente');
      if (!initialData) {
        setFormData({
          pacienteId: '',
          medicoId: '',
          fechaCita: '',
          horaEntrada: '',
          horaSalida: '',
          tipoCita: 'presencial',
          especialidad: '',
          motivo: ''
        });
      }
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : 'Error al guardar la cita'
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
        <div>
          <label className="block text-sm font-medium text-Text-Primary mb-2">
            Paciente
            <span className="text-Error-500 ml-1">*</span>
          </label>
          <input
            type="number"
            name="pacienteId"
            value={formData.pacienteId}
            onChange={handleChange}
            placeholder="ID del paciente"
            className={`
              w-full px-4 py-3 border-2 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-Primary-500 focus:border-transparent
              ${errors.pacienteId ? 'border-Error-500' : 'border-gray-200'}
            `}
          />
          {errors.pacienteId && (
            <p className="mt-1 text-sm text-Error-500">{errors.pacienteId}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-Text-Primary mb-2">
            Médico
            <span className="text-Error-500 ml-1">*</span>
          </label>
          <input
            type="number"
            name="medicoId"
            value={formData.medicoId}
            onChange={handleChange}
            placeholder="ID del médico"
            className={`
              w-full px-4 py-3 border-2 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-Primary-500 focus:border-transparent
              ${errors.medicoId ? 'border-Error-500' : 'border-gray-200'}
            `}
          />
          {errors.medicoId && (
            <p className="mt-1 text-sm text-Error-500">{errors.medicoId}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Fecha de la Cita"
          name="fechaCita"
          type="date"
          value={formData.fechaCita}
          onChange={handleChange}
          error={errors.fechaCita}
          required
        />

        <div>
          <label className="block text-sm font-medium text-Text-Primary mb-2">
            Tipo de Cita
            <span className="text-Error-500 ml-1">*</span>
          </label>
          <select
            name="tipoCita"
            value={formData.tipoCita}
            onChange={handleChange}
            className="
              w-full px-4 py-3 border-2 border-gray-200 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-Primary-500 focus:border-transparent
            "
          >
            <option value="presencial">Presencial</option>
            <option value="virtual">Virtual</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Hora de Entrada"
          name="horaEntrada"
          type="time"
          value={formData.horaEntrada}
          onChange={handleChange}
          error={errors.horaEntrada}
          required
        />

        <Input
          label="Hora de Salida"
          name="horaSalida"
          type="time"
          value={formData.horaSalida}
          onChange={handleChange}
          error={errors.horaSalida}
          required
        />
      </div>

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
          Motivo de la Consulta
          <span className="text-Error-500 ml-1">*</span>
        </label>
        <textarea
          name="motivo"
          value={formData.motivo}
          onChange={handleChange}
          placeholder="Describe el motivo de la consulta..."
          rows={4}
          className={`
            w-full px-4 py-3 border-2 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-Primary-500 focus:border-transparent
            ${errors.motivo ? 'border-Error-500' : 'border-gray-200'}
            resize-none
          `}
        />
        {errors.motivo && (
          <p className="mt-1 text-sm text-Error-500">{errors.motivo}</p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          loading={isLoading}
          fullWidth
        >
          {initialData ? 'Actualizar Cita' : 'Crear Cita'}
        </Button>
      </div>
    </form>
  );
};

export default CitaForm;