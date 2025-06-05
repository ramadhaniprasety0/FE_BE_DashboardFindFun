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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.albums: ~4 rows (approximately)
INSERT INTO `albums` (`id`, `title`, `release_year`, `artist_id`, `deskripsi`, `genre`, `image`, `created_at`, `updated_at`) VALUES
	(2, 'Contoh Album', 2024, 5, 'Ini album contoh', 'Pop', 'uploads/albums/0a1b5f2c22e224d792ff13a7f1140d87', '2025-05-24 10:42:44', '2025-06-03 18:51:56'),
	(3, 'The Dark Side of the Moon233', 1973, 7, 'Classic progressive rock album by Pink Floyd', 'Progressive Rock', 'uploads\\albums\\cfe7ee0de697054c78ca3411cf63b40c', '2025-05-24 17:35:09', '2025-06-03 18:52:00'),
	(4, 'Thriller', 1982, 5, 'Michael Jackson\'s best-selling album', 'Pop', 'uploads/albums/0a1b5f2c22e224d792ff13a7f1140d87', '2025-05-24 17:35:09', '2025-06-03 18:52:04'),
	(5, 'Abbey Road', 1969, 7, 'The Beatles\' penultimate studio album', 'Rock', 'uploads/albums/0a1b5f2c22e224d792ff13a7f1140d87', '2025-05-24 17:35:09', '2025-06-03 18:54:32'),
	(21, 'Tulus22', 2015, 5, 'Tulus adalah album studio perdana oleh penyanyi-penulis lagu Indonesia, Tulus. Diproduseri oleh Ari Renaldi, album ini dirilis secara resmi pada 28 September 2011 melalui perusahaan rekaman independen, TulusCompany. Album ini merupakan album perkenalan Tulus serta sebagai penanda debutnya di industri musik Indonesia.', 'Pop ', 'uploads\\albums\\b63252b189beb9f53ef680eff388459b', '2025-06-04 03:05:29', '2025-06-04 13:22:12');

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.artists: ~2 rows (approximately)
INSERT INTO `artists` (`id`, `name`, `bio`, `birth_date`, `country`, `genre`, `image`, `active_year_start`, `active_year_end`, `instagram`, `twitter`, `youtube`, `website`, `popularity`, `created_at`, `updated_at`) VALUES
	(5, 'RAMADHANI PRASETYO22', 'ajhdahkdw', '2000-11-20', 'Indonesia', 'Dj', 'uploads/1ac2daf80dd0ef06478af19235a7937b', 2025, NULL, '@ramadhani.prsty_', '@ramadhani.prsty_', '', '', 50, '2025-06-03 16:10:56', '2025-06-03 16:10:56'),
	(7, 'RAMADHANI PRASETYO22333', 'adwdwadshkdhkad', '2000-11-19', 'Indonesia', 'Dj', 'uploads/artists/0783f4d21cedd9075cff9b5499dae463', 2025, NULL, '@ramadhani.prsty_', '@ramadhani.prsty_', 'adasadw23454', 'adad344', 50, '2025-06-03 16:16:38', '2025-06-03 16:35:34');

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
	(5, 'test Wkanda', 'uploads\\carousel_image\\7ba5ce9569e2f74e1274a1a4909041c4', 'uploads\\carousel_image\\c7d6057b45dc4dfd11ef1523ece6a325', 'Univ Pancasila Teknik Informatika', 0),
	(9, 'test22sdw222', 'uploads\\carousel_image\\d3952d36969d0aefd56633fb5566fce5', 'uploads\\carousel_image\\49548d2615ff9ed463349485908aa480', 'seorang dj panjul gokil', 1);

-- Dumping structure for table findfun_db.films
CREATE TABLE IF NOT EXISTS `films` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `deskripsi` text,
  `release_year` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `genre` varchar(100) DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `actor` varchar(255) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.films: ~1 rows (approximately)
INSERT INTO `films` (`id`, `title`, `deskripsi`, `release_year`, `rating`, `genre`, `duration`, `image`, `actor`, `director`, `status_film`, `netflix_link`, `appletv_link`, `hbogo_link`, `bioskop_link`, `like_user`, `dislike`, `created_at`, `updated_at`) VALUES
	(4, 'Pengepungan di Bukit Duri', 'Pengepungan di Bukit Duri adalah film cerita seru aksi Indonesia tahun 2025 yang disutradarai oleh Joko Anwar. Film produksi Amazon MGM Studios serta Come and See Pictures ini dibintangi oleh Morgan Oey, Omara Esteghlal, dan Hana Malasan. ', 2025, 10, 'Drama ', 160, 'uploads/ac5c3ad475fa96f7a7751b1ae96f4c42', 'Morgan Oey, Omara E, Fatih Unru, Endy Arfian, Hana Malasan, Satine Zaneta', 'Joko Anwar', 2, 'https://www.microsoft.com/en-us/edge/update/137?form=MT012P&es=DCC2&ep=1219&cs=1637170664', 'http://localhost:5173/dashboard/addmusic', 'https://www.microsoft.com/en-us/edge/update/137?form=MT012P&es=DCC2&ep=1219&cs=1637170664', 'http://localhost:5173/dashboard/addmusic', 0, 0, '2025-05-29 12:40:28', '2025-06-04 11:02:40'),
	(5, 'The Nun II', 'The Nun 2 berlatar beberapa tahun setelah Suster Irene mengalami teror mengerikan di film pertamanya. Pada 1956 di Perancis, kehidupan Suster Irene mendadak berubah karena Valak kembali datang untuk menerornya. Ternyata selama ini Valak bersembunyi di dalam raga teman Suster Irene, Maurice sebagaimana akhir film pertama. Suster Irene kini harus menghadapi teror Valak demi kedamaian hidupnya dan orang-orang di sekitarnya.', 2022, 8, 'Horror', 160, 'uploads/011ca441e452ed5a9a2914524fae3fb4', 'Bonnie Aarons, Taissa Farmiga, Jonas Bloquet', 'Michael Chaves', 1, 'http://localhost:5173/dashboard/addmusic', 'http://localhost:5173/dashboard/addmusic', 'http://localhost:5173/dashboard/addmusic', 'http://localhost:5173/dashboard/addmusic', 0, 0, '2025-05-29 13:30:25', '2025-06-04 11:09:09'),
	(6, 'Oppenheimer swww', 'Oppenheimer mengisahkan hidup fisikawan teoritis J. Robert Oppenheimer. Ia merupakan direktur Laboratorium Los Alamos di Proyek Manhattan selama Perang Dunia II.Bukan Albert Einstein, melainkan Oppenheimer lah yang berkontribusi besar atas terciptanya bom atom. Seperti apa perjalanannya hingga jadi pencipta salah satu senjata paling mengerikan di sejarah dunia ini?', 2023, 9, 'Action', 180, 'uploads/2e41ab08a5100e0a742dbe89368c4d47', 'Cillian Murphy, Emily Blunt, Matt Damon, Robert Downey Jr. , Florence Pugh, Josh Hartnett', 'Christopher Nolan', 1, 'http://localhost:5173/dashboard/addmusic', 'http://localhost:5173/dashboard/addmusic', 'http://localhost:5173/dashboard/addmusic', 'http://localhost:5173/dashboard/addmusic', 0, 0, '2025-06-04 11:08:57', '2025-06-04 13:21:09');

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.music: ~6 rows (approximately)
INSERT INTO `music` (`id`, `title`, `lirik`, `release_year`, `rating`, `genre1`, `genre2`, `genre3`, `image`, `like_user`, `dislike`, `spotify_link`, `apple_link`, `youtube_link`, `deezer_link`, `created_at`, `updated_at`) VALUES
	(3, 'Cupid', 'dadwd', 2022, 1, 'POP', '', '', 'uploads/e63d4b181e1097ee82a731e961eb1f64', 0, 0, 'http://localhost:5173/dashboard/addmusic', 'http://localhost:5173/dashboard/addmusic', 'http://localhost:3000/api/music/', 'http://localhost:5173/dashboard/addmusic', '2025-05-31 09:18:07', '2025-06-04 11:16:08'),
	(5, 'Super Shy', 'asdw', 2021, 1, 'POP', '', '', 'uploads/9ae57b6eefa8d71595517cab83e249de', 0, 0, 'http://localhost:5173/dashboard/addmusic', 'http://localhost:5173/dashboard/addmusic', 'http://localhost:3000/api/music/', 'http://localhost:5173/dashboard/addmusic', '2025-06-01 07:58:01', '2025-06-04 11:15:17'),
	(6, 'Dandelions', 'gfdhghgfh', 2020, 1, 'POP', 'Happy', '', 'uploads/fd2e814980474ca3d118cd91974acf90', 0, 0, 'http://localhost:5173/dashboard/addmusic', 'http://localhost:5173/dashboard/addmusic', 'http://localhost:3000/api/music/', 'http://localhost:5173/dashboard/addmusic', '2025-06-01 08:15:07', '2025-06-04 11:14:31'),
	(7, 'Dive Into You', 'awad', 2012, 1, 'POP', '', '', 'uploads/c974003d9cb2f01f4cf4aaa3a210bb27', 0, 0, 'http://localhost:5173/dashboard/addmusic', 'http://localhost:5173/dashboard/addmusic', 'http://localhost:3000/api/music/', 'http://localhost:5173/dashboard/addmusic', '2025-06-01 08:28:41', '2025-06-04 11:13:27'),
	(8, 'TULUS - Tujuh Belas', '(Muda jiwa, selamanya muda)\r\n(Kisah kita abadi selamanya)\r\n(Muda jiwa, selamanya muda)\r\n(Kisah kita abadi selamanya)\r\nMasihkah kau mengingat di saat kita masih 17?\r\nWaktu di mana tanggal-tanggal merah terasa sungguh meriah\r\nMasihkah kauingat cobaan terberat kita, Matematika?\r\nMasihkah engkau ingat lagu di radio yang merdu mengudara?\r\nKita masih sebebas itu\r\nRasa takut yang tak pernah mengganggu\r\nBatas naluri bahaya\r\nDulu tingginya lebihi logika\r\nPutaran Bumi dan waktu yang terus berjalan menempa kita\r\nWalau kini kita terpisah, namun, jiwaku tetap di sana (hey)\r\n(Di masa masih sebebas itu) oh, di masa\r\nRasa takut yang tak pernah mengganggu\r\nDi masa naluri bahaya\r\nDulu tingginya lebihi logika\r\nMuda jiwa, selamanya muda\r\nKisah kita abadi selamanya\r\n(Kita masih sebebas itu) kita masih sebebas itu\r\n(Rasa takut yang tak pernah mengganggu)\r\nRasa takut yang tak pernah mengganggu\r\n(Batas naluri bahaya, oh-oh)\r\n(Dulu tingginya lebihi logika)\r\nSederas apa pun arus di hidupmu\r\nGenggam terus kenangan tentang kita\r\nSeberapa pun dewasa mengujimu\r\nTakkan lebih dari yang engkau bisa\r\nDan kisah kita abadi untuk s\'lama-lamanya', 2022, 1, 'POP', 'Jazz', '', 'uploads/2165bef95407b5614bb922d2c6b7f9bf', 0, 0, 'http://localhost:5173/dashboard/addmusic', 'http://localhost:5173/dashboard/addmusic', 'http://localhost:3000/api/music/', 'http://localhost:5173/dashboard/addmusic', '2025-06-04 02:34:56', '2025-06-04 02:34:56');

-- Dumping structure for table findfun_db.music_albums
CREATE TABLE IF NOT EXISTS `music_albums` (
  `music_id` int NOT NULL,
  `album_id` int NOT NULL,
  PRIMARY KEY (`music_id`,`album_id`),
  KEY `album_id` (`album_id`),
  CONSTRAINT `music_albums_ibfk_1` FOREIGN KEY (`music_id`) REFERENCES `music` (`id`) ON DELETE CASCADE,
  CONSTRAINT `music_albums_ibfk_2` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.music_albums: ~6 rows (approximately)
INSERT INTO `music_albums` (`music_id`, `album_id`) VALUES
	(8, 2),
	(3, 3),
	(5, 3),
	(7, 3),
	(8, 3),
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

-- Dumping data for table findfun_db.music_artists: ~5 rows (approximately)
INSERT INTO `music_artists` (`music_id`, `artist_id`) VALUES
	(5, 5),
	(7, 5),
	(3, 7),
	(6, 7),
	(8, 7);

-- Dumping structure for table findfun_db.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.users: ~0 rows (approximately)
INSERT INTO `users` (`id`, `email`, `username`, `password`, `created_at`, `updated_at`) VALUES
	(1, 'userAdmin@admin.com', 'Admin', '$2b$10$VG7JvZZ8orYsRBLHhqY0YOaT.4wxK07Sq3kNXKJWHtqJ9.t8psOMK', '2025-06-02 04:51:32', '2025-06-02 04:51:32');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
