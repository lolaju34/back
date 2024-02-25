// On va utilise mongoose pour gérer notre base de données mongoDB
const mongoose = require('mongoose');

// On créé la structure (le modèle) de notre annonce.
const annonceSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
    }
);

// On oublie pas d'exporter le module pour le réutiliser en 
// spécifiant qu'il s'agit d'un modèle mongoose ce qui permettra
// d'intéragir facilement avec la BDD
module.exports = mongoose.model('Annonces', annonceSchema);