const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require("fs");
const multer = require('multer');

// const Question = require('../../database/models/Question');
const User = require('../../database/models').User;

const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'dksme2kao',
    api_key: '359145757282132',
    api_secret: 'mA4OeukQz_rmXJtVdN9pPGlDSas',
});

module.exports = {
    createUser: async (args) => {
        console.log(args);
        try {
            const { email, firstname, lastname, password } = args.userInput;
            const existingUser = await User.findOne({
                where: { email: email }
            });
            if (existingUser) {
                const error = new Error("user already exist");
                throw error;
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({
                email,
                password: hashedPassword,
                firstname,
                lastname,
            });
            const result = await user.save();
            console.log(result);
            return {
                id: result.dataValues.id,
                email,
                firstname,
                lastname,
                createdAt: result.dataValues.createdAt,
            }
        } catch (error) {
            console.log(error);
        }
    },
    login: async ({ email, password }) => {

        const user = await User.findOne({ where: { email: email } });
        // console.log(JSON.stringify(user));

        if (!user) {
            let error = new Error("user does not exist");
            error.code = 401;
            throw error;
        }

        const isequal = await bcrypt.compare(password, user.password);

        if (!isequal) {
            let error = new Error('Password is incorrect')
            error.code = 401;
            throw error;
        }

        const token = jwt.sign({
            userId: user.id,
            email: email
        }, 'secretKey', { expiresIn: '8h' });

        user.token = token;
        await user.save();
        console.log("token----------->", token);

        return {
            userId: user.dataValues.id,
            firstname: user.dataValues.firstname,
            lastname: user.dataValues.lastname,
            image: user.dataValues.image,
            role: user.dataValues.role,
            email: user.dataValues.email,
            token,
            tokenExp: 12
        }
    },
    logOut: async (args, req) => {

        console.log('============================',req.user);
        

        let res = await User.update({ token: '' }, { where: { id: req.user.id } });
        console.log(res);
        return !!res;

    },
    addPhoto: async (args, req) => {

        console.log(args);
        let { filename, mimetype } = args.image;
        console.log({ filename, mimetype });
        const { email } = req.user;

        User.update({ image: filename },
            { where: { email } })
            .then((data) => {
                if (data[0] > 0) {
                    const path = require('path');
                    const mainDir = path.dirname(require.main.filename);
                    filename = `${mainDir}/uploads/${filename}`;
                    console.log(filename);
                    try {
                        cloudinary.v2.uploader.upload(filename).then(photo => {
                            console.log(photo);
                            return true;
                        }).catch(err => {
                            console.log(err);
                        });
                    } catch (error) {
                        throw new Error(error)
                    }
                }
            }).catch(err => {
                console.log("----------------->>>>>>>>>>>>", err);
                throw new Error(err);
            });
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