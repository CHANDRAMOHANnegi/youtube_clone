
const Video = require('../../database/models').Video;
const User = require('../../database/models').User;
const Comment = require('../../database/models').Comment;
const Subscriber = require('../../database/models').Subscriber;

module.exports = {
    getVideos: async (args,req) => {

        // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',req.user);

        try {
            let videos = await Video.findAll({
                include: [
                    {
                        model: User,
                        as: 'writer',
                        attributes: [
                            'firstname',
                            'lastname',
                            'image',
                            'id'
                        ]
                    },
                    {
                        model: Comment, include: {
                            model: User, as: 'writer', attributes: [
                                'firstname',
                                'lastname',
                                'image',
                                'id'
                            ]
                        }
                    }
                ]
            });
            if (videos) {
                // console.log((JSON.stringify(videos, null, 2)));
                return JSON.parse(JSON.stringify(videos, null, 2));
            }
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    getVideo: async ({ videoId }) => {

        // console.log('------------>>>>', videoId);

        try {
            const video = await Video.findOne({
                where: { id: videoId },
                include: [{ model: User, as: 'writer', attributes: ['firstname', 'lastname', 'image','id'] },
                {
                    model: Comment,// where: { commentId: null },
                    include: [
                        { model: User, as: 'writer', attributes: ['firstname', 'lastname', 'image','id'] },
                        { model: Comment, as: 'replies' }]
                }]
            });

            // console.log(video);

            // console.log("--<<<<<<<<<<<<--->>>>>>>>>", (JSON.stringify(video, null, 2)));

            if (video)
                return video.dataValues;

        } catch (error) {
            console.log(error);
            return error;
        }
    },
    getSubscriptionVideos: async ({ subscriberId }) => {

        //Need to find all of the Users that I am subscribing to From Subscriber Collection 
        try {
            // console.log('------------', subscriberId);

            let subscribers = await Subscriber.findAll({ where: { subscriberId } });

            // console.log("---->>>>>>>>>>>>>>>>>>>>>>>");


            subscribers = JSON.parse(JSON.stringify(subscribers, null, 2));

            // console.log(subscribers);

            let subscribedUser = [];
            subscribers.map((subscriber) => {
                subscribedUser.push(subscriber.userId);
            });

            // console.log("--------------------", subscribedUser);


            //Need to Fetch all of the Videos that belong to the Users that I found in previous step. 

            const videos = await Video.findAll({
                where: { userId: subscribedUser },
                include: [{ model: User, as: 'writer', attributes: ['firstname', 'lastname', 'image'] },]
            });
            // console.log(videos);

            if (videos) {
                // console.log((JSON.stringify(videos, null, 2)));
                return JSON.parse(JSON.stringify(videos, null, 2));
            }

        } catch (error) {
            console.log("-------------------->", err);
        }

    }
};


//   asset_id: '239277f93bf0c9dc0211210c77c4dafd',
//   public_id: 'gn4tz1x5ltv0vvwbxhoj',
//   version: 1591735228,
//   version_id: 'bc1b9577c17f00a812e76f12e644176e',
//   signature: '4586577c977e2bc8857ec6845230b04dafd8827c',
//   width: 416,
//   height: 603,
//   format: 'png',
//   resource_type: 'image',
//   created_at: '2020-06-09T20:40:28Z',
//   tags: [],
//   bytes: 232138,
//   type: 'upload',
//   etag: 'f450612d53b5b67f1dd986ff86b4a801',
//   placeholder: false,
//   url: 'http://res.cloudinary.com/dksme2kao/image/upload/v1591735228/gn4tz1x5ltv0vvwbxhoj.png',
//   secure_url: 'https://res.cloudinary.com/dksme2kao/image/upload/v1591735228/gn4tz1x5ltv0vvwbxhoj.png',
//   original_filename: 'road'