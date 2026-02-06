require("dotenv").config();
const logger = require("./src/middlewares/logger.middleware");

const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.get("/", (req, res) => {
  return res.send("Bienvenue sur l'API");
});

// Définition du port pour le serveur
const PORT = process.env.APP_PORT || 3000;


// Importation des routes créées précédemment (en l'occurence, déploiement des routes Books)
app.use("/books", require("./src/routes/books.routes"));

app.use("/users", require("./src/routes/users.routes"));

app.listen(PORT, () => {
  console.log(`Application démarrée sur : http://localhost:${PORT}`);
});
