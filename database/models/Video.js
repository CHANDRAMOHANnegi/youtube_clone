module.exports = (sequelize, Sequelize) => {
    const Video = sequelize.define('Video', {

        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        title: {
            type: Sequelize.STRING,
            maxlength: 50,
            allowNull: false
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
    }, {
        timestamps: true,
    });

    Video.associate = function (models) {

        //a video  can have only one owner
        Video.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'writer',
            onDelete: 'CASCADE'
        });

        //a video  can have multiple Comments
        Video.hasMany(models.Comment, {
            foreignKey: 'videoId',
            onDelete: 'CASCADE'
        });

        //a video  can have multiple like
        Video.hasMany(models.Like, {
            foreignKey: 'videoId',
            onDelete: 'CASCADE'
        });

        //a video  can have multiple dislikes
        Video.hasMany(models.Dislike, {
            foreignKey: 'videoId',
            onDelete: 'CASCADE'
        });

    };

    return Video;
}