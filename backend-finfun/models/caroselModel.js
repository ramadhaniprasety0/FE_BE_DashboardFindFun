const db = require('../db');

const Carosel = {
    carouselAll: (callback) => {
        db.query('SELECT * FROM carousel_items', callback);
    },

    carouselFilms: (callback) => {
        db.query('SELECT * FROM carousel_items WHERE status = 1', callback);
    },

    carouselMusics: (callback) => {
        db.query('SELECT * FROM carousel_items WHERE status = 2', callback);
    },

    carouselKonser: (callback) => {
        db.query('SELECT * FROM carousel_items WHERE status = 3', callback);
    },
}

module.exports = Carosel;