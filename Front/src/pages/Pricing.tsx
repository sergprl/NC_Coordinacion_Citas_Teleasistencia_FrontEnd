// src/pages/Pricing.tsx
import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Básico',
      description: 'Perfecto para usuarios ocasionales',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        'Búsqueda de médicos',
        '1 consulta virtual al mes',
        'Historial médico básico',
        'Recordatorios por email',
        'Soporte por email'
      ],
      cta: 'Comenzar Gratis',
      popular: false
    },
    {
      name: 'Premium',
      description: 'Para quienes cuidan su salud',
      monthlyPrice: 49000,
      yearlyPrice: 490000,
      features: [
        'Todo en Básico',
        'Consultas virtuales ilimitadas',
        'Historial médico completo',
        'Recordatorios SMS y push',
        'Descuentos en consultas',
        'Soporte prioritario 24/7',
        'Acceso a artículos premium'
      ],
      cta: 'Suscribirse',
      popular: true
    },
    {
      name: 'Familiar',
      description: 'Cuida de toda tu familia',
      monthlyPrice: 89000,
      yearlyPrice: 890000,
      features: [
        'Todo en Premium',
        'Hasta 5 perfiles familiares',
        'Consultas para toda la familia',
        'Descuentos adicionales',
        'Gestor de salud dedicado',
        'Reportes de salud mensuales'
      ],
      cta: 'Suscribirse',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-Background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-Text-Primary mb-4">
            Planes y Precios
          </h1>
          <p className="text-xl text-Text-Secondary max-w-2xl mx-auto mb-8">
            Elige el plan que mejor se adapte a tus necesidades
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-Primary-500 text-white'
                  : 'text-Text-Secondary'
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-Primary-500 text-white'
                  : 'text-Text-Secondary'
              }`}
            >
              Anual
              <span className="ml-2 text-xs bg-Success-500 text-white px-2 py-1 rounded-full">
                Ahorra 15%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative ${
                plan.popular ? 'border-2 border-Primary-500 shadow-xl' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-Primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Más Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-Text-Primary mb-2">
                  {plan.name}
                </h3>
                <p className="text-Text-Secondary text-sm mb-4">
                  {plan.description}
                </p>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-Text-Primary">
                    ${billingCycle === 'monthly' 
                      ? (plan.monthlyPrice / 1000).toFixed(0) 
                      : (plan.yearlyPrice / 1000).toFixed(0)}k
                  </span>
                  <span className="text-Text-Secondary">
                    /{billingCycle === 'monthly' ? 'mes' : 'año'}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-Success-500 mr-2 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-Text-Secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                fullWidth
                variant={plan.popular ? 'primary' : 'outline'}
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-Text-Primary text-center mb-8">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            {[
              {
                q: '¿Puedo cancelar en cualquier momento?',
                a: 'Sí, puedes cancelar tu suscripción en cualquier momento sin penalizaciones.'
              },
              {
                q: '¿Qué métodos de pago aceptan?',
                a: 'Aceptamos tarjetas de crédito, débito, PSE y transferencias bancarias.'
              },
              {
                q: '¿Los precios incluyen IVA?',
                a: 'Sí, todos los precios mostrados incluyen IVA.'
              }
            ].map((faq, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow">
                <h3 className="font-bold text-Text-Primary mb-2">{faq.q}</h3>
                <p className="text-Text-Secondary">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;