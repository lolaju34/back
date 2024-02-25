const express = require('express');
const path = require('path');
const cors = require('cors');
const port = 3000;
const app = express();
const connectDB = require('./config/db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (request, response) => {
    response.sendFile(path.resolve('./frontend/index.html'));
});

app.get('/dire-bonjour/:firstname', (req, res) => {
    res.send(`Bonjour ${req.params.firstname}`);
});

// Utilisez les routeurs pour les API
app.use('/api', require('./routes/api/annonce.routes.js'));
// Ajoutez le routeur pour les films
app.use('/api/films', require('./routes/api/film.routes.js'));

app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port}`);
});
