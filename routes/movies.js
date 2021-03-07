const express = require('express');
const router = express.Router();
const Movie = require('../models/movie.js');

router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);


    } catch (error) {
        res.status(500).json({ message: error })
    }

});

router.get('/:id', getMovie, (req, res) => {
    res.json(res.movie);

});

router.post('/', async (req, res) => {
    const movie = new Movie({
        movieDirector: req.body.moviesDirector,
        movieTitle: req.body.movieTitle,
    });
    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(400).json({ message: error.message })

    }

});


router.put('/:id', getMovie, async (req, res) => {

    if (req.body.movieTitle != null) {
        res.movie.movieTitle = req.body.movieTitle
    }
    if (req.body.movieDirector != null) {
        res.movie.movieDirector = req.body.movieDirector
    }

    try {
        const updatedMovie = await res.movie.save();
        res.json(updatedMovie);
        res.status(400).json({ message: 'movie not updated ' })
    } catch (error) {

    }

});

router.delete('/:id', getMovie, async (req, res) => {
    try {
        await res.movie.remove();
        res.json({ message: `deleted movie: ${res.movie.movieTitle}` })
    } catch (error) {
        res.status(500).json({ message: 'could not find ' })
    }

});

router.patch('/:id', getMovie, async (req, res) => {

    if (req.body.movieTitle != null) {
        res.movie.movieTitle = req.body.movieTitle
    }
    if (req.body.movieDirector != null) {
        res.movie.movieDirector = req.body.movieDirector
    }

    try {
        const updatedMovie = await res.movie.save();
        res.json(updatedMovie);
        res.status(400).json({ message: 'movie not updated ' })
    } catch (error) {

    }

});

async function getMovie(req, res, next) {
    let movie;
    try {
        movie = await Movie.findById(req.params.id)

        if (movie == null) {
            return res.status(404).json({ message: 'Cannot find movie.' })

        }
    } catch (error) {
        res.status(500).json({ message: 'the id selected was not found.' })
    }
    res.movie = movie;
    next();

};

module.exports = router;
