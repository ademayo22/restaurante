const fs = require("fs");
const path = require("path");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { usuario, password } = req.body;
  const user = await User.findOne({ usuario, activo: true });

  if (!user) return res.status(401).json({ mensaje: "Usuario no encontrado" });

  const valid = await user.validarPassword(password);
  if (!valid) return res.status(401).json({ mensaje: "Contraseña incorrecta" });

  const token = jwt.sign(
    { id: user._id, usuario: user.usuario },
    process.env.JWT_SECRET
  );

  res.json({ token, esAdmin: user.esAdmin });
};

exports.crear = async (req, res) => {
  const { usuario, password, esAdmin } = req.body;
  try {
    const user = new User({ usuario, password, esAdmin });
    await user.save();
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ mensaje: "Error creando usuario", error: e });
  }
};

exports.listar = async (req, res) => {
  const usuarios = await User.find({ activo: true }).select("-password");
  res.json(usuarios);
};

exports.modificar = async (req, res) => {
  const { id } = req.params;
  const { usuario, esAdmin } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    { usuario, esAdmin },
    { new: true }
  ).select("-password");
  res.json(user);
};

exports.eliminar = async (req, res) => {
  const { id } = req.params;
  const adminUser = req.user?.usuario || "desconocido";

  const user = await User.findByIdAndUpdate(id, { activo: false }, { new: true });

  if (user) {
    const logPath = path.join(__dirname, "../logs/eliminaciones.csv");
    const linea = `${adminUser},Usuario eliminado,${user.usuario},${new Date().toISOString()}\n`;

    fs.appendFile(logPath, linea, (err) => {
      if (err) console.error("Error escribiendo CSV:", err);
    });

    res.json({ mensaje: "Usuario eliminado lógicamente" });
  } else {
    res.status(404).json({ mensaje: "Usuario no encontrado" });
  }
};
