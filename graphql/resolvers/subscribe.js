
const Video = require('../../database/models').Video;
const User = require('../../database/models').User;
const Comment = require('../../database/models').Comment;
const Subscriber = require('../../database/models').Subscriber;

module.exports = {
    subscribed: async (args) => {

        try {
            const { userId, subscriberId } = args.subscribeInput;
            // console.log("-----<<<<<<<<<<<<<<<<<<<<----------", { userId, subscriberId });

            let subscriber = await Subscriber.findAll({
                where:
                {
                    userId,
                    subscriberId
                }
            });

            subscriber = JSON.parse(JSON.stringify(subscriber, null, 2));
            // console.log(subscriber);

            if (subscriber) return subscriber.length > 0;
        } catch (err) {
            console.log('=========', err);
            return err;
        }
    },
    subscribe: async (args) => {

        // console.log(args);
        const { userId, subscriberId } = args.subscribeInput;

        try {

            // let subscribed

            let subscriber = new Subscriber({
                userId, subscriberId
            });

            // console.log("///----====----", subscriber);

            if (subscriber) {
                subscriber = await subscriber.save()
            }

            return !!subscriber
        } catch (err) {
            console.log('=========', err);
            return err;
        }
    },
    unSubscribe: async (args) => {

        // console.log(args);
        const { userId, subscriberId } = args.subscribeInput;

        try {

            let subscriber = await Subscriber.destroy({
                where:
                {
                    userId,
                    subscriberId
                }
            });

            return !!subscriber;

        } catch (err) {
            console.log('=========', err);
            return err;
        }
    },

    subscribeNumber: async (args) => {
        try {
            const { userId, subscriberId } = args.subscribeInput;

            let subscriber = await Subscriber.findAll({
                where: { userId, subscriberId }
            });
            // console.log(args);
            console.log(JSON.parse(JSON.stringify(subscriber, null, 2)));

            subscriber = JSON.parse(JSON.stringify(subscriber, null, 2))

            if (subscriber) {
                return subscriber.length;
            }
        } catch (err) {
            console.log(err);
            return err;
        }
    },

};

