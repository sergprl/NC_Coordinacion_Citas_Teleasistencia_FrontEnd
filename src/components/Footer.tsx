import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
