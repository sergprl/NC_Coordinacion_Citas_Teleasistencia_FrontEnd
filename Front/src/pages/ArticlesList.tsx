// src/pages/ArticlesList.tsx
import React, { useState } from 'react';
import { mockArticles } from '../utils/mockData';
import { Article } from '../types';
import Card from '../components/common/Card';

const ArticlesList: React.FC = () => {
  const [articles] = useState<Article[]>(mockArticles);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['Todas', 'Bienestar', 'Prevención', 'Cardiología', 'Nutrición', 'Salud Mental'];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  return (
    <div className="min-h-screen bg-Background py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-Text-Primary mb-4">
            Artículos de Salud
          </h1>
          <p className="text-xl text-Text-Secondary max-w-2xl mx-auto">
            Información confiable y actualizada de nuestros especialistas para tu bienestar
          </p>
        </div>

        {/* Categories */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex flex-wrap gap-3 bg-white p-2 rounded-xl shadow-sm">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === 'Todas' ? 'all' : category)}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                  (category === 'Todas' && selectedCategory === 'all') || category === selectedCategory
                    ? 'bg-Primary-500 text-white shadow-md'
                    : 'text-Text-Primary hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        {filteredArticles.length > 0 && (
          <Card hover className="mb-8 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-64 md:h-full">
                <img
                  src={filteredArticles[0].imageUrl}
                  alt={filteredArticles[0].title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-center py-4">
                <span className="inline-block px-3 py-1 bg-Primary-500 text-white text-sm font-medium rounded-full w-fit mb-3">
                  {filteredArticles[0].category}
                </span>
                <h2 className="text-3xl font-bold text-Text-Primary mb-3">
                  {filteredArticles[0].title}
                </h2>
                <p className="text-Text-Secondary mb-4 text-lg">
                  {filteredArticles[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-Text-Secondary mb-4">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    {filteredArticles[0].author}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {filteredArticles[0].readTime} min lectura
                  </span>
                  <span>
                    {new Date(filteredArticles[0].publishedAt).toLocaleDateString('es-ES', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                <button className="px-6 py-3 bg-Primary-500 text-white font-medium rounded-lg hover:bg-Primary-700 transition-colors w-fit">
                  Leer artículo completo
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.slice(1).map(article => (
            <Card key={article.id} hover padding="none" className="overflow-hidden">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <span className="inline-block px-3 py-1 bg-blue-50 text-Primary-500 text-xs font-medium rounded-full mb-3">
                  {article.category}
                </span>
                <h3 className="text-xl font-bold text-Text-Primary mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-Text-Secondary mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-Text-Secondary pt-4 border-t border-gray-100">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12