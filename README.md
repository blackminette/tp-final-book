# TP Développement API Express - Gestion de Livres

## Membres du groupe
- Walid Berkouat
- Nicolas Vella
- Yaniss Zemouli

## Sujet fonctionnel
[cite_start]Conception et développement d'une API REST complète pour la gestion d'une bibliothèque (livres et utilisateurs) connectée à une base de données SQL via Sequelize[cite: 8, 13].

## Contraintes techniques respectées
- [cite_start]**Framework** : Node.js avec Express [cite: 17]
- [cite_start]**ORM** : Sequelize (MySQL/PostgreSQL/SQLite) [cite: 23, 50]
- **Sécurité** : 
    - [cite_start]Hashage des mots de passe avec **bcrypt** [cite: 27, 58]
    - [cite_start]Authentification via **JWT** (jsonwebtoken) [cite: 26, 59]
- [cite_start]**Validation** : Validation des données avec **Joi** ou **express-validator** [cite: 29, 63]
- [cite_start]**Documentation** : Swagger (swagger-jsdoc + swagger-ui-express) [cite: 25, 67]

## Installation
1. Cloner le dépôt.
2. Installer les dépendances : 
   ```bash
   npm install