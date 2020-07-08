'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Comments", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      videoId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Videos',
          key: 'id'
        }
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
      content: {
        type: Sequelize.TEXT,
      },
      createdAt: Sequelize.DATE(),
      updatedAt: Sequelize.DATE()
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Comments")
  }
};