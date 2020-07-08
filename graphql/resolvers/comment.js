
const Video = require('../../database/models').Video;
const User = require('../../database/models').User;
const Comment = require('../../database/models').Comment;

module.exports = {

    createComment: async (args) => {
        // console.log(args);
        try {
            const { userId, videoId, content, commentId } = args.commentInput;

            let variables = {}

            if (commentId && commentId != 'undefined') {
                variables = { userId, videoId, commentId }
            } else {
                variables = { userId, videoId }
            }

            console.log(variables);

            let comment = await Comment.findOne({
                where: variables
            });
            console.log('/////////////////////', comment);
            if (comment) {
                comment.content = content;
            } else {
                variables = { ...variables, content }

                console.log(variables);

                comment = new Comment(variables);
            }
            console.log('-----------------------', comment);
            const result = await comment.save();
            console.log(JSON.stringify("=======================", result));
            return {
                id: result.dataValues.id,
                content,
                createdAt: result.dataValues.createdAt,
            }
        } catch (err) {
            console.log('=========', err);
            return err;
        }
    },
    getcomments: async () => {
        try {
            let videos = await Video.findAll({
                include:
                    { model: User, as: 'writer', attributes: ['firstname', 'lastname', 'image'] }
            });
            if (videos) {
                console.log(JSON.parse(JSON.stringify(videos, null, 2)));
                return JSON.parse(JSON.stringify(videos, null, 2));
            }
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    getComment: async ({ videoId }) => {
        try {
            const video = await Video.findOne({
                where: { id: videoId },
                include: { model: User, as: 'writer', attributes: ['firstname', 'lastname', 'image'] }
            });

            console.log("-------------------->>>", video);

            if (video)
                return video.dataValues;

        } catch (error) {
            console.log(error);
            return error;
        }
    }
};

