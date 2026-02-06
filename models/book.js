"use strict";
module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define(
        "Book",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [2],
                },
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    len: [10],
                },
            },
            author: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            year: {
                type: DataTypes.INTEGER,
                allowNull: true,
                validate: {
                    min: 0,
                    max: new Date().getFullYear(),
                },
            },
            genre: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            isbn: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
                onDelete: "CASCADE",
            },
        },
        {
            tableName: "Books",
            timestamps: true,
        }
    );
    Book.associate = function (models) {
        Book.belongsTo(models.User, { foreignKey: "userId" });
    };
    return Book;
};