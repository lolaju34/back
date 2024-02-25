const axios = require('axios');

exports.generateRandomFilms = async (req, res) => {
    try {
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTYyY2IzNDU2OWY1MzliYTcwNWZiNzQ3M2M5ZTk4MCIsInN1YiI6IjY1ZGI4YzgwODI2MWVlMDE4NWMzM2UwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k2o1__Jfxmj5OOrg5zYKX0qqquJKL_rTOnEXwrm8B5E'
            }
        };

        const response = await axios.get('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&include_adult=false', options);
        const films = response.data.results.map(movie => ({
            title: movie.title,
            genre: movie.genre_ids.length > 0 ? "Genre ID: " + movie.genre_ids[0] : "Unknown"
        }));

        res.json(films);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la génération des films aléatoires", error: error.message });
    }
};

// Définition de la nouvelle fonction pour trier les films par nom
exports.sortFilmsByName = async (req, res) => {
    try {
        // Options de la requête HTTP
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTYyY2IzNDU2OWY1MzliYTcwNWZiNzQ3M2M5ZTk4MCIsInN1YiI6IjY1ZGI4YzgwODI2MWVlMDE4NWMzM2UwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k2o1__Jfxmj5OOrg5zYKX0qqquJKL_rTOnEXwrm8B5E'
            }
        };

        // Effectuer une requête GET à l'API TMDb pour obtenir une liste de films
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&include_adult=false', options);
        
        // Extraire la liste de films de la réponse
        const films = response.data.results;

        // Trier les films par nom
        const sortedFilms = films.sort((a, b) => a.title.localeCompare(b.title));

        // Renvoyer la liste des films triés par nom
        res.json(sortedFilms);
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse avec le code d'erreur 500
        res.status(500).json({ message: "Erreur lors du tri des films par nom", error: error.message });
    }
};

// Définition de la nouvelle fonction pour trier les films par genre
exports.sortFilmsByGenre = async (req, res) => {
    try {
        // Options de la requête HTTP
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTYyY2IzNDU2OWY1MzliYTcwNWZiNzQ3M2M5ZTk4MCIsInN1YiI6IjY1ZGI4YzgwODI2MWVlMDE4NWMzM2UwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k2o1__Jfxmj5OOrg5zYKX0qqquJKL_rTOnEXwrm8B5E'
            }
        };

        // Effectuer une requête GET à l'API TMDb pour obtenir une liste de films
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&include_adult=false', options);
        
        // Extraire la liste de films de la réponse
        const films = response.data.results;

        // Fonction pour obtenir tous les genres uniques
        const getAllGenres = () => {
            const allGenres = new Set();
            films.forEach(movie => {
                movie.genre_ids.forEach(genreId => {
                    allGenres.add(genreId);
                });
            });
            return allGenres;
        };

        // Mapper les IDs de genre à leurs noms correspondants
        const genreMap = {
            28: 'Action',
            12: 'Adventure',
            16: 'Animation',
            35: 'Comedy',
            80: 'Crime',
            99: 'Documentary',
            18: 'Drama',
            10751: 'Family',
            14: 'Fantasy',
            36: 'History',
            27: 'Horror',
            10402: 'Music',
            9648: 'Mystery',
            10749: 'Romance',
            878: 'Science Fiction',
            10770: 'TV Movie',
            53: 'Thriller',
            10752: 'War',
            37: 'Western'
        };

        // Créer un objet pour stocker les films triés par genre
        const filmsByGenre = {};

        // Parcourir tous les genres uniques
        const allGenres = getAllGenres();
        allGenres.forEach(genreId => {
            const genreName = genreMap[genreId] || 'Unknown';
            filmsByGenre[genreName] = films.filter(movie => movie.genre_ids.includes(genreId)).map(movie => ({
                title: movie.title,
                genre: genreName
            }));
        });

        // Renvoyer la liste des films triés par genre
        res.json(filmsByGenre);
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse avec le code d'erreur 500
        res.status(500).json({ message: "Erreur lors du tri des films par genre", error: error.message });
    }
};

exports.sortFilmsByRating = async (req, res) => {
    try {
        // Options de la requête HTTP
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTYyY2IzNDU2OWY1MzliYTcwNWZiNzQ3M2M5ZTk4MCIsInN1YiI6IjY1ZGI4YzgwODI2MWVlMDE4NWMzM2UwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k2o1__Jfxmj5OOrg5zYKX0qqquJKL_rTOnEXwrm8B5E'
            }
        };

        // Effectuer une requête GET à l'API TMDb pour obtenir une liste de films triés par note décroissante
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&include_adult=false', options);
        
        // Extraire la liste de films de la réponse
        const films = response.data.results;

        // Récupérer uniquement le titre du film et sa note
        const ratedFilms = films.map(movie => ({
            title: movie.title,
            rating: movie.vote_average
        }));

        // Renvoyer la liste des films triés par note
        res.json(ratedFilms);
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse avec le code d'erreur 500
        res.status(500).json({ message: "Erreur lors du tri des films par note", error: error.message });
    }
};

exports.sortFilmsByLowestRating = async (req, res) => {
    try {
        // Options de la requête HTTP
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTYyY2IzNDU2OWY1MzliYTcwNWZiNzQ3M2M5ZTk4MCIsInN1YiI6IjY1ZGI4YzgwODI2MWVlMDE4NWMzM2UwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k2o1__Jfxmj5OOrg5zYKX0qqquJKL_rTOnEXwrm8B5E'
            }
        };

        // Effectuer une requête GET à l'API TMDb pour obtenir une liste de films triés par note croissante
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.asc&include_adult=false', options);
        
        // Extraire la liste de films de la réponse
        const films = response.data.results;

        // Récupérer uniquement le titre du film et sa note
        const ratedFilms = films.map(movie => ({
            title: movie.title,
            rating: movie.vote_average
        }));

        // Renvoyer la liste des films triés par note croissante
        res.json(ratedFilms);
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse avec le code d'erreur 500
        res.status(500).json({ message: "Erreur lors du tri des films par note", error: error.message });
    }
};

exports.sortFilmsByMostViewed = async (req, res) => {
    try {
        // Options de la requête HTTP
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTYyY2IzNDU2OWY1MzliYTcwNWZiNzQ3M2M5ZTk4MCIsInN1YiI6IjY1ZGI4YzgwODI2MWVlMDE4NWMzM2UwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k2o1__Jfxmj5OOrg5zYKX0qqquJKL_rTOnEXwrm8B5E'
            }
        };

        // Effectuer une requête GET à l'API TMDb pour obtenir une liste de films triés par popularité décroissante
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&include_adult=false', options);
        
        // Extraire la liste de films de la réponse
        const films = response.data.results;

        // Récupérer uniquement le titre du film et le nombre de vues
        const viewedFilms = films.map(movie => ({
            title: movie.title,
            views: movie.popularity
        }));

        // Renvoyer la liste des films triés par popularité décroissante
        res.json(viewedFilms);
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse avec le code d'erreur 500
        res.status(500).json({ message: "Erreur lors du tri des films par popularité", error: error.message });
    }
};

