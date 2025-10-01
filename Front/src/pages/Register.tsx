// src/pages/Register.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Por favor completa todos los campos obligatorios');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (!acceptTerms) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    try {
      setError('');
      setLoading(true);
      
      const userData = {
        displayName: formData.fullName,
        phone: formData.phone,
        userType: 'patient'
      };

    //   await register(formData.email, formData.password, userData);
      navigate('/dashboard');
    } catch (err: any) {
      setError('Error al crear la cuenta. El correo puede estar ya registrado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-Background flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="mb-4">
            <img 
              src="/images/logo-rebranding.svg" 
              alt="Logo" 
              className="h-12 mx-auto"
            />
          </div>
          <h1 className="text-3xl font-bold text-Text-Primary mb-2">
            Crea tu cuenta
          </h1>
          <p className="text-Text-Secondary">
            Únete y accede a cuidado médico de calidad
          </p>
        </div>

        <Card>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-Error-500 text-Error-500 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="fullName"
              label="Nombre completo *"
              placeholder="Juan Pérez"
              value={formData.fullName}
              onChange={handleChange}
              icon={
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              }
            />

            <Input
              type="email"
              name="email"
              label="Correo electrónico *"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              icon={
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              }
            />

            <Input
              type="tel"
              name="phone"
              label="Teléfono"
              placeholder="+57 300 123 4567"
              value={formData.phone}
              onChange={handleChange}
              icon={
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              }
            />

            <Input
              type="password"
              name="password"
              label="Contraseña *"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              helperText="Mínimo 6 caracteres"
              icon={
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              }
            />

            <Input
              type="password"
              name="confirmPassword"
              label="Confirmar contraseña *"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              icon={
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              }
            />

            <div className="flex items-start">
              <input 
                type="checkbox" 
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 mt-1 text-Primary-500 rounded focus:ring-2 focus:ring-Primary-500" 
              />
              <label className="ml-2 text-sm text-Text-Secondary">
                Acepto los{' '}
                <Link to="/terminos" className="text-Primary-500 hover:text-Primary-700">
                  términos y condiciones
                </Link>
                {' '}y la{' '}
                <Link to="/privacidad" className="text-Primary-500 hover:text-Primary-700">
                  política de privacidad
                </Link>
              </label>
            </div>

            <Button type="submit" fullWidth loading={loading}>
              Crear cuenta
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-Text-Secondary">¿Ya tienes una cuenta? </span>
            <Link to="/login" className="text-Primary-500 font-medium hover:text-Primary-700">
              Inicia sesión
            </Link>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-Text-Secondary mb-3">¿Eres un profesional de la salud?</p>
          <Link 
            to="/registro-medico" 
            className="text-Primary-500 font-medium hover:text-Primary-700 text-sm"
          >
            Regístrate como médico →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;