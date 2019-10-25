const mongoose = require('mongoose');

const animalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: String,
    name: String
});

module.exports = mongoose.model('Animal', animalSchema);