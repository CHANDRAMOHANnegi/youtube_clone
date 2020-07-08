'use strict';
module.exports = function (sequelize, Sequelize) {
    const Dislike = sequelize.define('Dislike', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        }
    }, {
        timestamps: true,
    });

    Dislike.associate = function (models) {

        //user  can  dislike  video or comment
        Dislike.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'writer',
            onDelete: 'CASCADE'
        });

        //user can  like  video once
        Dislike.belongsTo(models.Video, {
            foreignKey: 'videoId',
            onDelete: 'CASCADE'
        });

        //user  can  like  comment
        Dislike.belongsTo(models.Comment, {
            foreignKey: 'commentId',
            onDelete: 'CASCADE'
        });

    };

    return Dislike;
};