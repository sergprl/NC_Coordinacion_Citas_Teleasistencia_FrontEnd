// src/types/index.ts

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phone?: string;
  userType: 'patient' | 'doctor' | 'admin';
  createdAt: Date;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  experience: number;
  languages: string[];
  price: number;
  available: boolean;
  nextAvailable?: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  date: Date;
  time: string;
  type: 'presencial' | 'virtual';
  status: 'pendiente' | 'confirmada' | 'completada' | 'cancelada';
  reason: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorAvatar?: string;
  imageUrl: string;
  readTime: number;
  publishedAt: Date;
  tags: string[];
}

export interface Specialty {
  id: string;
  name: string;
  icon: string;
  description: string;
}