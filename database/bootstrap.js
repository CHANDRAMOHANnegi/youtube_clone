


const User = require('./models').User;
const Video = require('./models').Video;
const Like = require('./models').Like;
const Comment = require('./models').Comment;


module.exports = async () => {


    const errorHandler = (err) => {
        console.log('error====>', err);
    }

    // User.bulkCreate([
    //     { email: "cm@cm.com", password: "12345678", firstname: "cm", lastname: "cc" },
    //     { email: "mohan@cm.com", password: "12345678", firstname: "mohan", lastname: "rawat" },
    //     { email: "rajan@cm.com", password: "12345678", firstname: "rajan", lastname: "jha" },
    //     { email: "magie@cm.com", password: "12345678", firstname: "magie", lastname: "cc" },
    //     { email: "naveen@cm.com", password: "12345678", firstname: "naveen", lastname: "negi" }
    // ]).then(user => {
    //     console.log("=============", user);
    // }).catch((err) => {
    //     console.log("Error while user creation : ", err)
    // })

    // Video.bulkCreate([
    //     { title: 'john-doe@domain.com', filePath: 'John', category: '0', userId: '4e0cd4b5-43b0-4ba9-bede-a9c2792df54b' },
    //     { title: 'john-de@domain.com', filePath: 'Jhn', category: '1', userId: '4e0cd4b5-43b0-4ba9-bede-a9c2792df54b' },
    //  { title: 'john-doe@dmai.com', filePath: 'Joh', category: '2', userId: '3077730f-a502-4f94-a9f0-ee248317effa' }
    // ]).then((newUsers) => {
    //     console.log(newUsers)
    // }).catch((err) => {
    //     console.log("Error while users creation : ", err)
    // })

    //  User.findAll().then(data => {
    //     console.log(JSON.stringify(data, null, 2));
    // }).catch(errorHandler)

    //     Like.findAll().then(data => {
    //     console.log(JSON.stringify(data, null, 2));
    // }).catch(errorHandler)

    // Video.findAll({
    //      include:
    //         { model: User, as: 'writer',attributes:['firstname','lastname','image'] }
    // }).then(data => {
    //     console.log(JSON.stringify(data, null, 2));
    // }).catch(errorHandler)

    // let variables = {
    //     userId: '58eb3034-ac9d-4005-baa4-bb31154b31cd',
    //     videoId: '91e54dfe-0e17-446e-bdbb-a133d7185ef5',
    //     commentId: '269e83e9-7556-412d-96c4-25793af33a95',
    //     content: 'rajan reply to cm'
    // }
    // let comment = new Comment(variables);
    // await comment.save();
    // console.log("-------------------------------------", comment);


}

