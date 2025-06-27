const mongoose = require("mongoose");

const PlatoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true, trim: true },
  descripcion: { type: String, required: true, trim: true },
  ingredientes: { type: [String], default: [] },
  alergenos: { type: [String], default: [] },
  precio: { 
    type: Number, 
    required: true, 
    min: [0, "El precio no puede ser negativo"]
  },
  categoria: { type: String, required: true, trim: true },
  imagen: String, 
  activo: { type: Boolean, default: true }
});

module.exports = mongoose.model("Plato", PlatoSchema);
