// src/components/forms/PacienteForm.tsx
import React, { useState } from 'react';
import { Input } from '../common/Input';
import Button from '../common/Button';
import Alert from '../common/Alert';

interface PacienteFormProps {
  onSubmit: (data: PacienteFormData) => Promise<void>;
  initialData?: PacienteFormData;
  isLoading?: boolean;
}

export interface PacienteFormData {
  nombre: string;
  apellidos: string;
  dni: string;
  genero: string;
  direccion: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
}

const PacienteForm: React.FC<PacienteFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<PacienteFormData>(
    initialData || {
      nombre: '',
      apellidos: '',
      dni: '',
      genero: '',
      direccion: '',
      email: '',
      telefono: '',
      fechaNacimiento: ''
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
    if (!formData.genero) newErrors.genero = 'Selecciona un género';
    if (!formData.direccion.trim()) newErrors.direccion = 'La dirección es requerida';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es requerido';
    if (!formData.fechaNacimiento) newErrors.fechaNacimiento = 'La fecha de nacimiento es requerida';

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
      setSuccessMessage('Paciente guardado exitosamente');
      if (!initialData) {
        setFormData({
          nombre: '',
          apellidos: '',
          dni: '',
          genero: '',
          direccion: '',
          email: '',
          telefono: '',
          fechaNacimiento: ''
        });
      }
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : 'Error al guardar el paciente'
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
          placeholder="Ej: María"
        />

        <Input
          label="Apellidos"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          error={errors.apellidos}
          required
          placeholder="Ej: García López"
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
          placeholder="Ej: 987654321"
        />

        <div>
          <label className="block text-sm font-medium text-Text-Primary mb-2">
            Género
            <span className="text-Error-500 ml-1">*</span>
          </label>
          <select
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            className={`
              w-full px-4 py-3 border-2 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-Primary-500 focus:border-transparent
              ${errors.genero ? 'border-Error-500' : 'border-gray-200'}
            `}
          >
            <option value="">Selecciona género</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
            <option value="other">Otro</option>
          </select>
          {errors.genero && (
            <p className="mt-1 text-sm text-Error-500">{errors.genero}</p>
          )}
        </div>
      </div>

      <Input
        label="Dirección"
        name="direccion"
        value={formData.direccion}
        onChange={handleChange}
        error={errors.direccion}
        required
        placeholder="Ej: Calle 123 #456"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
          placeholder="Ej: maria@example.com"
        />

        <Input
          label="Teléfono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          error={errors.telefono}
          required
          placeholder="Ej: +57 300 123 4567"
        />
      </div>

      <Input
        label="Fecha de Nacimiento"
        name="fechaNacimiento"
        type="date"
        value={formData.fechaNacimiento}
        onChange={handleChange}
        error={errors.fechaNacimiento}
        required
      />

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          loading={isLoading}
          fullWidth
        >
          {initialData ? 'Actualizar Paciente' : 'Crear Paciente'}
        </Button>
      </div>
    </form>
  );
};

export default PacienteForm;