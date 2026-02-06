// Récupérer l'utilisateur connecté
exports.getMe = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      attributes: ['id', 'email', 'username', 'createdAt', 'updatedAt']
    });
    if (!user) {
      return {
        error: true,
        statusCode: 404,
        message: "Utilisateur non trouvé."
      };
    }
    return {
      error: false,
      statusCode: 200,
      data: user
    };
  } catch (error) {
    return {
      error: true,
      statusCode: 500,
      message: "Erreur interne."
    };
  }
};

// Récupérer tous les utilisateurs (option filtre username)
exports.getAllUsers = async (username) => {
  try {
    const where = username ? { username } : {};
    const users = await User.findAll({
      where,
      attributes: ['id', 'email', 'username', 'createdAt', 'updatedAt']
    });
    return {
      error: false,
      statusCode: 200,
      data: users
    };
  } catch (error) {
    return {
      error: true,
      statusCode: 500,
      message: "Erreur interne."
    };
  }
};

// Modifier le username de l'utilisateur connecté
exports.updateMe = async (userId, newUsername) => {
  try {
    if (!newUsername || newUsername.length < 3) {
      return {
        error: true,
        statusCode: 400,
        message: "Le username doit contenir au moins 3 caractères."
      };
    }
    const user = await User.findByPk(userId);
    if (!user) {
      return {
        error: true,
        statusCode: 404,
        message: "Utilisateur non trouvé."
      };
    }
    user.username = newUsername;
    await user.save();
    return {
      error: false,
      statusCode: 200,
      data: {
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    };
  } catch (error) {
    return {
      error: true,
      statusCode: 500,
      message: "Erreur interne."
    };
  }
};
const { User } = require("../../models");
const { generateJwt } = require("../utils/jwt.utils");
const { hashPassword, comparePassword } = require("../utils/password.utils");

exports.CreateUser = async (data) => {
  try {
    const { username, email, password } = data;

    // Vérifier si un utilisateur existe déjà avec cet email
    const isExist = await User.findOne({ where: { email } });
    if (isExist) {
      return {
        error: true,
        message: "Un utilisateur existe déjà avec cet email",
        statusCode: 409,
      };
    }

    // Hasher le mot de passe
    const hashedPassword = await hashPassword(password);

    // Créer l'utilisateur en base
    const newUser = await User.create({ username, email, password: hashedPassword });

    // Retourner l'utilisateur sans le mot de passe
    const { password: _, ...userSafe } = newUser.get({ plain: true });
    return {
      error: false,
      statusCode: 201,
      message: "Vous êtes désormais inscrit.",
      data: userSafe,
    };
  } catch (error) {
    console.error("USERS::SERVICE::CREATEUSER -", error);
    return {
      error: true,
      statusCode: 500,
      message: "Une erreur interne est survenue, veuillez réessayer plus tard.",
    };
  }
};

exports.SignIn = async (data) => {
  try {
    const { email, password } = data;

    // Vérifier si un utilisateur existe avec l'email renseigné
    const user = await User.scope("withPassword").findOne({ where: { email } });
    if (!user) {
      return {
        error: true,
        message: "L'email et / ou le mot de passe est invalide.",
        statusCode: 401,
      };
    }

    // Vérifie le mot de passe
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return {
        error: true,
        message: "L'email et / ou le mot de passe est invalide.",
        statusCode: 401,
      };
    }

    // Génère le token
    const token = await generateJwt({ id: user.id, email: user.email, username: user.username });

    // On retourne le token et l'utilisateur (sans password)
    return {
      error: false,
      statusCode: 200,
      message: "Connexion réussie.",
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        token: token
      },
    };
  } catch (error) {
    console.error("USERS::SERVICE::SIGNIN -", error);
    return {
      error: true,
      statusCode: 500,
      message: "Une erreur interne est survenue, veuillez réessayer plus tard.",
    };
  }
};

