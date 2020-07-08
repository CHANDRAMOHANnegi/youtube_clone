module.exports = (sequelize, Sequelize) => {

    const Comment = sequelize.define('Comment', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        content: Sequelize.STRING
    }, {
        timestamps: true,
        // freezeTableName: true
    });

    Comment.associate = function (models) {

        //user  can  comment on  video 
        Comment.belongsTo(models.Video, {
            foreignKey: 'videoId',
            onDelete: 'CASCADE'
        });

        //each comment has a owner
        Comment.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'writer',
            onDelete: 'CASCADE'
        });

        //each comment has many  likes
        Comment.hasMany(models.Like, {
            foreignKey: 'commentId',
            as: 'commentlike',
            onDelete: 'CASCADE'
        });

        //each comment has  many  dislikes
        Comment.hasMany(models.Dislike, {
            foreignKey: 'commentId',
            as: 'commentDislike',
            onDelete: 'CASCADE'
        });

        //user  can  comment on  video 
        Comment.hasMany(models.Comment, {
            as: 'replies',
            foreignKey: 'commentId',
            onDelete: 'CASCADE'
        });


    };

    return Comment;
};