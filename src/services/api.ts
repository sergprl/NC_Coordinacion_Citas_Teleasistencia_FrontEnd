// src/services/api.ts
const API_BASE_URL = 'http://localhost:8080';

// Tipos para las peticiones
export interface CreateMedicoRequest {
  nombre: string;
  apellidos: string;
  dni: string;
  email: string;
  especialidad: string;
  fechaGraduacion: string;
  fechaIncorporacion: string;
}

export interface UpdateMedicoRequest extends CreateMedicoRequest {
  genero?: string;
}

export interface CreatePacienteRequest {
  nombre: string;
  apellidos: string;
  dni: string;
  genero: string;
  direccion: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
}

export interface CreateCitaRequest {
  pacienteId: number;
  medicoId: number;
  fechaCita: string;
  horaEntrada: string;
  horaSalida: string;
  tipoCita: string;
  especialidad: string;
  motivo: string;
}

// Servicios de Médicos
export const medicosService = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/api/medicos`);
    if (!response.ok) throw new Error('Error al obtener médicos');
    return response.json();
  },

  getById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/api/medicos/${id}`);
    if (!response.ok) throw new Error('Error al obtener médico');
    return response.json();
  },

  create: async (data: CreateMedicoRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/medicos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Error al crear médico');
    return response.json();
  },

  update: async (id: number, data: UpdateMedicoRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/medicos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Error al actualizar médico');
    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/api/medicos/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Error al eliminar médico');
    return response.ok;
  }
};

// Servicios de Pacientes
export const pacientesService = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/hospital/api/pacientes`);
    if (!response.ok) throw new Error('Error al obtener pacientes');
    return response.json();
  },

  getById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/hospital/api/pacientes/${id}`);
    if (!response.ok) throw new Error('Error al obtener paciente');
    return response.json();
  },

  create: async (data: CreatePacienteRequest) => {
    const response = await fetch(`${API_BASE_URL}/hospital/api/pacientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Error al crear paciente');
    return response.json();
  },

  update: async (id: number, data: CreatePacienteRequest) => {
    const response = await fetch(`${API_BASE_URL}/hospital/api/pacientes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Error al actualizar paciente');
    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/hospital/api/pacientes/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Error al eliminar paciente');
    return response.ok;
  }
};

// Servicios de Citas
export const citasService = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/hospital/api/citas`);
    if (!response.ok) throw new Error('Error al obtener citas');
    return response.json();
  },

  getById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/hospital/api/citas/${id}`);
    if (!response.ok) throw new Error('Error al obtener cita');
    return response.json();
  },

  create: async (data: CreateCitaRequest) => {
    const response = await fetch(`${API_BASE_URL}/hospital/api/citas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Error al crear cita');
    return response.json();
  },

  update: async (id: number, data: CreateCitaRequest) => {
    const response = await fetch(`${API_BASE_URL}/hospital/api/citas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Error al actualizar cita');
    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/hospital/api/citas/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Error al eliminar cita');
    return response.ok;
  }
};