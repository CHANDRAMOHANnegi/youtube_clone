// const authResolver = require('./auth');
const userResolver = require('./user');
const videoResolver = require('./videos');
const commentResolver = require('./comment');
const likeResolver = require('./like');
const subscribeResolver = require('./subscribe');

const rootResolver = {
     ...userResolver,
     ...videoResolver,
     ...commentResolver,
     ...likeResolver,
     ...subscribeResolver
};

module.exports = rootResolver;