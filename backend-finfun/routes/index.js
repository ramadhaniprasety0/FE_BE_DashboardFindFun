const express = require('express');
const authController = require('../controllers/authControllers');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

const albumControllers = require('../controllers/albumControllers');
const filmControllers = require('../controllers/filmControllers');
const musicControllers = require('../controllers/musicControllers');
const artistControllers = require('../controllers/artistControllers');

const caroselControllers = require('../controllers/caroselControllers');

// Basic middleware for logging
router.use((req, res, next) => {
  console.log(`API Request: ${req.method} ${req.originalUrl}`);
  next();
});

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// ===== Dashboard ROUTES =====
router.post('/login', authController.login);
router.post('/register', authController.register);

// ==== ROUTE DASHBOARD (PROTEKSI) ====
router.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: 'Berhasil masuk ke Dashboard!' });
});

// ==== ROUTE Carousel ====
router.get('/carousel/all', caroselControllers.getAllCarousel);


// ===== ALBUM ROUTES =====
router.get('/albums', albumControllers.getAll);
router.get('/albums/:id', albumControllers.getById);
router.post('/albums', albumControllers.create);
router.put('/albums/:id', albumControllers.update);
router.delete('/albums/:id', albumControllers.delete);

// ===== FILM ROUTES =====
router.get('/films', filmControllers.getAll);
router.get('/films/:id', filmControllers.getById);
router.post('/films', upload.single('image'), filmControllers.create); 
router.put('/films/:id', upload.single('image'), filmControllers.update);
router.delete('/films/:id', filmControllers.delete);
router.get('/films/search', filmControllers.search); // ?q=searchTerm
router.get('/films/genre/:genre', filmControllers.getByGenre);

// ===== MUSIC ROUTES =====
router.get('/music', musicControllers.getAll); // ?include=all|artists|albums
router.get('/music/:id', musicControllers.getById); // ?include=all
router.post('/music', upload.single('image'), musicControllers.create);
router.put('/music/:id', upload.single('image'), musicControllers.update);
router.delete('/music/:id', musicControllers.delete);
router.get('/music/search', musicControllers.search); // ?q=searchTerm
router.get('/music/genre/:genre', musicControllers.getByGenre);

// ===== ARTIST ROUTES =====
router.get('/artists', artistControllers.getAll);
router.get('/artists/:id', artistControllers.getById);
router.post('/artists', artistControllers.create);
router.put('/artists/:id', artistControllers.update);
router.delete('/artists/:id', artistControllers.delete);
router.get('/artists/search', artistControllers.search); // ?q=searchTerm
router.get('/artists/genre/:genre', artistControllers.getByGenre);
router.get('/artists/country/:country', artistControllers.getByCountry);
router.get('/artists/:id/music', artistControllers.getArtistMusic);

// ===== MUSIC-ALBUMS RELATION ROUTES =====
router.post('/music-albums', musicControllers.addMusicToAlbum);
router.delete('/music-albums/:musicId/:albumId', musicControllers.removeMusicFromAlbum);
router.get('/albums/:albumId/music', musicControllers.getMusicInAlbum);
router.get('/music/:musicId/albums', musicControllers.getAlbumsForMusic);
router.put('/music/:musicId/albums', musicControllers.setAlbumsForMusic);

// ===== MUSIC-ARTISTS RELATION ROUTES =====
router.post('/music-artists', musicControllers.addMusicToArtist);
router.delete('/music-artists/:musicId/:artistId', musicControllers.removeMusicFromArtist);
router.get('/artists/:artistId/music', musicControllers.getMusicByArtist);
router.get('/music/:musicId/artists', musicControllers.getArtistsForMusic);
router.put('/music/:musicId/artists', musicControllers.setArtistsForMusic);

// ===== COMPLETE DATA ROUTES =====
router.get('/music/:musicId/complete', musicControllers.getMusicComplete);
router.get('/albums/:albumId/complete', musicControllers.getAlbumComplete);


// ===== UTILITY ROUTES =====
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

router.get('/info', (req, res) => {
  res.json({
    name: 'FindFun API',
    version: '1.0.0',
    description: 'API for managing albums, films, music, and artists with relations',
    endpoints: {
      albums: [
        'GET /api/albums',
        'GET /api/albums/:id',
        'POST /api/albums',
        'PUT /api/albums/:id',
        'DELETE /api/albums/:id'
      ],
      films: [
        'GET /api/films',
        'GET /api/films/:id',
        'POST /api/films',
        'PUT /api/films/:id',
        'DELETE /api/films/:id',
        'GET /api/films/search?q=term',
        'GET /api/films/genre/:genre'
      ],
      music: [
        'GET /api/music?include=all|artists|albums',
        'GET /api/music/:id?include=all',
        'POST /api/music',
        'PUT /api/music/:id',
        'DELETE /api/music/:id',
        'GET /api/music/search?q=term',
        'GET /api/music/genre/:genre'
      ],
      artists: [
        'GET /api/artists',
        'GET /api/artists/:id',
        'POST /api/artists',
        'PUT /api/artists/:id',
        'DELETE /api/artists/:id',
        'GET /api/artists/search?q=term',
        'GET /api/artists/genre/:genre',
        'GET /api/artists/country/:country',
        'GET /api/artists/:id/music'
      ],
      relations: [
        'POST /api/music-albums',
        'DELETE /api/music-albums/:musicId/:albumId',
        'GET /api/albums/:albumId/music',
        'GET /api/music/:musicId/albums',
        'PUT /api/music/:musicId/albums',
        'POST /api/music-artists',
        'DELETE /api/music-artists/:musicId/:artistId',
        'GET /api/artists/:artistId/music',
        'GET /api/music/:musicId/artists',
        'PUT /api/music/:musicId/artists'
      ],
      complete: [
        'GET /api/music/:musicId/complete',
        'GET /api/albums/:albumId/complete'
      ]
    }
  });
});

module.exports = router;