const express = require('express');
const router = express.Router();
const playlistsCtrl = require('../controllers/playlists');
const Playlist = require('../models/playlist');
const Song = require('../models/song');
const composers = require('../data/composers.js');
const { ServerOpeningEvent } = require('mongodb');
const res = require('express/lib/response');
const User = require('../models/user');
const { findById, estimatedDocumentCount } = require('../models/user');

router.get('/', (req, res) => {
    User.findOne({ username: req.session.username })
        .then(findUser => {
            // console.log("this is user", findUser._id)
            return findUser
        })
        .then(findUser => {
            //console.log(findUser)
            Playlist.findOneAndUpdate({ owner: findUser._id }).populate('songs').exec()
                .then(playlist => {
                    console.log(playlist._id)
                    //res.send(playlists)
                    res.render("playlist/index.liquid", { playlist });
                })
        })
        .catch(error => {
            res.json(error)
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
    User.findOne({ username: req.session.username })
        .then((user) => {
            console.log(user)
            Playlist.findOneAndUpdate({ owner: user._id }, { $pull: { songs: id } }).exec()
                .then((playlist) => {
                    console.log(playlist)
                    res.redirect('/playlists');
                })
        })
        .catch((error) => {
            res.json({ error });
        });
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    Playlist.findByIdAndUpdate(id, req.body, { new: true })
        .then((playlist) => {
            console.log(playlist)
            res.redirect(`/playlists`)
        })
        .catch((error) => {
            console.log(error)
            res.json({ error });
        })
})
router.post("/:id/playlist", (req, res) => {

    User.find({ username: req.session.username })
        .then(findUser => {
            //console.log("this is user", findUser)
            Playlist.findOneAndUpdate({ owner: findUser._id }).populate('songs').exec()
                .then(playlist => {
                    playlist.songs.push(req.params.id)
                    playlist.save()
                    // console.log("this users playlist", playlist)
                    res.redirect("/playlists");
                })
                .catch(error => {
                    res.json(error)
                })
        })
});




module.exports = router;
