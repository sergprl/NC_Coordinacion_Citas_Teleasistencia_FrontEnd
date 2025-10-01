// src/pages/LandingPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: "📅",
      title: "Agenda Fácil",
      description: "Reserva citas en minutos con los mejores especialistas"
    },
    {
      icon: "💻",
      title: "Consultas Virtuales",
      description: "Accede a teleconsultas desde la comodidad de tu hogar"
    },
    {
      icon: "📋",
      title: "Historial Médico",
      description: "Tu información de salud siempre disponible y segura"
    },
    {
      icon: "⏰",
      title: "Recordatorios",
      description: "Nunca olvides tus citas con notificaciones automáticas"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Médicos Certificados" },
    { number: "500k+", label: "Pacientes Satisfechos" },
    { number: "50+", label: "Especialidades" },
    { number: "24/7", label: "Disponibilidad" }
  ];

  return (
    <div className="bg-Background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-Primary-700 via-Primary-500 to-Secondary-400 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Tu salud en las mejores manos
              </h1>
              <p className="text-xl mb-8 text-gray-100">
                Conectamos pacientes con médicos especialistas para una atención médica de calidad, presencial o virtual.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/s/medico-general">
                  <Button size="lg" className="bg-white text-Primary-700 hover:bg-gray-100">
                    Buscar Médico
                  </Button>
                </Link>
                <Link to="/registro">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-Primary-700">
                    Crear Cuenta
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600" 
                alt="Médico sonriente"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-Background to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-Primary-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-Text-Secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-Text-Primary mb-4">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-xl text-Text-Secondary max-w-2xl mx-auto">
              Ofrecemos una plataforma completa para gestionar tu salud de manera eficiente
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} hover className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-Text-Primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-Text-Secondary">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-Text-Primary mb-4">
              Especialidades Médicas
            </h2>
            <p className="text-xl text-Text-Secondary">
              Encuentra al especialista que necesitas
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['🩺 General', '❤️ Cardiología', '🧴 Dermatología', '👶 Pediatría', '🧠 Psicología', '🥗 Nutrición'].map((spec, idx) => (
              <Link to="/s/medico-general" key={idx}>
                <div className="p-6 rounded-xl border-2 border-gray-200 hover:border-Primary-500 hover:shadow-lg transition-all text-center cursor-pointer">
                  <div className="text-3xl mb-2">{spec.split(' ')[0]}</div>
                  <div className="text-sm font-medium text-Text-Primary">
                    {spec.split(' ')[1]}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-Primary-500 to-Secondary-400 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Únete a miles de pacientes que ya confían en nosotros para su cuidado médico
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/registro">
              <Button size="lg" className="bg-white text-Primary-700 hover:bg-gray-100">
                Registrarme Ahora
              </Button>
            </Link>
            <Link to="/unete">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-Primary-700">
                Soy Médico
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;