

'use strict';
module.exports = function (sequelize, Sequelize) {

    const Subscriber = sequelize.define('Subscriber', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        }
    }, {
        timestamps: true,
        //  freezeTableName: true
    })

    Subscriber.associate = function (models) {
        // user  can  subscribe  user
        Subscriber.belongsTo(models.User, {
            foreignKey: 'userId',
            // as: 'userFrom',
            onDelete: 'CASCADE'
        });
    };

    return Subscriber;
};