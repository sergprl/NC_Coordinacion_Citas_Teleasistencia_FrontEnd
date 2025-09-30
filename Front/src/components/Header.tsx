import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full flex items-center justify-between px-4 py-3 shadow-sm bg-white">
      {/* <!-- Logo --> */}
      <div className="flex-shrink-0">
        <a href="/" className="inline-block">
          <span className="sr-only">doctoranytime</span>
          <img 
  src="/images/logo-rebranding.svg" 
  alt="doctoranytime logo" 
  className="w-[79px] h-[32px]" 
/>

        </a>
      </div>

      {/* <!-- CTA principal --> */}
      <a href="https://pro.doctoranytime.co/es/joinus/unete-a-nosotros"
        className="ml-4 mr-auto px-4 py-2 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition">
        ¿Eres especialista?
      </a>

      {/* <!-- Menú móvil --> */}
      <div className="flex items-center md:hidden">
        <button id="mobile-menu" className="p-2 rounded-md border border-gray-300">
          <span className="sr-only">MENU</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* <!-- Menú desktop --> */}
      <nav className="hidden md:flex items-center space-x-6">
        {/* <!-- Dropdown Buscar --> */}
        <div className="relative group">
          <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
            <span>Buscar</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.186l3.71-3.956a.75.75 0 111.08 1.04l-4.25 4.53a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                    clip-rule="evenodd" />
            </svg>
          </button>
          <ul className="absolute hidden group-hover:block bg-white border shadow-md rounded-md mt-2 w-48">
            <li><a href="/s/medico-general" className="block px-4 py-2 hover:bg-gray-50">Médicos</a></li>
            <li><a href="/preguntas-respuestas" className="block px-4 py-2 hover:bg-gray-50">Pregunta a nuestros especialistas</a></li>
            <li><a href="/articulos-medicos" className="block px-4 py-2 hover:bg-gray-50">Artículos de Salud</a></li>
          </ul>
        </div>

        {/* <!-- Dropdown Login --> */}
        <div className="relative group">
          <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:text-blue-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zM12 14c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
            </svg>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.186l3.71-3.956a.75.75 0 111.08 1.04l-4.25 4.53a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                    clip-rule="evenodd" />
            </svg>
          </button>
          <ul className="absolute hidden group-hover:block right-0 bg-white border shadow-md rounded-md mt-2 w-40">
            <li><a href="/account/login" className="block px-4 py-2 hover:bg-gray-50">Paciente</a></li>
            <li><a href="/account/login?loginType=1" className="block px-4 py-2 hover:bg-gray-50">Médico</a></li>
          </ul>
        </div>
      </nav>
    </header>

  );
};

export default Header;
