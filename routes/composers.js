
const express = require('express');
const Composer = require('../models/composer');
const router = express.Router();

const composers = require('../data/composers.js');
const Song = require('../models/song');
//////////////////////////////////////


router.get("/", (req, res) => {
    Composer.find({})
        .then(composers => {
            res.render("composers/index.liquid",
                { composers });

        })
        .catch(error => {
            res.json(error)
        })
});
router.get("/:id", (req, res) => {
    Composer.findById(req.params.id)
        .then(composer => {
            Song.find({ composer: req.params.id }).then(songs => {
                res.render("composers/show.liquid", { composer, songs });
                console.log(composer);
                console.log(songs);
            })
        })
        .catch(error => {
            res.json(error)
        })
})


module.exports = router;