'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Videos", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      userId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      title: {
        type: Sequelize.STRING,
        maxlength: 50,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      filePath: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      views: {
        type: Sequelize.INTEGER,
        default: 0
      },
      privacy: {
        type: Sequelize.INTEGER,
        default: 0
      },
      duration: Sequelize.STRING,
      thumbnail: Sequelize.TEXT,
      createdAt: Sequelize.DATE(),
      updatedAt: Sequelize.DATE()
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Videos")
  }
};