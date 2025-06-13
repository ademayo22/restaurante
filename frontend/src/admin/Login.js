import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password }),
      });
      if (!res.ok) throw new Error('Login inválido');
      const data = await res.json();
      localStorage.setItem('token', data.token);
      navigate('/admin');
    } catch {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="container card" style={{ maxWidth: 400, margin: "48px auto" }}>
      <h2 className="titulo">Acceso Administración</h2>
      <form onSubmit={handleSubmit}>
        <input className="input" placeholder="Usuario" value={usuario} onChange={e => setUsuario(e.target.value)} />
        <input className="input" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="boton" type="submit">Ingresar</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default Login;
