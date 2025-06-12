-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for findfun_db
CREATE DATABASE IF NOT EXISTS `findfun_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `findfun_db`;

-- Dumping structure for table findfun_db.albums
CREATE TABLE IF NOT EXISTS `albums` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `release_year` int NOT NULL,
  `artist_id` int NOT NULL,
  `deskripsi` text,
  `genre` varchar(100) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_albums_artists` (`artist_id`),
  CONSTRAINT `FK_albums_artists` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.albums: ~4 rows (approximately)
INSERT INTO `albums` (`id`, `title`, `release_year`, `artist_id`, `deskripsi`, `genre`, `image`, `created_at`, `updated_at`) VALUES
	(2, 'Contoh Album', 2024, 5, 'Ini album contoh', 'Pop', 'uploads/albums/0a1b5f2c22e224d792ff13a7f1140d87', '2025-05-24 10:42:44', '2025-06-03 18:51:56'),
	(3, 'The Dark Side of the Moon233', 1973, 7, 'Classic progressive rock album by Pink Floyd', 'Progressive Rock', 'uploads\\albums\\cfe7ee0de697054c78ca3411cf63b40c', '2025-05-24 17:35:09', '2025-06-03 18:52:00'),
	(4, 'Thriller', 1982, 5, 'Michael Jackson\'s best-selling album', 'Pop', 'uploads/albums/0a1b5f2c22e224d792ff13a7f1140d87', '2025-05-24 17:35:09', '2025-06-03 18:52:04'),
	(5, 'Abbey Road', 1969, 7, 'The Beatles\' penultimate studio album', 'Rock', 'uploads/albums/0a1b5f2c22e224d792ff13a7f1140d87', '2025-05-24 17:35:09', '2025-06-03 18:54:32'),
	(21, 'Tulus22', 2015, 5, 'Tulus adalah album studio perdana oleh penyanyi-penulis lagu Indonesia, Tulus. Diproduseri oleh Ari Renaldi, album ini dirilis secara resmi pada 28 September 2011 melalui perusahaan rekaman independen, TulusCompany. Album ini merupakan album perkenalan Tulus serta sebagai penanda debutnya di industri musik Indonesia.', 'Pop ', 'uploads\\albums\\b63252b189beb9f53ef680eff388459b', '2025-06-04 03:05:29', '2025-06-04 13:22:12'),
	(22, 'Hot Jakarta Hari Ini', 2025, 7, 'ajdhaklwhdkhw', 'Pop Jazz', 'uploads\\albums\\97a1446656d26c1160a7ca78d09d43b7', '2025-06-05 08:46:21', '2025-06-05 08:46:21'),
	(23, 'Ngawi', 2025, 5, 'adada', 'Koplo', 'uploads\\albums\\9e4f88efbba1527a05c847d81d22b899', '2025-06-12 16:17:05', '2025-06-12 16:17:19');

-- Dumping structure for table findfun_db.artists
CREATE TABLE IF NOT EXISTS `artists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `bio` text,
  `birth_date` date DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `genre` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `active_year_start` int DEFAULT NULL,
  `active_year_end` int DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `youtube` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `popularity` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.artists: ~2 rows (approximately)
INSERT INTO `artists` (`id`, `name`, `bio`, `birth_date`, `country`, `genre`, `image`, `active_year_start`, `active_year_end`, `instagram`, `twitter`, `youtube`, `website`, `popularity`, `created_at`, `updated_at`) VALUES
	(5, 'RAMADHANI PRASETYO22', 'ajhdahkdw', '2000-11-20', 'Indonesia', 'Dj', 'uploads/1ac2daf80dd0ef06478af19235a7937b', 2025, NULL, '@ramadhani.prsty_', '@ramadhani.prsty_', '', '', 50, '2025-06-03 16:10:56', '2025-06-03 16:10:56'),
	(7, 'RAMADHANI PRASETYO22333', 'adwdwadshkdhkad', '2000-11-19', 'Indonesia', 'Dj', 'uploads/artists/0783f4d21cedd9075cff9b5499dae463', 2025, NULL, '@ramadhani.prsty_', '@ramadhani.prsty_', 'adasadw23454', 'adad344', 50, '2025-06-03 16:16:38', '2025-06-03 16:35:34'),
	(8, 'Denny Caknan', 'Sebelum ia terkenal, Denny merupakan seorang pegawai harian lepas di Dinas Lingkungan Hidup (DLH) Pemkab Ngawi. Kemudian ia mengawali kariernya sebagai penyanyi solo dengan membawakan genre musik pop. Sayangnya, beberapa lagu pop miliknya tidak laku, hingga akhirnya ia memutuskan untuk berubah haluan menjadi penyanyi Pop Jawa Sejumlah lagu yang dibawakan oleh Denny Caknan mendapatkan sambutan hangat dari para penggemar musik. Dan terbukti, lagu-lagunya sering menduduki trending di platform video YouTube. Tahun 2023, Denny Caknan sukses membawakan lagu yang bertajuk Kalih Welasku, dan trending di berbagai platform musik seperti YouTube dan TikTok.', '1993-12-09', 'Solo Jogja', 'Pop Jawa', 'uploads/artists/ec03307a0d605b959c5697455d7b9242', 2017, NULL, 'https://instagram.com/dennycaknan', 'https://twitter.com/dennycaknan', '-', '-', 98, '2025-06-12 16:24:24', '2025-06-12 16:26:03');

-- Dumping structure for table findfun_db.carousel_items
CREATE TABLE IF NOT EXISTS `carousel_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `carausel_name` varchar(100) DEFAULT NULL,
  `titleImage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `deskripsi` varchar(255) DEFAULT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.carousel_items: ~5 rows (approximately)
INSERT INTO `carousel_items` (`id`, `carausel_name`, `titleImage`, `image`, `deskripsi`, `status`) VALUES
	(1, 'Wakanda', 'uploads/carousel_image/wakandatitle.png', 'uploads/carousel_image/wakanda.jpg', 'Action & Adventure | 2022', 1),
	(2, 'Breakingbad', 'uploads/carousel_image/breakingbadtitle.png', 'uploads/carousel_image/breakingbad.jpg', 'Action & Adventure | 2023', 1),
	(3, 'Drive', 'uploads/carousel_image/drivetitle.png', 'uploads/carousel_image/drive.jpg', 'Action & Adventure | 2024', 1),
	(4, 'Theboys', 'uploads/carousel_image/theboystitle.png', 'uploads/carousel_image/theboys.jpg', 'Action & Adventure | 2025', 1),
	(5, 'test Wkanda', 'uploads\\carousel_image\\7ba5ce9569e2f74e1274a1a4909041c4', 'uploads\\carousel_image\\c7d6057b45dc4dfd11ef1523ece6a325', 'Univ Pancasila Teknik Informatika', 1),
	(9, 'test22sdw2222222', 'uploads\\carousel_image\\d3952d36969d0aefd56633fb5566fce5', 'uploads\\carousel_image\\49548d2615ff9ed463349485908aa480', 'seorang dj panjul gokil', 0);

-- Dumping structure for table findfun_db.cinema_locations
CREATE TABLE IF NOT EXISTS `cinema_locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `venue_name` varchar(255) NOT NULL,
  `cinema_type` varchar(50) NOT NULL,
  `film_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `film_id` (`film_id`),
  CONSTRAINT `cinema_locations_ibfk_1` FOREIGN KEY (`film_id`) REFERENCES `films` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.cinema_locations: ~2 rows (approximately)
INSERT INTO `cinema_locations` (`id`, `venue_name`, `cinema_type`, `film_id`) VALUES
	(1, 'AEON MALL TANJUNG BARAT', 'XXI', 19),
	(2, 'BLOK M SQUARE', 'XXI', 19);

-- Dumping structure for table findfun_db.films
CREATE TABLE IF NOT EXISTS `films` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `deskripsi` text,
  `release_year` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `genre1` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `genre2` varchar(100) DEFAULT NULL,
  `genre3` varchar(100) DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_poster` varchar(255) DEFAULT NULL,
  `director` varchar(255) DEFAULT NULL,
  `status_film` int DEFAULT NULL,
  `netflix_link` varchar(255) DEFAULT NULL,
  `appletv_link` varchar(255) DEFAULT NULL,
  `hbogo_link` varchar(255) DEFAULT NULL,
  `bioskop_link` varchar(255) DEFAULT NULL,
  `like_user` int DEFAULT NULL,
  `dislike` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.films: ~3 rows (approximately)
INSERT INTO `films` (`id`, `title`, `deskripsi`, `release_year`, `rating`, `genre1`, `genre2`, `genre3`, `duration`, `image`, `image_poster`, `director`, `status_film`, `netflix_link`, `appletv_link`, `hbogo_link`, `bioskop_link`, `like_user`, `dislike`, `created_at`, `updated_at`) VALUES
	(19, 'Jumbo', 'dadadawdawdaw', 2025, 10, 'Drama', 'Happy', 'adada', 102, 'uploads\\films\\9e38b9206116b2ccfd6ee772e5b3dd92', 'uploads\\films\\abd4740faa6903cf512f17666b17e34c', 'Ryan Adriandhy', 2, '-', '-', '-', '-', 0, 0, '2025-06-06 18:37:14', '2025-06-07 04:32:08'),
	(20, 'Jumbo22', 'Jumbo adalah film petualangan dengan genre fantasi animasi Indonesia tahun 2025 yang disutradarai oleh Ryan Adriandhy dalam debut penyutradaraannya. Film produksi Visinema Studios bersama Springboard dan Anami Films ini dibintangi oleh Prince Poetiray, Quinn Salman; Bunga Citra Lestari, dan Ariel', 2025, 10, 'Drama', 'Happy', 'adada', 102, 'uploads\\films\\d2c88e8eb868dd190b994c9883862400', 'uploads\\films\\ba6f53cc39f6de256fc9b36d855177c3', 'Ryan Adriandhy', 2, '-', '-', '-', '-', 0, 0, '2025-06-07 03:38:21', '2025-06-07 04:41:31'),
	(21, 'Jakarta Hot ', 'adadadwww', 2025, 10, 'Drama', '', '', 102, 'uploads\\films\\a953bab0ed5a97b8727051ce1bc4fe95', 'uploads\\films\\c08e42808282f7d68da746bf4ea2b6bc', 'Ryan Adriandhy', 1, '-', '-', '-', '-', 0, 0, '2025-06-07 05:13:43', '2025-06-07 05:13:43'),
	(22, 'Agak Laen', 'adada', 2012, 1, 'adada', '', '', 133, 'uploads\\films\\0ec5993fa05b3e007138439f6a425c5d', 'uploads\\films\\5c0d6c034a5ac2fb78d05d9df7041271', 'niko', 1, '', '', '', '', 0, 0, '2025-06-12 16:03:33', '2025-06-12 16:04:33');

-- Dumping structure for table findfun_db.film_artists
CREATE TABLE IF NOT EXISTS `film_artists` (
  `film_id` int NOT NULL,
  `artist_id` int NOT NULL,
  `pemeran` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`film_id`,`artist_id`) USING BTREE,
  KEY `FK2_artist` (`artist_id`),
  CONSTRAINT `FK1_films` FOREIGN KEY (`film_id`) REFERENCES `films` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK2_artist` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.film_artists: ~4 rows (approximately)
INSERT INTO `film_artists` (`film_id`, `artist_id`, `pemeran`) VALUES
	(19, 5, 'Madara'),
	(19, 7, 'Naruto'),
	(20, 5, 'Madara'),
	(20, 7, 'Naruto'),
	(21, 5, 'Naruto'),
	(22, 5, 'adada');

-- Dumping structure for table findfun_db.music
CREATE TABLE IF NOT EXISTS `music` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `lirik` text,
  `release_year` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `genre1` varchar(100) DEFAULT NULL,
  `genre2` varchar(100) DEFAULT NULL,
  `genre3` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `like_user` int DEFAULT NULL,
  `dislike` int DEFAULT NULL,
  `spotify_link` varchar(255) DEFAULT NULL,
  `apple_link` varchar(255) DEFAULT NULL,
  `youtube_link` varchar(255) DEFAULT NULL,
  `deezer_link` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.music: ~6 rows (approximately)
INSERT INTO `music` (`id`, `title`, `lirik`, `release_year`, `rating`, `genre1`, `genre2`, `genre3`, `image`, `like_user`, `dislike`, `spotify_link`, `apple_link`, `youtube_link`, `deezer_link`, `created_at`, `updated_at`) VALUES
	(3, 'Cupid', 'dadwd', 2022, 1, 'POP', '', '', 'uploads/e63d4b181e1097ee82a731e961eb1f64', 0, 0, 'http://localhost:5173/dashboard/addmusic', 'http://localhost:5173/dashboard/addmusic', 'http://localhost:3000/api/music/', 'http://localhost:5173/dashboard/addmusic', '2025-05-31 09:18:07', '2025-06-04 11:16:08'),
	(5, 'Super Shy', 'asdw', 2021, 1, 'POP', '', '', 'uploads/9ae57b6eefa8d71595517cab83e249de', 0, 0, 'http://localhost:5173/dashboard/addmusic', 'http://localhost:5173/dashboard/addmusic', 'http://localhost:3000/api/music/', 'http://localhost:5173/dashboard/addmusic', '2025-06-01 07:58:01', '2025-06-06 14:01:49'),
	(6, 'Dandelions', 'gfdhghgfh', 2020, 1, 'POP', 'Happy', '', 'uploads/fd2e814980474ca3d118cd91974acf90', 0, 0, 'http://localhost:5173/dashboard/addmusic', 'http://localhost:5173/dashboard/addmusic', 'http://localhost:3000/api/music/', 'http://localhost:5173/dashboard/addmusic', '2025-06-01 08:15:07', '2025-06-06 14:02:33'),
	(7, 'Dive Into You', 'awad', 2012, 1, 'POP', '', '', 'uploads/c974003d9cb2f01f4cf4aaa3a210bb27', 0, 0, 'http://localhost:5173/dashboard/addmusic', 'http://localhost:5173/dashboard/addmusic', 'http://localhost:3000/api/music/', 'http://localhost:5173/dashboard/addmusic', '2025-06-01 08:28:41', '2025-06-04 11:13:27'),
	(8, 'TULUS - Tujuh Belas', '(Muda jiwa, selamanya muda)\r\n(Kisah kita abadi selamanya)\r\n(Muda jiwa, selamanya muda)\r\n(Kisah kita abadi selamanya)\r\nMasihkah kau mengingat di saat kita masih 17?\r\nWaktu di mana tanggal-tanggal merah terasa sungguh meriah\r\nMasihkah kauingat cobaan terberat kita, Matematika?\r\nMasihkah engkau ingat lagu di radio yang merdu mengudara?\r\nKita masih sebebas itu\r\nRasa takut yang tak pernah mengganggu\r\nBatas naluri bahaya\r\nDulu tingginya lebihi logika\r\nPutaran Bumi dan waktu yang terus berjalan menempa kita\r\nWalau kini kita terpisah, namun, jiwaku tetap di sana (hey)\r\n(Di masa masih sebebas itu) oh, di masa\r\nRasa takut yang tak pernah mengganggu\r\nDi masa naluri bahaya\r\nDulu tingginya lebihi logika\r\nMuda jiwa, selamanya muda\r\nKisah kita abadi selamanya\r\n(Kita masih sebebas itu) kita masih sebebas itu\r\n(Rasa takut yang tak pernah mengganggu)\r\nRasa takut yang tak pernah mengganggu\r\n(Batas naluri bahaya, oh-oh)\r\n(Dulu tingginya lebihi logika)\r\nSederas apa pun arus di hidupmu\r\nGenggam terus kenangan tentang kita\r\nSeberapa pun dewasa mengujimu\r\nTakkan lebih dari yang engkau bisa\r\nDan kisah kita abadi untuk s\'lama-lamanya', 2022, 1, 'POP', 'Jazz', '', 'uploads/2165bef95407b5614bb922d2c6b7f9bf', 0, 0, 'http://localhost:5173/dashboard/addmusic', 'http://localhost:5173/dashboard/addmusic', 'http://localhost:3000/api/music/', 'http://localhost:5173/dashboard/addmusic', '2025-06-04 02:34:56', '2025-06-04 02:34:56'),
	(9, 'Cupid', 'adawd', 2022, 1, 'adada', '', '', 'uploads/96974b6b2d7676459f15772e7a2ae6db', 0, 0, '-', '-', '-', '-', '2025-06-12 16:06:24', '2025-06-12 16:07:33');

-- Dumping structure for table findfun_db.music_albums
CREATE TABLE IF NOT EXISTS `music_albums` (
  `music_id` int NOT NULL,
  `album_id` int NOT NULL,
  PRIMARY KEY (`music_id`,`album_id`),
  KEY `album_id` (`album_id`),
  CONSTRAINT `music_albums_ibfk_1` FOREIGN KEY (`music_id`) REFERENCES `music` (`id`) ON DELETE CASCADE,
  CONSTRAINT `music_albums_ibfk_2` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.music_albums: ~8 rows (approximately)
INSERT INTO `music_albums` (`music_id`, `album_id`) VALUES
	(5, 2),
	(6, 2),
	(8, 2),
	(3, 3),
	(5, 3),
	(7, 3),
	(8, 3),
	(9, 3),
	(6, 5);

-- Dumping structure for table findfun_db.music_artists
CREATE TABLE IF NOT EXISTS `music_artists` (
  `music_id` int NOT NULL,
  `artist_id` int NOT NULL,
  PRIMARY KEY (`music_id`,`artist_id`),
  KEY `artist_id` (`artist_id`),
  CONSTRAINT `music_artists_ibfk_1` FOREIGN KEY (`music_id`) REFERENCES `music` (`id`) ON DELETE CASCADE,
  CONSTRAINT `music_artists_ibfk_2` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.music_artists: ~7 rows (approximately)
INSERT INTO `music_artists` (`music_id`, `artist_id`) VALUES
	(5, 5),
	(6, 5),
	(7, 5),
	(9, 5),
	(3, 7),
	(5, 7),
	(6, 7),
	(8, 7);

-- Dumping structure for table findfun_db.reserved_seats
CREATE TABLE IF NOT EXISTS `reserved_seats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `schedule_id` int NOT NULL,
  `seat_id` varchar(5) NOT NULL,
  `user_id` int NOT NULL,
  `status` enum('reserved','available') DEFAULT 'reserved',
  `reserved_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `schedule_id` (`schedule_id`) USING BTREE,
  CONSTRAINT `FK_reserved_seats_schedules` FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`id`),
  CONSTRAINT `reserved_seats_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.reserved_seats: ~52 rows (approximately)
INSERT INTO `reserved_seats` (`id`, `schedule_id`, `seat_id`, `user_id`, `status`, `reserved_at`) VALUES
	(3, 1, 'A2', 1, 'reserved', '2025-06-08 08:49:00'),
	(4, 1, 'A1', 1, 'reserved', '2025-06-08 08:49:00'),
	(5, 2, 'A3', 1, 'reserved', '2025-06-08 08:48:59'),
	(6, 1, 'A4', 1, 'reserved', '2025-06-08 08:48:58'),
	(7, 3, 'A5', 1, 'reserved', '2025-06-08 08:48:57'),
	(8, 3, 'A1', 1, 'reserved', '2025-06-08 08:48:57'),
	(9, 3, 'B2', 1, 'reserved', '2025-06-08 08:48:56'),
	(10, 3, '3', 1, 'reserved', '2025-06-08 08:48:54'),
	(11, 3, 'A1', 1, 'reserved', '2025-06-08 08:48:55'),
	(12, 3, 'A1', 1, 'reserved', '2025-06-08 08:48:53'),
	(13, 3, 'A1', 1, 'reserved', '2025-06-08 08:48:52'),
	(14, 3, 'A1', 1, 'reserved', '2025-06-08 08:48:52'),
	(15, 3, 'A1', 1, 'reserved', '2025-06-08 08:48:50'),
	(16, 3, 'C1', 1, 'reserved', '2025-06-08 09:00:07'),
	(17, 3, 'C2', 1, 'reserved', '2025-06-08 09:00:07'),
	(18, 3, 'C1', 1, 'reserved', '2025-06-08 09:01:45'),
	(19, 3, 'C2', 1, 'reserved', '2025-06-08 09:01:45'),
	(20, 2, 'B4', 1, 'reserved', '2025-06-08 10:19:24'),
	(21, 2, 'B5', 1, 'reserved', '2025-06-08 10:19:24'),
	(22, 3, 'C6', 1, 'reserved', '2025-06-08 10:26:05'),
	(23, 3, 'C7', 1, 'reserved', '2025-06-08 10:26:05'),
	(24, 3, 'C8', 1, 'reserved', '2025-06-08 10:26:05'),
	(25, 3, 'C9', 1, 'reserved', '2025-06-08 10:26:05'),
	(26, 3, 'C10', 1, 'reserved', '2025-06-08 10:26:05'),
	(27, 1, 'C1', 1, 'reserved', '2025-06-09 05:06:27'),
	(28, 1, 'C2', 1, 'reserved', '2025-06-09 05:06:27'),
	(29, 1, 'C3', 1, 'reserved', '2025-06-09 05:06:27'),
	(30, 1, 'C4', 1, 'reserved', '2025-06-09 05:06:27'),
	(31, 1, 'C5', 1, 'reserved', '2025-06-09 05:06:27'),
	(32, 1, 'C6', 1, 'reserved', '2025-06-09 05:06:27'),
	(33, 1, 'C7', 1, 'reserved', '2025-06-09 05:06:27'),
	(34, 1, 'C8', 1, 'reserved', '2025-06-09 05:06:27'),
	(35, 1, 'D4', 1, 'reserved', '2025-06-09 05:06:27'),
	(36, 1, 'D5', 1, 'reserved', '2025-06-09 05:06:27'),
	(37, 1, 'D6', 1, 'reserved', '2025-06-09 05:06:27'),
	(38, 1, 'D7', 1, 'reserved', '2025-06-09 05:06:27'),
	(39, 1, 'D8', 1, 'reserved', '2025-06-09 05:06:27'),
	(40, 3, 'F6', 1, 'reserved', '2025-06-09 09:31:18'),
	(41, 3, 'F7', 1, 'reserved', '2025-06-09 09:31:18'),
	(42, 3, 'E1', 1, 'reserved', '2025-06-10 12:21:49'),
	(43, 3, 'E2', 1, 'reserved', '2025-06-10 12:21:49'),
	(44, 3, 'E3', 1, 'reserved', '2025-06-10 12:21:49'),
	(45, 3, 'E4', 1, 'reserved', '2025-06-10 12:21:49'),
	(46, 3, 'E5', 1, 'reserved', '2025-06-10 12:21:49'),
	(47, 3, 'E6', 1, 'reserved', '2025-06-10 12:21:49'),
	(48, 3, 'E7', 1, 'reserved', '2025-06-10 12:21:49'),
	(49, 3, 'E8', 1, 'reserved', '2025-06-10 12:21:49'),
	(50, 3, 'E9', 1, 'reserved', '2025-06-10 12:21:49'),
	(51, 3, 'E10', 1, 'reserved', '2025-06-10 12:21:49'),
	(52, 2, 'C2', 1, 'reserved', '2025-06-10 12:53:18'),
	(53, 2, 'C3', 1, 'reserved', '2025-06-10 12:53:18'),
	(54, 2, 'D3', 1, 'reserved', '2025-06-10 12:53:18'),
	(55, 2, 'E3', 1, 'reserved', '2025-06-10 12:53:18'),
	(56, 2, 'E2', 1, 'reserved', '2025-06-10 12:53:18'),
	(57, 2, 'E1', 1, 'reserved', '2025-06-10 12:53:18'),
	(58, 2, 'D1', 1, 'reserved', '2025-06-10 12:53:18'),
	(59, 2, 'C1', 1, 'reserved', '2025-06-10 12:53:18'),
	(60, 2, 'D2', 1, 'reserved', '2025-06-10 13:03:11'),
	(61, 3, 'H7', 1, 'reserved', '2025-06-10 17:19:45'),
	(62, 3, 'H8', 1, 'reserved', '2025-06-10 17:19:45'),
	(63, 3, 'H9', 1, 'reserved', '2025-06-10 17:19:45'),
	(64, 2, 'F7', 1, 'reserved', '2025-06-12 12:44:51'),
	(65, 2, 'G7', 1, 'reserved', '2025-06-12 12:44:51'),
	(66, 2, 'G8', 1, 'reserved', '2025-06-12 12:44:51'),
	(67, 2, 'E11', 3, 'reserved', '2025-06-12 13:35:40'),
	(68, 2, 'E12', 3, 'reserved', '2025-06-12 13:35:40');

-- Dumping structure for table findfun_db.schedules
CREATE TABLE IF NOT EXISTS `schedules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `film_id` int DEFAULT NULL,
  `cinema_location_id` int DEFAULT NULL,
  `show_time` time DEFAULT NULL,
  `price_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `film_id` (`film_id`),
  KEY `price_id` (`price_id`),
  KEY `cinema_location_id` (`cinema_location_id`),
  CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`film_id`) REFERENCES `films` (`id`) ON DELETE CASCADE,
  CONSTRAINT `schedules_ibfk_2` FOREIGN KEY (`price_id`) REFERENCES `ticket_prices` (`id`) ON DELETE CASCADE,
  CONSTRAINT `schedules_ibfk_3` FOREIGN KEY (`cinema_location_id`) REFERENCES `cinema_locations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.schedules: ~3 rows (approximately)
INSERT INTO `schedules` (`id`, `film_id`, `cinema_location_id`, `show_time`, `price_id`, `created_at`, `updated_at`) VALUES
	(1, 19, 1, '00:31:18', 1, '2025-06-07 17:31:23', '2025-06-07 17:31:27'),
	(2, 19, 1, '00:53:24', 1, '2025-06-07 17:52:36', '2025-06-07 17:54:00'),
	(3, 19, 2, '01:16:29', 1, '2025-06-07 18:16:32', '2025-06-07 18:58:49');

-- Dumping structure for table findfun_db.tickets
CREATE TABLE IF NOT EXISTS `tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `film_id` int DEFAULT NULL,
  `schedule_id` int DEFAULT NULL,
  `seats` json DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `payment_id` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `film_id` (`film_id`),
  KEY `schedule_id` (`schedule_id`),
  CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`film_id`) REFERENCES `films` (`id`),
  CONSTRAINT `tickets_ibfk_3` FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.tickets: ~7 rows (approximately)
INSERT INTO `tickets` (`id`, `user_id`, `nama`, `email`, `film_id`, `schedule_id`, `seats`, `total_price`, `payment_id`, `image`, `created_at`, `updated_at`) VALUES
	(1, 1, 'Dhani', 'dhani@gmail.com', 19, 3, '[18, 19]', 120000.00, NULL, NULL, '2025-06-08 09:01:45', '2025-06-09 09:37:50'),
	(2, 1, '', '', 19, 2, '[20, 21]', 70000.00, NULL, NULL, '2025-06-08 10:19:24', '2025-06-09 09:37:50'),
	(3, 1, 'testt', 'findfund@gmail.com', 19, 3, '[22, 23, 24, 25, 26]', 250000.00, NULL, NULL, '2025-06-08 10:26:05', '2025-06-09 09:37:50'),
	(4, 1, 'Fajarsurya', 'fajar@gmail.com', 19, 1, '[27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39]', 455000.00, NULL, NULL, '2025-06-09 05:06:27', '2025-06-09 09:37:50'),
	(5, 1, 'Nadia Ayu Rahmawati', 'Nadia@gmail.com', 19, 3, '"F6,F7"', 100000.00, 'VA-8542703408-32', 'upload/wdwd', '2025-06-09 09:31:18', '2025-06-09 11:37:12'),
	(6, 1, 'Ramadhani Prasetyo', 'ramadhani@gmail.com', 19, 3, '"E1,E10,E2,E3,E4,E5,E6,E7,E8,E9"', 500000.00, 'VA-1245102833-38', 'upload/wdwd', '2025-06-10 12:21:49', '2025-06-10 12:42:16'),
	(7, 1, 'Ramadhani Prasetyo22', 'ramadhani22@gmail.com', 19, 2, '"C1,C2,C3,D1,D3,E1,E2,E3"', 280000.00, 'VA-8656994171-65', NULL, '2025-06-10 12:53:18', '2025-06-10 12:53:25'),
	(8, 1, 'Nadia Ayu Rahmawati', 'Nadia@gmail.com', 19, 2, '"D2"', 35000.00, 'VA-4136994792-36', NULL, '2025-06-10 13:03:11', '2025-06-10 13:05:49'),
	(9, 1, 'Nadia Ayu Rahmawati', 'Nadia@gmail.com', 19, 3, '[61, 62, 63]', 150000.00, NULL, NULL, '2025-06-10 17:19:45', '2025-06-10 17:19:45'),
	(10, 1, 'Nadia Ayu Rahmawati22', 'Nadia@gmail.com', 19, 2, '[64, 65, 66]', 105000.00, NULL, NULL, '2025-06-12 12:44:51', '2025-06-12 12:44:51'),
	(11, 1, 'Ramadhani Prasetyo22', 'ramadhani22@gmail.com', 19, 2, '"E11,E12"', 70000.00, 'VA-4130124688-55', NULL, '2025-06-12 13:35:40', '2025-06-12 13:45:43');

-- Dumping structure for table findfun_db.ticket_prices
CREATE TABLE IF NOT EXISTS `ticket_prices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ticket_type` varchar(50) NOT NULL,
  `price` int NOT NULL,
  `film_id` int NOT NULL,
  `cinema_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `film_id` (`film_id`),
  KEY `FK_ticket_prices_cinema_locations` (`cinema_id`),
  CONSTRAINT `FK_ticket_prices_cinema_locations` FOREIGN KEY (`cinema_id`) REFERENCES `cinema_locations` (`id`),
  CONSTRAINT `ticket_prices_ibfk_1` FOREIGN KEY (`film_id`) REFERENCES `films` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.ticket_prices: ~2 rows (approximately)
INSERT INTO `ticket_prices` (`id`, `ticket_type`, `price`, `film_id`, `cinema_id`) VALUES
	(1, 'Silver', 35000, 19, 1),
	(2, 'Gold', 50000, 19, 2);

-- Dumping structure for table findfun_db.ticket_seats
CREATE TABLE IF NOT EXISTS `ticket_seats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ticket_id` int NOT NULL,
  `seat_id` varchar(5) NOT NULL,
  `status` enum('reserved','available') DEFAULT 'reserved',
  PRIMARY KEY (`id`),
  KEY `ticket_id` (`ticket_id`),
  CONSTRAINT `ticket_seats_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.ticket_seats: ~0 rows (approximately)

-- Dumping structure for table findfun_db.ulasan
CREATE TABLE IF NOT EXISTS `ulasan` (
  `id_ulasan` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `film_id` int NOT NULL,
  `title_review` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `alur_review` text,
  `sinematografi_review` text,
  `pemeran_review` text,
  `review_lain` text,
  `kategori` int DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `like_ulasan` int DEFAULT '0',
  `dislike_ulasan` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_ulasan`),
  KEY `ulasan_ibfk_1` (`user_id`),
  KEY `ulasan_ibfk_2` (`film_id`),
  CONSTRAINT `ulasan_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ulasan_ibfk_2` FOREIGN KEY (`film_id`) REFERENCES `films` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.ulasan: ~3 rows (approximately)
INSERT INTO `ulasan` (`id_ulasan`, `user_id`, `film_id`, `title_review`, `alur_review`, `sinematografi_review`, `pemeran_review`, `review_lain`, `kategori`, `rating`, `like_ulasan`, `dislike_ulasan`, `created_at`, `updated_at`) VALUES
	(2, 1, 20, '“Horror menurun, cerita masih cukup solid.”', 'Alur cerita sangat menarik dan tidak membosankan dari awal hingga akhir.', 'Sinematografi sangat memukau dengan pencahayaan yang dramatis dan framing yang estetik.', 'Para pemeran tampil sangat meyakinkan dan mendalami perannya masing-masing.', 'Soundtrack juga sangat mendukung emosi setiap adegan.', 2, 8.7, 12, 1, '2025-06-09 22:08:44', '2025-06-09 22:37:29'),
	(3, 1, 20, '"Film seruuu sekali"', 'Alur cerita sangat menarik dan tidak membosankan dari awal hingga akhir.', 'Sinematografi sangat memukau dengan pencahayaan yang dramatis dan framing yang estetik.', 'Para pemeran tampil sangat meyakinkan dan mendalami perannya masing-masing.', 'Soundtrack juga sangat mendukung emosi setiap adegan.', 2, 3.7, 12, 1, '2025-06-09 23:06:38', '2025-06-10 05:36:39'),
	(4, 1, 20, '', 'dawdw', 'dwdwqdqw', 'dawdawd', 'adwadw', 1, 2.0, 0, 0, '2025-06-10 11:53:39', '2025-06-10 11:53:39'),
	(5, 1, 19, '', 'ajdkjjahjwkdhk', 'adkdhakwhdk', 'ahkjdhakdhk', 'ajgdjagdajgdjw', 2, 2.0, 0, 0, '2025-06-11 09:49:11', '2025-06-11 09:49:11');

-- Dumping structure for table findfun_db.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_email` (`email`),
  KEY `idx_role` (`role`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.users: ~0 rows (approximately)
INSERT INTO `users` (`id`, `email`, `username`, `password`, `role`, `image`, `created_at`, `updated_at`) VALUES
	(1, 'admin@finfun.com', 'Admin', '$2b$10$VG7JvZZ8orYsRBLHhqY0YOaT.4wxK07Sq3kNXKJWHtqJ9.t8psOMK', 'user', NULL, '2025-06-12 06:01:35', '2025-06-12 07:01:49'),
	(2, 'userAdmin@admin.com', 'AdminDhani', '$2b$10$K2Sex44Flk7FL2oeeFW.HueGO/sFAhUX1nLBHl8hgCkwYGI43qpiG', 'admin', 'uploads/artists/0783f4d21cedd9075cff9b5499dae463', '2025-06-12 06:55:28', '2025-06-12 11:00:24'),
	(3, 'dhani@admin.com', 'dhani', '$2b$10$cch3.x/AC3iV4g5bkrSRzOZjYvMEPUcEPUplQvHhSG5eYffgUpMOG', 'user', NULL, '2025-06-12 10:00:15', '2025-06-12 10:00:15');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
