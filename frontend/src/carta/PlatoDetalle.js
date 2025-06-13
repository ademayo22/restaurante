import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function PlatoDetalle() {
  const { id } = useParams();
  const [plato, setPlato] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/platos`)
      .then(res => res.json())
      .then(data => setPlato(data.find(p => p._id === id)));
  }, [id]);

  if (!plato) return <div className="container card">Cargando...</div>;

  return (
    <div className="container card" style={{ maxWidth: 600 }}>
      <h2>{plato.nombre}</h2>
      <p><strong>Descripción:</strong> {plato.descripcion}</p>
      <p><strong>Precio:</strong> ${plato.precio}</p>
      <p><strong>Ingredientes:</strong> {plato.ingredientes && plato.ingredientes.join(', ')}</p>
      <p><strong>Alérgenos:</strong> {plato.alergenos && plato.alergenos.join(', ')}</p>
      <Link className="boton" to="/">Volver a la carta</Link>
    </div>
  );
}

export default PlatoDetalle;
