const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");

// Ruta para iniciar sesión
router.post("/login", async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const user = await User.findOne({ usuario });

    if (!user || !user.activo) {
      return res.status(401).json({ msg: "Usuario no encontrado o inactivo" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ msg: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user._id, esAdmin: user.esAdmin },
      process.env.JWT_SECRET || "claveultrasecreta",
      { expiresIn: "4h" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    res.status(500).json({ msg: "Error del servidor" });
  }
});

module.exports = router;
