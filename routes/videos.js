const express = require('express');
const router = express.Router();
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');

const Video = require('../database/models').Video;
const User = require('../database/models').User;

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

//=================================
//             User
//=================================

router.post("/uploadfiles", (req, res) => {
    console.log("=------------------------------------------");
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })
});

router.post("/thumbnail", (req, res) => {

    let thumbsFilePath = "";
    let fileDuration = "";

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
        // console.dir("---------->", metadata);
        // console.log("==========>", metadata.format.duration);
        fileDuration = metadata.format.duration;
    });

    ffmpeg(req.body.filePath)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration })
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: 'uploads/thumbnails',
            size: '320x240',
            // %b input basename ( filename w/o extension )
            filename: 'thumbnail-%b.png'
        });
});


router.get("/getVideos", (req, res) => {
    console.log('=================>');

    Video.findAll({
        include:
            { model: User, as: 'writer', attributes: ['firstname', 'lastname', 'image'] }
    }).then(data => {
        // console.log(JSON.stringify(data, null, 2));
        return res.status(200).send(JSON.stringify(data, null, 2));
    }).catch(err => {
        console.log('?????????????????????', err);
        return res.status(400).send(err);
    });
});

router.post("/uploadVideo", (req, res) => {
    console.log("><<><><><><><", req.body);
    const video = new Video(req.body)
    video.save().then(video => {
        console.log(video);
        return res.status(200).json({
            success: true
        })
    }).catch(err => {
        console.log(err);
        return res.status(400).json({ success: false, err })
    })
});


router.post("/getVideo", (req, res) => {
    Video.findOne({ "_id": req.body.videoId })
        .populate('writer')
        .exec((err, video) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, video })
        })
});


router.post("/getSubscriptionVideos", (req, res) => {

    //Need to find all of the Users that I am subscribing to From Subscriber Collection 

    Subscriber.find({ 'userFrom': req.body.userFrom })
        .exec((err, subscribers) => {
            if (err) return res.status(400).send(err);

            let subscribedUser = [];
            subscribers.map((subscriber, i) => {
                subscribedUser.push(subscriber.userTo)
            })

            //Need to Fetch all of the Videos that belong to the Users that I found in previous step. 
            Video.find({ writer: { $in: subscribedUser } })
                .populate('writer')
                .exec((err, videos) => {
                    if (err) return res.status(400).send(err);
                    res.status(200).json({ success: true, videos })
                })
        })
});

module.exports = router;