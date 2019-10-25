const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');

const Animal = require("../models/animal");

router.get('/', (req, res, next) => {
    //Animal.find({name: 'Vaska'}).exec().then(docs => {
      Animal.find().exec().then(docs => {
      console.log(docs);
      const prop = {a1: 'Hello'};
      res.status(200).json({
        message: 'Handling GET request for /animals',
        docs: docs
        });    
      })
});

router.post('/', (req, res, next) => {
  console.log('We are here');
  const animal = new Animal({
    _id: new mongoose.Types.ObjectId(),
    type: req.body.type,
    name: req.body.name
  });
  console.log(animal);
   animal
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /animals",
        createdAnimal: result
      });
    });
});
    
router.get("/:animalId", (req, res, next) => {
    const id = req.params.animalId;
    Animal.findById(id)
    .exec()
    .then(pet => {
      console.log("From database", pet);
      if (pet) {
        //res.status(200).json(pet);
        var animal = {
          id: pet._id,
          name: pet.name,
          type: pet.type
        } 
        res.render('animal.ejs', {animal: animal} );
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    }); 
  });

router.patch("/:animalId", (req, res, next) => {
    const id = req.params.animalId;
    const updateOps = {};
    for (const prop of Object.keys(req.body)) {
      updateOps[prop] = req.body[prop];
    }  

    console.log(updateOps);
    Animal.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});

router.delete("/:animalId", (req, res, next) => {
  const id = req.params.animalId;
  Animal.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;