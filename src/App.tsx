// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DoctorSearch from "./pages/DoctorSearch";
import ArticlesList from "./pages/ArticlesList";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import JoinUs from "./pages/JoinUs";
import DashboardAdmin from "./pages/DashboardAdmin";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/s/medico-general" element={<DoctorSearch />} />
            <Route path="/articulos-medicos" element={<ArticlesList />} />
            <Route path="/precios" element={<Pricing />} />
            <Route path="/unete" element={<JoinUs />} />
            <Route path="/dashboardadmin" element={<DashboardAdmin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Rutas privadas */}
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;