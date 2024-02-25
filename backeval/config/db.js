const mongoose = require('mongoose');

// On se connecte à la base de données en gérant les retours possibles 
// via une promesse JS (success -> then, error -> catch)
const connectDB = mongoose.connect("mongodb+srv://yohan-volcamedia:Yohan123456789@dcmtp.rctam5q.mongodb.net/DC2")
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch((err) => console.log('Connexion à MongoDB échouée !',err));

module.exports = connectDB;