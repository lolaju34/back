const express = require('express');
const router = express.Router();
const filmController = require('../../controllers/film.controller');

// Nouvelle route pour générer des films aléatoires
router.get('/generate', filmController.generateRandomFilms);
router.get('/sortByName', filmController.sortFilmsByName);
router.get('/sortByGenre', filmController.sortFilmsByGenre);
router.get('/sortByRating', filmController.sortFilmsByRating);
router.get('/sortByLowestRating', filmController.sortFilmsByLowestRating);
router.get('/sortByMostViewed', filmController.sortFilmsByMostViewed);

module.exports = router;

