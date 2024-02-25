const AnnonceModel = require('../models/annonce.model');
const Annonce = require("../models/annonce.model");

// On va exporter une méthode liée aux annonces qu'on pourra réutiliser par la suite
// Sans faire appel à l'ensemble du controlleur
module.exports.getAnnonces = async (req, res) => {
    const {price, text, author} = req.query;

    let filter = {}
    if(!isNaN(price)){
        filter.price = {$gte: price};
    }

    if(text){
        filter.$or = [
            {title: new RegExp(text, 'i')},
            {description: new RegExp(text, 'i')}
        ];
    }

    if(author){
        filter.author = new RegExp(author, 'i');
    }

    let data = {};

    data.annonces = await AnnonceModel.find(filter);;
    data.message = "Récupération des données";

    res.status(200).json(data);

}

module.exports.setAnnonce = async (req, res) => {
    // On créé une nouvelle annonce avec les données reçues dans le corps de la requête
    const annonce = new Annonce({
        ...req.body
    });
    // On sauvegarde sur notre base MongoDB tout en gérant les retours possibles (success => then, error => catch)
    annonce.save()
        .then(() => res.json({message: "Annonce créée avec succès"}))
        .catch(() => res.json({message: "Erreur avec la création des annonces"}));
}