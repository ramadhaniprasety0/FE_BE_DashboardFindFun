const PopularMusic = require('../models/popularMusicModel');

const popularMusicController = {
  getAllPopularMusic: (req, res) => {
    PopularMusic.getAll((err, results) => {
      if (err) {
        console.error('Error fetching popular music:', err);
        return res.status(500).json({ error: 'Gagal mengambil daftar musik populer' });
      }

      const transformed = results.map(music => ({
        ...music,
        genre: music.genre
          ? (typeof music.genre === 'string' ? JSON.parse(music.genre) : music.genre)
          : [],
      }));

      res.json({
        success: true,
        data: transformed,
        count: transformed.length
      });
    });
  },

  getPopularMusicById: (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      return res.status(400).json({ message: 'ID musik tidak valid.' });
    }

    PopularMusic.getById(parsedId, (err, result) => {
      if (err) {
        console.error(`Error fetching music by ID (${id}):`, err);
        return res.status(500).json({ error: 'Gagal mengambil detail musik' });
      }

      if (!result) {
        return res.status(404).json({ message: 'Lagu tidak ditemukan.' });
      }

      const transformed = {
        ...result,
        genre: result.genre
          ? (typeof result.genre === 'string' ? JSON.parse(result.genre) : result.genre)
          : [],
      };

      res.json({
        success: true,
        data: transformed
      });
    });
  },

  getLatestPopularMusic: (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
    if (isNaN(limit) || limit <= 0) {
      return res.status(400).json({ message: 'Parameter limit tidak valid.' });
    }

    PopularMusic.getLatest(limit, (err, results) => {
      if (err) {
        console.error('Error fetching latest popular music:', err);
        return res.status(500).json({ error: 'Gagal mengambil musik terbaru' });
      }

      res.json({
        success: true,
        data: results,
        count: results.length
      });
    });
  }
};

module.exports = popularMusicController;
