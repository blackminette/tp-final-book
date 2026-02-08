'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      email: 'test@example.com',
      password: 'password123',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    const users = await queryInterface.sequelize.query(`SELECT id from Users;`);
    const userId = users[0][0].id;

    await queryInterface.bulkInsert('Books', [{
      title: 'Le Petit Prince',
      author: 'Antoine de Saint-Exupéry',
      userId: userId,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Books', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};