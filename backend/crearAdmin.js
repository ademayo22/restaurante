const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User.model");

// 
const MONGO_URI = "mongodb://localhost:27017/restaurante";

mongoose.connect(MONGO_URI)
  .then(async () => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("admin1234", saltRounds);

    await User.create({ usuario: "admin", password: hashedPassword, esAdmin: true });
    console.log("Usuario admin creado exitosamente!");
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
