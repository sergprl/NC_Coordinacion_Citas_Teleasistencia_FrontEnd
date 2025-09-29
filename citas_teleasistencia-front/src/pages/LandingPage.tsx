import React from "react";

const LandingPage: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <h2 className="text-4xl font-bold mb-4">Bienvenido a nuestro sitio</h2>
      <p className="text-lg text-gray-600">Esta es la landing page principal de tu proyecto.</p>
      <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">
        Comenzar
      </button>
    </section>
  );
};

export default LandingPage;
