import React from "react";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";

const App: React.FC = () => {
  return (
    <Layout>
      <LandingPage />
    </Layout>
  );
};

export default App;
