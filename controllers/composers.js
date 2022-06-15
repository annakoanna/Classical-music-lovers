const mongoose = require('../models/connection');
const Composer = require('../models/composer');
const Song = require('../models/song');
const composersArr = require('../data/composers');

const db = mongoose.connection


function initDatabase() {
    db.on("open", () => {
        console.log("Connected to Mongoose")
        // delete composers
        Composer.deleteMany({})
            .then(_ => {
                // delete songs
                Song.deleteMany({})
                    .then(_ => {
                        // create composers
                        composersArr.forEach(composerData => {
                            const composer = new Composer({
                                name: composerData.name
                            });
                            composer.save().then(composer => {
                                console.log("saved composer: ", composer);
                                // create songs
                                if (composerData.songs) {
                                    composerData.songs.forEach(songData => {
                                        const song = new Song({
                                            name: songData.name,
                                            audio: songData.audio,
                                            composer: composer
                                        });
                                        song.save().then(song => {
                                            console.log("saved song: ", song);
                                        });
                                    })
                                }
                            });
                        })
                    })

            });
    });
}

module.exports = {
    initDatabase,
};