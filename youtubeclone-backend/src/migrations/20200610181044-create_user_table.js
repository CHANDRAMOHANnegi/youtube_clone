'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      role: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
       },
      email: {
        type: Sequelize.STRING(32),
        allowNull: false,
        unique: true,
        validate: {
          len: [5, 30]
        }
      },
      lastname: {
        type: Sequelize.STRING,
      },
      image: Sequelize.STRING,
      createdAt: Sequelize.DATE(),
      updatedAt: Sequelize.DATE()
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users")
  }
};