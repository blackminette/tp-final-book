"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Books", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            author: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            year: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            genre: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            isbn: {
                type: Sequelize.STRING,
                allowNull: true,
                unique: true,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
                onDelete: "CASCADE",
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("Books");
    },
};