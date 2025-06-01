const db = require('../db');

const Film = {
  getAll: (callback) => {
    db.query('SELECT * FROM films ORDER BY created_at DESC', callback);
  },
  
  getById: (id, callback) => {
    db.query('SELECT * FROM films WHERE id = ?', [id], callback);
  },
  
  create: (film, callback) => {
    const { 
      title, deskripsi, release_year, rating, genre, duration, image, 
      actor, director, status_film, netflix_link, appletv_link, 
      hbogo_link, bioskop_link, like_user, dislike 
    } = film;
    
    const query = `INSERT INTO films (
      title, deskripsi, release_year, rating, genre, duration, image, 
      actor, director, status_film, netflix_link, appletv_link, 
      hbogo_link, bioskop_link, like_user, dislike
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.query(query, [
      title, deskripsi, release_year, rating, genre, duration, image,
      actor, director, status_film, netflix_link, appletv_link,
      hbogo_link, bioskop_link, like_user || 0, dislike || 0
    ], callback);
  },
  
  update: (id, film, callback) => {
    const { 
      title, deskripsi, release_year, rating, genre, duration, image, 
      actor, director, status_film, netflix_link, appletv_link, 
      hbogo_link, bioskop_link, like_user, dislike 
    } = film;
    
    const query = `UPDATE films SET 
      title=?, deskripsi=?, release_year=?, rating=?, genre=?, duration=?, image=?, 
      actor=?, director=?, status_film=?, netflix_link=?, appletv_link=?, 
      hbogo_link=?, bioskop_link=?, like_user=?, dislike=?, updated_at=CURRENT_TIMESTAMP 
      WHERE id=?`;
    
    db.query(query, [
      title, deskripsi, release_year, rating, genre, duration, image,
      actor, director, status_film, netflix_link, appletv_link,
      hbogo_link, bioskop_link, like_user, dislike, id
    ], callback);
  },
  
  delete: (id, callback) => {
    db.query('DELETE FROM films WHERE id = ?', [id], callback);
  },

  // Search films by title or genre
  search: (searchTerm, callback) => {
    const query = 'SELECT * FROM films WHERE title LIKE ? OR genre LIKE ? ORDER BY created_at DESC';
    const searchPattern = `%${searchTerm}%`;
    db.query(query, [searchPattern, searchPattern], callback);
  },

  // Get films by genre
  getByGenre: (genre, callback) => {
    db.query('SELECT * FROM films WHERE genre = ? ORDER BY created_at DESC', [genre], callback);
  }
};

module.exports = Film;