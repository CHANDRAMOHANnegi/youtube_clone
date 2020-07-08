'use strict';
module.exports = function (sequelize, Sequelize) {
    const Like = sequelize.define('Like', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        }
    }, {
        timestamps: true,
    });

    Like.associate = function (models) {

        //user  can  like  video or comment
        Like.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'writer',
            onDelete: 'CASCADE'
        });

        //user can  like  video once
        Like.belongsTo(models.Video, {
            foreignKey: 'videoId',
            onDelete: 'CASCADE'
        });

        //user  can  like  comments
        Like.belongsTo(models.Comment, {
            foreignKey: 'commentId',
            onDelete: 'CASCADE'
        });

    };

    return Like;
};