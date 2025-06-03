const Carosel = require("../models/caroselModel");

const caroselControllers = {
    getAllCarousel: (req, res) =>{
        Carosel.carouselAll((err, results) => {
            if (err) {
                console.error('Error fetching carousels:', err);
                return res.status(500).json({ error: 'Failed to fetch carousels' });
            }
            res.json({
                success: true,
                data: results,
                count: results.length
            });
        });
    },

    getAllCarouselFilms: (req, res) => {
        Carosel.getAllFilms((err, results) => {
            if (err) {
                console.error('Error fetching carousels:', err);
                return res.status(500).json({ error: 'Failed to fetch carousels' });
            }
            res.json({
                success: true,
                data: results,
                count: results.length
            });
        });
    },

    getAllCarouselMusic: (req, res) => {
        Carosel.getAllMusic((err, results) => {
            if (err) {
                console.error('Error fetching carousels:', err);
                return res.status(500).json({ error: 'Failed to fetch carousels' });
            }
            res.json({
                success: true,
                data: results,
                count: results.length
            });
        });
    },

};

module.exports = caroselControllers;