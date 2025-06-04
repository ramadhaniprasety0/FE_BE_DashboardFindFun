const db = require('../db');

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.APP_URL || `http://localhost:${PORT}`;

const transformImagePath = (imagePathFromDB) => {
  if (!imagePathFromDB) return null;
  if (imagePathFromDB.startsWith('http://') || imagePathFromDB.startsWith('https://')) {
    return imagePathFromDB;
  }
  if (imagePathFromDB.startsWith('uploads/')) {
    return `${BASE_URL}/${imagePathFromDB}`;
  }
  return `${BASE_URL}/uploads/${imagePathFromDB}`;
};

const PopularMusicModel = {
  getAll: (callback) => {
    const query = `
      SELECT
        m.*, 
        GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS artist
      FROM
        music m
      LEFT JOIN
        music_artists ma ON m.id = ma.music_id
      LEFT JOIN
        artists a ON ma.artist_id = a.id
      GROUP BY
        m.id 
      ORDER BY
        m.title ASC;
    `;

    db.query(query, (err, results) => {
      if (err) return callback(err);
      const transformed = results.map(item => ({
        ...item,
        image: transformImagePath(item.image)
      }));
      callback(null, transformed);
    });
  },

  getById: (id, callback) => {
    const query = `
      SELECT
        m.*, 
        GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS artist
      FROM
        music m
      LEFT JOIN
        music_artists ma ON m.id = ma.music_id
      LEFT JOIN
        artists a ON ma.artist_id = a.id
      WHERE
        m.id = ?
      GROUP BY
        m.id; 
    `;

    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) return callback(null, undefined);

      const item = results[0];
      const transformed = {
        ...item,
        image: transformImagePath(item.image)
      };
      callback(null, transformed);
    });
  },

  getLatest: (limit, callback) => {
    const query = `
      SELECT 
        m.id, 
        m.title, 
        m.image, 
        GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS artist 
      FROM music_artists ma
      INNER JOIN music m ON ma.music_id = m.id
      INNER JOIN artists a ON ma.artist_id = a.id
      GROUP BY m.id, m.title, m.image
      ORDER BY m.id DESC 
      LIMIT ?;
    `;

    db.query(query, [parseInt(limit, 10)], (err, results) => {
      if (err) return callback(err);
      const transformed = results.map(item => ({
        id: item.id,
        title: item.title,
        artist: item.artist,
        image: transformImagePath(item.image)
      }));
      callback(null, transformed);
    });
  }
};

module.exports = PopularMusicModel;
