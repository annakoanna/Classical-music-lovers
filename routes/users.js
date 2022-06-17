const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const Playlist = require('../models/playlist');
router.get("/login/", (req, res) => {
    res.render("user/login.liquid");
});

router.post("/login/", async (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username })
        .then(async (user) => {
            if (user) {
                const result = await bcrypt.compare(password, user.password);
                if (result) {

                    req.session.username = username;
                    req.session.loggedIn = true;

                    res.redirect("/composers");
                } else {
                    res.json({ error: "password doesn't match" });
                }
            } else {

                res.json({ error: "user doesn't exist" });
            }
        })
        .catch((error) => {

            console.log(error);
            res.json({ error });
        });
});

router.get("/logout", (req, res) => {

    req.session.destroy((err) => {
        res.redirect("/");
    });
});
router.post("/signup", async (req, res) => {
    console.log(req.body)
    req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    );

    User.create(req.body)
        .then((newUser) => {
            Playlist.create({ owner: newUser._id, name: "" })
            res.redirect("/users/login");
        })
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
});

router.get("/signup", (req, res) => {
    res.render("user/signup.liquid");
});

module.exports = router;