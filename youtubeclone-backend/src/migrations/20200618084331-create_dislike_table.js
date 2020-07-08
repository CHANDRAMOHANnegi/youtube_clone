'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Dislikes", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
         primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      commentId: {
        type: Sequelize.UUID,
         references: {
          model: 'Comments',
          key: 'id'
        }
      },
      videoId: {
        type: Sequelize.UUID,
         references: {
          model: 'Videos',
          key: 'id'
        }
      },
      createdAt: Sequelize.DATE(),
      updatedAt: Sequelize.DATE()
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Dislikes")
  }
};