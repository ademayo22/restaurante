import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./carta/Home";
import Menu from "./carta/Menu";
import PlatoDetalle from "./carta/PlatoDetalle";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollTopButton from "./components/ScrollTopButton";

// Admin
import Login from "./admin/Login";
import AdminLayout from "./admin/AdminLayout";
import Platos from "./admin/Platos";
import Usuarios from "./admin/Usuarios";

function App() {
  // Usá esto para proteger las rutas admin:
  const token = localStorage.getItem("token");

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Navbar />
        <div className="flex-1">
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/plato/:id" element={<PlatoDetalle />} />

            {/* Login Admin */}
            <Route path="/admin/login" element={<Login />} />

            {/* Panel admin: sidebar siempre visible */}
            <Route
              path="/admin/platos"
              element={
                token ? (
                  <AdminLayout>
                    <Platos />
                  </AdminLayout>
                ) : (
                  <Navigate to="/admin/login" />
                )
              }
            />
            <Route
              path="/admin/usuarios"
              element={
                token ? (
                  <AdminLayout>
                    <Usuarios />
                  </AdminLayout>
                ) : (
                  <Navigate to="/admin/login" />
                )
              }
            />
            <Route
              path="/admin"
              element={
                token ? (
                  <AdminLayout>
                    <h2 className="text-2xl font-bold">Bienvenido al panel de administración</h2>
                  </AdminLayout>
                ) : (
                  <Navigate to="/admin/login" />
                )
              }
            />

            {/* Redirección catch-all */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
        <ScrollTopButton />
      </div>
    </Router>
  );
}

export default App;
