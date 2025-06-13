import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [platos, setPlatos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/platos')
      .then(res => res.json())
      .then(data => setPlatos(data));
  }, []);

  // Cambiá estos nombres de categoría si querés otras (respetá los que usás en ABM)
  const categorias = [
    "Entrantes", "Ensaladas", "Carnes Rojas", "Carnes Blancas",
    "Pescados", "Pastas", "Postres", "Bebidas Alcohólicas", "Bebidas sin alcohol"
  ];

  return (
    <div className="container">
      <header>
        <h1>Carta del Restaurante</h1>
      </header>
      {categorias.map(cat => (
        <div key={cat} className="card">
          <h2>{cat}</h2>
          <ul>
            {platos.filter(p => p.categoria === cat).map(plato => (
              <li key={plato._id}>
                <Link to={`/plato/${plato._id}`}>{plato.nombre}</Link> - ${plato.precio}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <nav>
        <Link className="boton" to="/admin/login">Administración</Link>
      </nav>
    </div>
  );
}

export default Home;
