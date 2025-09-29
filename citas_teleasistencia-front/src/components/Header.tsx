import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">Logo</h1>
        <nav>
          <ul className="flex gap-4">
            <li><a href="/" className="hover:text-blue-500">Inicio</a></li>
            <li><a href="/" className="hover:text-blue-500">Servicios</a></li>
            <li><a href="/" className="hover:text-blue-500">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
