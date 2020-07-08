
'use strict';
module.exports = function (sequelize, Sequelize) {
    var User = sequelize.define('User', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        firstname: {
            type: Sequelize.STRING,
            maxlength: 50,
            allowNull: false,
        },
        lastname: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: [5, 30]
            }
        },
        password: {
            type: Sequelize.STRING,
        },
        role: {
            type: Sequelize.INTEGER,
            default: 0
        },
        image: Sequelize.STRING,
        token: {
            type: Sequelize.STRING,
            unique: true,
        },
        tokenExp: {
            type: Sequelize.INTEGER,
        }
    }, {
        timestamps: true,
    });

    User.associate = function (models) {

        //user can post multiple videos
        User.hasMany(models.Video, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });

        // user  can  have  multiple subscriber
        User.hasMany(models.Subscriber, {
            foreignKey: 'subscriberId',
            onDelete: 'CASCADE'
        });

        //user  can  comment on multiple videos
        User.hasMany(models.Comment, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });

        //user  can  lie on multiple videos or comments
        User.hasMany(models.Like, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });

    }

    return User;
};