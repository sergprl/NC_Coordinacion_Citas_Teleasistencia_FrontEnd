// src/components/Header.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/">Logo</Link>
        </div>

        {/* Menú links para desktop */}
        <nav className="hidden lg:flex flex-1 justify-center gap-8">
          <Link to="/" className="hover:text-blue-500">
            Inicio
          </Link>
          <Link to="/servicios" className="hover:text-blue-500">
            Servicios
          </Link>
          <Link to="/contacto" className="hover:text-blue-500">
            Contacto
          </Link>
        </nav>

        {/* Botón hamburguesa móvil */}
        <button
          className="lg:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Menú vertical para móvil */}
      {isOpen && (
        <nav className="lg:hidden bg-white shadow-md flex flex-col items-center gap-4 py-4">
          <Link
            to="/"
            className="hover:text-blue-500 w-full text-center"
            onClick={() => setIsOpen(false)}
          >
            Inicio
          </Link>
          <Link
            to="/servicios"
            className="hover:text-blue-500 w-full text-center"
            onClick={() => setIsOpen(false)}
          >
            Servicios
          </Link>
          <Link
            to="/contacto"
            className="hover:text-blue-500 w-full text-center"
            onClick={() => setIsOpen(false)}
          >
            Contacto
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
