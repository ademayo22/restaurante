import BackgroundLayout from "./components/BackgroundLayout";
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
import AdminDashboard from "./admin/AdminDashboard"; // Importamos el nuevo componente
import Platos from "./admin/Platos";
import Usuarios from "./admin/Usuarios";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Navbar />
        <div className="flex-1">
          <Routes>
            {/* Rutas públicas */}
            <Route
              path="/"
              element={
                <BackgroundLayout>
                  <Home />
                </BackgroundLayout>
              }
            />
            <Route
              path="/menu"
              element={
                <BackgroundLayout>
                  <Menu />
                </BackgroundLayout>
              }
            />
            <Route
              path="/plato/:id"
              element={
                <BackgroundLayout>
                  <PlatoDetalle />
                </BackgroundLayout>
              }
            />

            {/* Login Admin */}
            <Route
              path="/admin/login"
              element={
                token ? (
                  <Navigate to="/admin" replace /> // Redirige al dashboard en lugar de a platos
                ) : (
                  <Login />
                )
              }
            />

            {/* Nuevo Dashboard Admin (sin sidebar) */}
            <Route
              path="/admin"
              element={
                token ? (
                  <AdminDashboard /> // Usamos el nuevo componente aquí
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />

            {/* Rutas específicas de admin (con sidebar) */}
            <Route
              path="/admin/platos"
              element={
                token ? (
                  <AdminLayout>
                    <Platos />
                  </AdminLayout>
                ) : (
                  <Navigate to="/admin/login" replace />
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
                  <Navigate to="/admin/login" replace />
                )
              }
            />

            {/* Ruta catch-all: redirige a home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
        <ScrollTopButton />
      </div>
    </Router>
  );
}

export default App;