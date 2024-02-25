// Dans le fichier user.model.js

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    profileNumber: {
        type: Number,
        required: true,
        unique: true
    },
    // Autres champs à ajouter selon tes besoins
});

module.exports = mongoose.model('User', userSchema);
