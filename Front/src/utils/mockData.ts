// src/utils/mockData.ts
import type { Doctor, Article, Specialty } from '../types';

export const mockSpecialties: Specialty[] = [
  { id: '1', name: 'Medicina General', icon: '🩺', description: 'Atención médica integral' },
  { id: '2', name: 'Cardiología', icon: '❤️', description: 'Especialistas del corazón' },
  { id: '3', name: 'Dermatología', icon: '🧴', description: 'Cuidado de la piel' },
  { id: '4', name: 'Pediatría', icon: '👶', description: 'Salud infantil' },
  { id: '5', name: 'Psicología', icon: '🧠', description: 'Salud mental' },
  { id: '6', name: 'Nutrición', icon: '🥗', description: 'Alimentación saludable' },
];

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Carlos Ramírez',
    specialty: 'Medicina General',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 4.8,
    reviewsCount: 156,
    experience: 12,
    languages: ['Español', 'Inglés'],
    price: 50000,
    available: true,
    nextAvailable: 'Hoy a las 3:00 PM'
  },
  {
    id: '2',
    name: 'Dra. María González',
    specialty: 'Cardiología',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 4.9,
    reviewsCount: 203,
    experience: 15,
    languages: ['Español', 'Inglés', 'Francés'],
    price: 80000,
    available: true,
    nextAvailable: 'Mañana a las 10:00 AM'
  },
  {
    id: '3',
    name: 'Dr. Luis Martínez',
    specialty: 'Dermatología',
    avatar: 'https://i.pravatar.cc/150?img=33',
    rating: 4.7,
    reviewsCount: 98,
    experience: 8,
    languages: ['Español'],
    price: 60000,
    available: false,
  },
  {
    id: '4',
    name: 'Dra. Ana Rodríguez',
    specialty: 'Pediatría',
    avatar: 'https://i.pravatar.cc/150?img=9',
    rating: 5.0,
    reviewsCount: 187,
    experience: 10,
    languages: ['Español', 'Inglés'],
    price: 55000,
    available: true,
    nextAvailable: 'Hoy a las 5:00 PM'
  },
  {
    id: '5',
    name: 'Dra. Laura Pérez',
    specialty: 'Psicología',
    avatar: 'https://i.pravatar.cc/150?img=10',
    rating: 4.9,
    reviewsCount: 142,
    experience: 7,
    languages: ['Español', 'Inglés'],
    price: 70000,
    available: true,
    nextAvailable: 'Mañana a las 2:00 PM'
  },
  {
    id: '6',
    name: 'Dr. Jorge Silva',
    specialty: 'Nutrición',
    avatar: 'https://i.pravatar.cc/150?img=15',
    rating: 4.6,
    reviewsCount: 76,
    experience: 5,
    languages: ['Español'],
    price: 45000,
    available: true,
    nextAvailable: 'Hoy a las 4:00 PM'
  },
];

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'La importancia de la prevención cardiovascular',
    excerpt: 'Descubre cómo cuidar tu corazón con hábitos saludables y chequeos regulares.',
    content: 'Contenido completo del artículo...',
    category: 'Cardiología',
    author: 'Dra. María González',
    imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800',
    readTime: 5,
    publishedAt: new Date('2025-09-15'),
    tags: ['corazón', 'prevención', 'salud']
  },
  {
    id: '2',
    title: 'Alimentación balanceada: tu mejor medicina',
    excerpt: 'Los nutrientes esenciales que tu cuerpo necesita para funcionar correctamente.',
    content: 'Contenido completo del artículo...',
    category: 'Nutrición',
    author: 'Dr. Jorge Silva',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
    readTime: 7,
    publishedAt: new Date('2025-09-20'),
    tags: ['nutrición', 'alimentación', 'bienestar']
  },
  {
    id: '3',
    title: 'Salud mental en tiempos modernos',
    excerpt: 'Estrategias para manejar el estrés y la ansiedad en la vida cotidiana.',
    content: 'Contenido completo del artículo...',
    category: 'Salud Mental',
    author: 'Dra. Laura Pérez',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    readTime: 6,
    publishedAt: new Date('2025-09-25'),
    tags: ['salud mental', 'estrés', 'bienestar']
  },
  {
    id: '4',
    title: 'Cuidados de la piel en todas las edades',
    excerpt: 'Rutinas dermatológicas adaptadas a cada etapa de la vida.',
    content: 'Contenido completo del artículo...',
    category: 'Dermatología',
    author: 'Dr. Luis Martínez',
    imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800',
    readTime: 4,
    publishedAt: new Date('2025-09-28'),
    tags: ['piel', 'cuidado', 'dermatología']
  },
];