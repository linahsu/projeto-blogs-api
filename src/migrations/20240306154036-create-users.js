'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      displayName: {
        type: Sequelize.STRING(255),
        allowNull: false,
        field: 'display_name',
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        primaryKey: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
