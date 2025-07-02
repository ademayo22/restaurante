import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./admin/Login";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import Platos from "./admin/Platos";
import Usuarios from "./admin/Usuarios";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <div className="flex-1">
          <Routes>
            {/* Login Admin */}
            <Route path="/admin/login" element={<Login />} />

            {/* Dashboard Admin */}
            <Route
              path="/admin"
              element={
                <RequireAuth>
                  <AdminDashboard />
                </RequireAuth>
              }
            />

            {/* Platos */}
            <Route
              path="/admin/platos"
              element={
                <RequireAuth>
                  <AdminLayout>
                    <Platos />
                  </AdminLayout>
                </RequireAuth>
              }
            />

            {/* Usuarios */}
            <Route
              path="/admin/usuarios"
              element={
                <RequireAuth>
                  <AdminLayout>
                    <Usuarios />
                  </AdminLayout>
                </RequireAuth>
              }
            />

            {/* Catch all: redirige a /admin */}
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
