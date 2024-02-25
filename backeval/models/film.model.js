// Dans film.model.js
const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    // Autres champs selon vos besoins
});

module.exports = mongoose.model('Film', filmSchema);
