// Dans le fichier annonce.routes.js

const express = require('express');
const router = express.Router();
const { getAnnonces, setAnnonce } = require('../../controllers/annonce.controller');

// Importer le contrôleur pour les profils utilisateur
const { createUserProfile } = require('../../controllers/user.controller');


// Création d'une route pour afficher les annonces
router.get('/annonce', getAnnonces);

// Création d'une route pour créer une annonce
router.post('/annonce', setAnnonce);

// Création d'une route pour créer un profil utilisateur
router.post('/user/profile', createUserProfile);

module.exports = router;
