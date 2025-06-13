const mongoose = require("mongoose");
const User = require("./models/User.model");

// Cambiá el string de conexión si usás otro distinto en .env
const MONGO_URI = "mongodb://localhost:27017/restaurante";

mongoose.connect(MONGO_URI)
  .then(async () => {
    await User.create({ usuario: "admin", password: "admin1234", esAdmin: true });
    console.log("Usuario admin creado exitosamente!");
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
