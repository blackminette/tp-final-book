require("dotenv").config();
const logger = require("./src/middlewares/logger.middleware");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const express = require("express");

const app = express();

const PORT = process.env.APP_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.get("/", (req, res) => {
  return res.send("Bienvenue sur l'API");
});

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API BookLover",
      version: "1.0.0",
      description: "Documentation par Walid Berkouat, Nicolas Vella et Yaniss Zemouli",
    },
    servers: [{ url: `http://localhost:${PORT}` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    paths: {
      "/users/sign-up": {
        post: {
          tags: ["Users"],
          summary: "Inscription",
          responses: { 201: { description: "Utilisateur créé" } }
        }
      },
      "/users/sign-in": {
        post: {
          tags: ["Users"],
          summary: "Connexion",
          responses: { 200: { description: "JWT retourné" } }
        }
      },
      "/books": {
        get: {
          tags: ["Books"],
          summary: "Récupérer tous les livres",
          responses: { 200: { description: "Liste des livres" } }
        }
      }
    }
  },
  apis: [] 
};

const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/books", require("./src/routes/books.routes"));
app.use("/users", require("./src/routes/users.routes"));

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 Serveur lancé sur : http://localhost:${PORT}`);
  console.log(`📖 Documentation : http://localhost:${PORT}/api-docs`);
  console.log(`=================================================`);
});