const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error(err));

app.use("/api/users", require("./routes/user.route"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/platos", require("./routes/plato.route"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`API escuchando en puerto ${PORT}`));

