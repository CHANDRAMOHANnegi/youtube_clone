module.exports = (sequelize, Sequelize) => {

    const Reply = sequelize.define('Reply', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        content: Sequelize.STRING,
    }, {
        timestamps: true,
        // freezeTableName: true
    });

    Reply.associate = function (models) {
 
        //user  can  comment on  video 
        Reply.hasMany(models.Reply, {
            as: 'replies',
            foreignKey: 'parentid',
            onDelete: 'CASCADE'
        });


    };

    return Reply;
};