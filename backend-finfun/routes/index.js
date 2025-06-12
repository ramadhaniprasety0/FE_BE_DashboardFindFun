const express = require("express");
const authController = require("../controllers/authControllers");
const {
  authenticateToken,
  isAdmin,
  isUser,
} = require("../middleware/authMiddleware");
const router = express.Router();

const albumControllers = require("../controllers/albumControllers");
const filmControllers = require("../controllers/filmControllers");
const musicControllers = require("../controllers/musicControllers");
const ulasanControllers = require("../controllers/ulasanControllers");
const artistControllers = require("../controllers/artistControllers");
const popularMusicControllers = require("../controllers/popularMusicController");
const caroselControllers = require("../controllers/caroselControllers");

// Basic middleware for logging
router.use((req, res, next) => {
  console.log(`API Request: ${req.method} ${req.originalUrl}`);
  next();
});

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const uploadartist = multer({ dest: "uploads/artists/" });
const uploadalbum = multer({ dest: "uploads/albums/" });
const uploadcarousel = multer({ dest: "uploads/carousel_image/" });
const uploadFilm = multer({ dest: "uploads/films/" });
const uploadPayment = multer({ dest: "uploads/payment/" });

// ===== AUTH ROUTES =====
router.post("/login", authController.login);
router.post("/register", authController.register);

// ==== ADMIN ROUTES (PROTECTED) ====
router.get("/admin/dashboard", authenticateToken, isAdmin, (req, res) => {
  res.json({ message: "Berhasil masuk ke Dashboard Admin!" });
});

// Endpoint untuk membuat admin baru (hanya bisa diakses oleh admin)
router.post(
  "/admin/create",
  authenticateToken,
  isAdmin,
  authController.createAdmin
);

// ==== USER DASHBOARD ROUTE (PROTECTED) ====
router.get("/user/dashboard", authenticateToken, isUser, (req, res) => {
  res.json({ message: "Berhasil masuk ke Dashboard User!" });
});

// ==== ROUTE Carousel ====
// Public endpoints
router.get("/carousel/all", caroselControllers.getCarousel);
router.get("/carousel", caroselControllers.getAllCarousel);
router.get("/carousel/:id", caroselControllers.getCarouselById);

// Admin only operations
router.put(
  "/carousel/status/:id",
  authenticateToken,
  isAdmin,
  caroselControllers.updateStatus
);
router.put(
  "/carousel/:id",
  authenticateToken,
  isAdmin,
  uploadcarousel.fields([
    { name: "image", maxCount: 1 },
    { name: "titleImage", maxCount: 1 },
  ]),
  caroselControllers.update
);
router.post(
  "/carousel",
  authenticateToken,
  isAdmin,
  uploadcarousel.fields([
    { name: "image", maxCount: 1 },
    { name: "titleImage", maxCount: 1 },
  ]),
  caroselControllers.create
);
router.delete(
  "/carousel/:id",
  authenticateToken,
  isAdmin,
  caroselControllers.delete
);

// ===== ALBUM ROUTES =====
router.get("/albums", albumControllers.getAll);
router.get("/albums/:id", albumControllers.getById);
// Admin only operations
router.post(
  "/albums",
  authenticateToken,
  isAdmin,
  uploadalbum.single("image"),
  albumControllers.create
);
router.put(
  "/albums/:id",
  authenticateToken,
  isAdmin,
  uploadalbum.single("image"),
  albumControllers.update
);
router.delete(
  "/albums/:id",
  authenticateToken,
  isAdmin,
  albumControllers.delete
);

// ===== FILM ROUTES =====
// Public endpoints
router.get("/films", filmControllers.getAll);
router.get("/films/:id", filmControllers.getById);
router.get("/films/bioskop/:id", filmControllers.getAllBioskop);
router.get("/films/:id/tiket", filmControllers.getAllTiket);
router.get("/tikets/bioskop", filmControllers.getAllTikets);
router.get("/films/seats/:id", filmControllers.getAllSeat);
router.get("/films/:id/tiket/price", filmControllers.getHargaTicket);
router.get("/films/:id/schedule/:locationId", filmControllers.getScheduleFilm);
router.get("/films/:id/cinema", filmControllers.getCinemaLocation);
router.get("/films/search", filmControllers.search); // ?q=searchTerm
router.get("/films/genre/:genre", filmControllers.getByGenre);

// Endpoint pembelian tiket hanya bisa diakses oleh user yang sudah login
router.post(
  "/films/beli/tiket",
  authenticateToken,
  isUser,
  filmControllers.buyTicket
);
router.get(
  "/film-payment/:id/schedule/:schedule_id",
  authenticateToken,
  isUser,
  filmControllers.getTikets
);
router.put(
  "/films/:id/tiket-payment",
  authenticateToken,
  isUser,
  uploadPayment.single("image"),
  filmControllers.updatePayTiket
);

// Admin only operations
router.post(
  "/films",
  authenticateToken,
  isAdmin,
  uploadFilm.fields([
    { name: "image", maxCount: 1 },
    { name: "posterImage", maxCount: 1 },
  ]),
  filmControllers.create
);
router.put(
  "/films/:id",
  authenticateToken,
  isAdmin,
  uploadFilm.fields([
    { name: "image", maxCount: 1 },
    { name: "posterImage", maxCount: 1 },
  ]),
  filmControllers.update
);
router.delete("/films/:id", authenticateToken, isAdmin, filmControllers.delete);

// ===== MUSIC ROUTES =====
// Public endpoints
router.get("/music", musicControllers.getAll); // ?include=all|artists|albums
router.get("/music/:id", musicControllers.getById); // ?include=all
router.get("/music/search", musicControllers.search); // ?q=searchTerm
router.get("/music/genre/:genre", musicControllers.getByGenre);
router.get("/popular-latest", popularMusicControllers.getLatestPopularMusic);
router.get("/popular/:id", popularMusicControllers.getPopularMusicById);

// Admin only operations
router.post(
  "/music",
  authenticateToken,
  isAdmin,
  upload.single("image"),
  musicControllers.create
);
router.put(
  "/music/:id",
  authenticateToken,
  isAdmin,
  upload.single("image"),
  musicControllers.update
);
router.delete(
  "/music/:id",
  authenticateToken,
  isAdmin,
  musicControllers.delete
);

// ===== ULASAN ROUTES =====
// Public endpoints
router.get("/ulasan", ulasanControllers.getAll);
router.get("/ulasan/:id", ulasanControllers.getById);
router.get("/ulasan/film/:filmId", ulasanControllers.getByFilmId);
router.get("/ulasan/music/:musicId", ulasanControllers.getByMusicId);
router.get("/ulasan/album/:albumId", ulasanControllers.getByAlbumId);
router.get("/ulasan/user/:userId", ulasanControllers.getByUserId);

// User only operations (must be logged in)
router.post("/ulasan", authenticateToken, isUser, ulasanControllers.create);
router.put("/ulasan/:id", authenticateToken, isUser, ulasanControllers.update);
router.delete(
  "/ulasan/:id",
  authenticateToken,
  isUser,
  ulasanControllers.delete
);

// ===== ARTIST ROUTES =====
// Public endpoints
router.get("/artists", artistControllers.getAll);
router.get("/artists/:id", artistControllers.getById);
router.get("/artists/search", artistControllers.search); // ?q=searchTerm
router.get("/artists/genre/:genre", artistControllers.getByGenre);
router.get("/artists/country/:country", artistControllers.getByCountry);
router.get("/artists/:id/music", artistControllers.getArtistMusic);

// Admin only operations
router.post(
  "/artists",
  authenticateToken,
  isAdmin,
  uploadartist.single("image"),
  artistControllers.create
);
router.put(
  "/artists/:id",
  authenticateToken,
  isAdmin,
  uploadartist.single("image"),
  artistControllers.update
);
router.delete(
  "/artists/:id",
  authenticateToken,
  isAdmin,
  artistControllers.delete
);

// ===== FILM-ARTISTS RELATION ROUTES =====
router.get("/films/:filmId/artists", filmControllers.getArtistsForFilm);

// ===== MUSIC-ALBUMS RELATION ROUTES =====
// Public endpoints
router.get("/albums/:albumId/music", musicControllers.getMusicInAlbum);
router.get("/music/:musicId/albums", musicControllers.getAlbumsForMusic);

// Admin only operations
router.post(
  "/music-albums",
  authenticateToken,
  isAdmin,
  musicControllers.addMusicToAlbum
);
router.delete(
  "/music-albums/:musicId/:albumId",
  authenticateToken,
  isAdmin,
  musicControllers.removeMusicFromAlbum
);
router.put(
  "/music/:musicId/albums",
  authenticateToken,
  isAdmin,
  musicControllers.setAlbumsForMusic
);

// ===== MUSIC-ARTISTS RELATION ROUTES =====
// Public endpoints
router.get("/artists/:artistId/music", musicControllers.getMusicByArtist);
router.get("/music/:musicId/artists", musicControllers.getArtistsForMusic);

// Admin only operations
router.post(
  "/music-artists",
  authenticateToken,
  isAdmin,
  musicControllers.addMusicToArtist
);
router.delete(
  "/music-artists/:musicId/:artistId",
  authenticateToken,
  isAdmin,
  musicControllers.removeMusicFromArtist
);
router.put(
  "/music/:musicId/artists",
  authenticateToken,
  isAdmin,
  musicControllers.setArtistsForMusic
);

// ===== COMPLETE DATA ROUTES =====
router.get("/music/:musicId/complete", musicControllers.getMusicComplete);
router.get("/albums/:albumId/complete", musicControllers.getAlbumComplete);

// ===== UTILITY ROUTES =====
router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

router.get("/info", (req, res) => {
  res.json({
    name: "FindFun API",
    version: "1.0.0",
    description:
      "API for managing albums, films, music, and artists with relations",
    endpoints: {
      albums: [
        "GET /api/albums",
        "GET /api/albums/:id",
        "POST /api/albums",
        "PUT /api/albums/:id",
        "DELETE /api/albums/:id",
      ],
      films: [
        "GET /api/films",
        "GET /api/films/:id",
        "POST /api/films",
        "PUT /api/films/:id",
        "DELETE /api/films/:id",
        "GET /api/films/search?q=term",
        "GET /api/films/genre/:genre",
      ],
      music: [
        "GET /api/music?include=all|artists|albums",
        "GET /api/music/:id?include=all",
        "POST /api/music",
        "PUT /api/music/:id",
        "DELETE /api/music/:id",
        "GET /api/music/search?q=term",
        "GET /api/music/genre/:genre",
      ],
      artists: [
        "GET /api/artists",
        "GET /api/artists/:id",
        "POST /api/artists",
        "PUT /api/artists/:id",
        "DELETE /api/artists/:id",
        "GET /api/artists/search?q=term",
        "GET /api/artists/genre/:genre",
        "GET /api/artists/country/:country",
        "GET /api/artists/:id/music",
      ],
      relations: [
        "POST /api/music-albums",
        "DELETE /api/music-albums/:musicId/:albumId",
        "GET /api/albums/:albumId/music",
        "GET /api/music/:musicId/albums",
        "PUT /api/music/:musicId/albums",
        "POST /api/music-artists",
        "DELETE /api/music-artists/:musicId/:artistId",
        "GET /api/artists/:artistId/music",
        "GET /api/music/:musicId/artists",
        "PUT /api/music/:musicId/artists",
      ],
      complete: [
        "GET /api/music/:musicId/complete",
        "GET /api/albums/:albumId/complete",
      ],
    },
  });
});

module.exports = router;
