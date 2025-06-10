const db = require('../db');

const Ulasan = {

    getAll: (callback) => {
        const query = 'SELECT * FROM ulasan';
        db.query(query, callback);
    },

    getById: (id, callback) => {
        const query = `SELECT 
    ulasan.*,
    films.title,
    films.image_poster,
    users.username AS nama
    FROM ulasan
    JOIN films ON ulasan.film_id = films.id
    JOIN users ON ulasan.user_id = users.id
    WHERE 
    ulasan.film_id = ?;`;
        db.query(query, [id], callback);
    },

    create: (ulasan, callback) => {
        const { 
            user_id, film_id, alur_review, sinematografi_review, pemeran_review,
            review_lain, kategori, rating, like_ulasan, dislike_ulasan
        } = ulasan;
        const query = `INSERT INTO ulasan (
            user_id, film_id, alur_review, sinematografi_review, pemeran_review,
            review_lain, kategori, rating, like_ulasan, dislike_ulasan
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(query, [
            user_id, film_id, alur_review, sinematografi_review, pemeran_review,
            review_lain, kategori, rating, like_ulasan || 0, dislike_ulasan || 0
        ], callback);
    }
};

module.exports = Ulasan;