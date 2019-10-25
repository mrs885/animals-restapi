const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');

const Animal = require("../models/animal");
var entities = {};

router.get('/', (req,res) => {
    

    Animal.find().exec().then(entities => {
        console.log('-----------------------');
        console.log(entities);
        console.log('-----------------------')

        var animals = [];
        for(var i = 0; i < entities.length; i++){
            animals.push({
                type: entities[i].type,
                name: entities[i].name,
                id: String(entities[i]._id)
            });
        } 
        console.log(animals);

        res.render('index.ejs', {animals: animals} );
        /* res.status(200).json({
        posts: posts
        }) */  
    });
});

module.exports = router;