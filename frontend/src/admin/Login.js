import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundLayout from '../components/BackgroundLayout';

const Login = () => {
  const [formData, setFormData] = useState({
    usuario: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Mensaje personalizado del backend o fallback
        throw new Error(data.mensaje || 'Usuario o contraseña incorrectos');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('esAdmin', data.esAdmin);
      navigate('/admin');
    } catch (err) {
      // Si el servidor no responde
      if (err.message === 'Failed to fetch') {
        setError('No se pudo conectar con el servidor.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundLayout>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        {/* Contenedor principal centrado */}
        <div className="w-full max-w-md mx-auto">
          {/* Tarjeta del formulario */}
          <div className="bg-white p-8 rounded-lg shadow-md w-full flex flex-col items-center">
            {/* Logo/Header centrado */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Inicio de Sesión</h1>
              <div className="h-1 w-20 bg-amber-500 mx-auto mb-4"></div>
            </div>

            {/* Mensaje de error */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center w-full max-w-sm">
                {error}
              </div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm">
              {/* Campo Usuario */}
              <div className="space-y-2">
                <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
                  Usuario
                </label>
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  value={formData.usuario}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Ingrese su usuario"
                  required
                  autoFocus
                />
              </div>

              {/* Campo Contraseña */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Ingrese su contraseña"
                  required
                />
              </div>

              {/* Botón de submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
};

export default Login;
