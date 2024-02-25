// user.routes.js

const express = require('express');
const router = express.Router();
const { createUserProfile } = require('../../controllers/user.controller');

// Création d'une route pour créer un profil utilisateur
router.post('/user/profile', createUserProfile);

module.exports = router;
