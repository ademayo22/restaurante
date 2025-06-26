import React, { useEffect, useState } from "react";

function Usuarios() {
  const token = localStorage.getItem("token");
  const [usuarios, setUsuarios] = useState([]);
  const [nuevo, setNuevo] = useState({ usuario: "", password: "" });
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const fetchUsuarios = () => {
    fetch("http://localhost:5001/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setUsuarios);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const crearUsuario = async () => {
    if (!nuevo.usuario || !nuevo.password) {
      setMensajeError("Completa todos los campos para crear usuario.");
      setMensaje("");
      return;
    }
    setMensaje("");
    setMensajeError("");
    await fetch("http://localhost:5001/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...nuevo, esAdmin: true }),
    });
    setNuevo({ usuario: "", password: "" });
    setMensaje("Usuario creado con éxito!");
    fetchUsuarios();
  };

  const eliminarUsuario = async (id) => {
    await fetch(`http://localhost:5001/api/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setMensaje("Usuario eliminado.");
    setMensajeError("");
    fetchUsuarios();
  };

  const guardarEdicion = async () => {
    if (!editando.usuario) {
      setMensajeError("El usuario no puede quedar vacío.");
      setMensaje("");
      return;
    }
    setMensaje("");
    setMensajeError("");
    await fetch(`http://localhost:5001/api/users/${editando._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...editando, esAdmin: true }),
    });
    setEditando(null);
    setMensaje("Usuario editado con éxito!");
    fetchUsuarios();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#F3E9DB] rounded-lg shadow-lg">
      <h3 className="text-3xl font-playfair text-[#5E1224] mb-6 text-center">
        Usuarios Administrativos
      </h3>

      {/* Mensajes de éxito y error */}
      {mensaje && (
        <div className="mb-4 text-[#6B7D4E] bg-[#6B7D4E]/20 p-3 rounded text-center font-semibold">
          {mensaje}
        </div>
      )}
      {mensajeError && (
        <div className="mb-4 text-[#A0453E] bg-[#A0453E]/20 p-3 rounded text-center font-semibold">
          {mensajeError}
        </div>
      )}

      <ul className="space-y-4 mb-8">
        {usuarios.map((user) => (
          <li
            key={user._id}
            className="flex flex-col sm:flex-row items-center justify-between bg-[#E8D9C5] rounded p-4 shadow hover:bg-[#D7C9B3] transition"
          >
            {editando && editando._id === user._id ? (
              <>
                <input
                  type="text"
                  className="border border-[#B38B59] focus:ring-[#5E1224] focus:ring-2 rounded px-3 py-2 flex-grow mb-2 sm:mb-0 sm:mr-4 text-[#3A2A1F]"
                  value={editando.usuario}
                  onChange={(e) =>
                    setEditando({ ...editando, usuario: e.target.value })
                  }
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={guardarEdicion}
                    className="bg-[#5E1224] hover:bg-[#3A0D1A] text-[#F3E9DB] px-4 py-2 rounded font-semibold transition"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditando(null)}
                    className="bg-[#B38B59] hover:bg-[#9C7F50] text-[#2A2118] px-4 py-2 rounded font-semibold transition"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="text-[#3A2A1F] font-semibold text-lg break-words">
                  {user.usuario}{" "}
                  {user.esAdmin && (
                    <span className="italic text-[#B38B59]">(Admin)</span>
                  )}
                </span>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => setEditando(user)}
                    className="bg-[#B38B59] hover:bg-[#9f7b4f] text-[#F3E9DB] px-4 py-2 rounded font-semibold transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarUsuario(user._id)}
                    className="bg-[#A0453E] hover:bg-[#7D2C3E] text-[#F3E9DB] px-4 py-2 rounded font-semibold transition"
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <h4 className="text-xl font-semibold mb-4 text-[#5E1224]">Crear nuevo usuario</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          crearUsuario();
        }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <input
          type="text"
          placeholder="Usuario"
          className="border border-[#B38B59] focus:ring-[#5E1224] focus:ring-2 rounded px-3 py-2 flex-grow text-[#3A2A1F]"
          value={nuevo.usuario}
          onChange={(e) => setNuevo({ ...nuevo, usuario: e.target.value })}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="border border-[#B38B59] focus:ring-[#5E1224] focus:ring-2 rounded px-3 py-2 flex-grow text-[#3A2A1F]"
          value={nuevo.password}
          onChange={(e) => setNuevo({ ...nuevo, password: e.target.value })}
        />
        <button
          type="submit"
          className="bg-[#5E1224] hover:bg-[#3A0D1A] text-[#F3E9DB] px-6 py-2 rounded whitespace-nowrap font-semibold transition"
        >
          Crear
        </button>
      </form>
    </div>
  );
}

export default Usuarios;
