// src/pages/JoinUs.tsx
import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const JoinUs: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialty: '',
    licenseNumber: '',
    experience: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    alert('¡Gracias! Nos pondremos en contacto contigo pronto.');
  };

  const benefits = [
    {
      icon: '💰',
      title: 'Ingresos Flexibles',
      description: 'Define tus tarifas y horarios de atención'
    },
    {
      icon: '📱',
      title: 'Plataforma Moderna',
      description: 'Herramientas digitales para teleconsulta y gestión'
    },
    {
      icon: '👥',
      title: 'Más Pacientes',
      description: 'Accede a miles de pacientes que buscan especialistas'
    },
    {
      icon: '🎓',
      title: 'Formación Continua',
      description: 'Acceso a webinars y cursos de actualización'
    }
  ];

  const specialties = [
    'Medicina General',
    'Cardiología',
    'Dermatología',
    'Pediatría',
    'Psicología',
    'Nutrición',
    'Ginecología',
    'Traumatología',
    'Otra'
  ];

  return (
    <div className="min-h-screen bg-Background">
      {/* Hero */}
      <section className="bg-gradient-to-r from-Primary-500 to-Secondary-400 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Únete a Nuestra Red de Especialistas
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Forma parte de la plataforma líder en telemedicina y expande tu práctica médica
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-Text-Primary text-center mb-12">
            Beneficios de Unirte
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <Card key={idx} hover className="text-center">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-Text-Primary mb-2">
                  {benefit.title}
                </h3>
                <p className="text-Text-Secondary">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-Text-Primary mb-4">
              Solicita Información
            </h2>
            <p className="text-Text-Secondary">
              Completa el formulario y nos pondremos en contacto contigo
            </p>
          </div>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  name="fullName"
                  label="Nombre Completo"
                  placeholder="Dr. Juan Pérez"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="email"
                  type="email"
                  label="Correo Electrónico"
                  placeholder="doctor@ejemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  name="phone"
                  type="tel"
                  label="Teléfono"
                  placeholder="+57 300 123 4567"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-Text-Primary mb-2">
                    Especialidad
                  </label>
                  <select
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-Primary-500"
                    required
                  >
                    <option value="">Selecciona una especialidad</option>
                    {specialties.map((spec, idx) => (
                      <option key={idx} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  name="licenseNumber"
                  label="Número de Licencia Médica"
                  placeholder="123456"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="experience"
                  type="number"
                  label="Años de Experiencia"
                  placeholder="5"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-Text-Primary mb-2">
                  Mensaje (Opcional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-Primary-500 resize-none"
                  placeholder="Cuéntanos sobre tu práctica médica..."
                ></textarea>
              </div>

              <Button type="submit" fullWidth size="lg">
                Enviar Solicitud
              </Button>

              <p className="text-sm text-Text-Secondary text-center">
                Al enviar este formulario, aceptas nuestros{' '}
                <a href="#" className="text-Primary-500 hover:underline">
                  términos y condiciones
                </a>
              </p>
            </form>
          </Card>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10,000+', label: 'Médicos Activos' },
              { number: '500k+', label: 'Consultas Realizadas' },
              { number: '4.9/5', label: 'Calificación Promedio' },
              { number: '98%', label: 'Satisfacción' }
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-4xl font-bold text-Primary-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-Text-Secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinUs;