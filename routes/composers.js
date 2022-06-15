
    const express = require('express');
    const Composer = require('../models/composer');
    const router = express.Router();
    // const composersCtrl = require('./controllers/composers');
    const composers = require('../data/composers.js');
    const Song = require('../models/song');
    //////////////////////////////////////
    
    // You Do - Require the yet to be created reviews controller 
    router.get("/", (req, res) => {
        Composer.find({})
        .then(composers=>{
            res.render("composers/index.liquid",
            {  composers });
    
        })
        .catch(error =>{
            res.json(error)
        })
    });
    router.get("/:id",(req, res)=>{
        Composer.findById(req.params.id)
        .then(composer => {
            Song.find({ composer: req.params.id}).then(songs => {
                res.render("composers/show.liquid",{ composer, songs });
                console.log(composer);
                console.log(songs);
            })
        })
        .catch(error =>{
            res.json(error)
        })
    })
    // router.get("/music", (req, res) => {
        
       
      
     
    //     Composer.deleteMany({}).then((data) => {
    //       // Seed Starter Fruits
    //       //Song.create(composers).rhen()
    //       Composer.create(composers).then((data) => {
    
    //         // send created fruits as response to confirm creation
    //         res.json(data);
    //       });
    //     });
    //   });
    
    module.exports = router;