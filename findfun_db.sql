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
  `deskripsi` text,
  `genre` varchar(100) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.albums: ~19 rows (approximately)
INSERT INTO `albums` (`id`, `title`, `release_year`, `deskripsi`, `genre`, `image`, `created_at`, `updated_at`) VALUES
	(2, 'Contoh Album', 2024, 'Ini album contoh', 'Pop', 'https://example.com/image.jpg', '2025-05-24 10:42:44', '2025-05-24 10:42:44'),
	(3, 'The Dark Side of the Moon', 1973, 'Classic progressive rock album by Pink Floyd', 'Progressive Rock', 'https://example.com/darkside.jpg', '2025-05-24 17:35:09', '2025-05-24 17:35:09'),
	(4, 'Thriller', 1982, 'Michael Jackson\'s best-selling album', 'Pop', 'https://example.com/thriller.jpg', '2025-05-24 17:35:09', '2025-05-24 17:35:09'),
	(5, 'Abbey Road', 1969, 'The Beatles\' penultimate studio album', 'Rock', 'https://example.com/abbeyroad.jpg', '2025-05-24 17:35:09', '2025-05-24 17:35:09'),
	(6, 'The Dark Side of the Moon', 1973, 'Classic progressive rock album by Pink Floyd', 'Progressive Rock', 'https://example.com/darkside.jpg', '2025-05-24 17:36:54', '2025-05-24 17:36:54'),
	(7, 'Thriller', 1982, 'Michael Jackson\'s best-selling album', 'Pop', 'https://example.com/thriller.jpg', '2025-05-24 17:36:54', '2025-05-24 17:36:54'),
	(8, 'Abbey Road', 1969, 'The Beatles\' penultimate studio album', 'Rock', 'https://example.com/abbeyroad.jpg', '2025-05-24 17:36:54', '2025-05-24 17:36:54'),
	(9, 'The Dark Side of the Moon', 1973, 'Classic progressive rock album by Pink Floyd', 'Progressive Rock', 'https://example.com/darkside.jpg', '2025-05-24 17:37:14', '2025-05-24 17:37:14'),
	(10, 'Thriller', 1982, 'Michael Jackson\'s best-selling album', 'Pop', 'https://example.com/thriller.jpg', '2025-05-24 17:37:14', '2025-05-24 17:37:14'),
	(11, 'Abbey Road', 1969, 'The Beatles\' penultimate studio album', 'Rock', 'https://example.com/abbeyroad.jpg', '2025-05-24 17:37:14', '2025-05-24 17:37:14'),
	(12, 'The Dark Side of the Moon', 1973, 'Classic progressive rock album by Pink Floyd', 'Progressive Rock', 'https://example.com/darkside.jpg', '2025-05-24 17:37:40', '2025-05-24 17:37:40'),
	(13, 'Thriller', 1982, 'Michael Jackson\'s best-selling album', 'Pop', 'https://example.com/thriller.jpg', '2025-05-24 17:37:40', '2025-05-24 17:37:40'),
	(14, 'Abbey Road', 1969, 'The Beatles\' penultimate studio album', 'Rock', 'https://example.com/abbeyroad.jpg', '2025-05-24 17:37:40', '2025-05-24 17:37:40'),
	(15, 'The Dark Side of the Moon', 1973, 'Classic progressive rock album by Pink Floyd', 'Progressive Rock', 'https://example.com/darkside.jpg', '2025-05-24 17:39:45', '2025-05-24 17:39:45'),
	(16, 'Thriller', 1982, 'Michael Jackson\'s best-selling album', 'Pop', 'https://example.com/thriller.jpg', '2025-05-24 17:39:45', '2025-05-24 17:39:45'),
	(17, 'Abbey Road', 1969, 'The Beatles\' penultimate studio album', 'Rock', 'https://example.com/abbeyroad.jpg', '2025-05-24 17:39:45', '2025-05-24 17:39:45'),
	(18, 'The Dark Side of the Moon', 1973, 'Classic progressive rock album by Pink Floyd', 'Progressive Rock', 'https://example.com/darkside.jpg', '2025-05-24 17:40:02', '2025-05-24 17:40:02'),
	(19, 'Thriller', 1982, 'Michael Jackson\'s best-selling album', 'Pop', 'https://example.com/thriller.jpg', '2025-05-24 17:40:02', '2025-05-24 17:40:02'),
	(20, 'Abbey Road', 1969, 'The Beatles\' penultimate studio album', 'Rock', 'https://example.com/abbeyroad.jpg', '2025-05-24 17:40:02', '2025-05-24 17:40:02');

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.artists: ~2 rows (approximately)
INSERT INTO `artists` (`id`, `name`, `bio`, `birth_date`, `country`, `genre`, `image`, `active_year_start`, `active_year_end`, `instagram`, `twitter`, `youtube`, `website`, `popularity`, `created_at`, `updated_at`) VALUES
	(1, 'Taylor Swift', 'American singer-songwriter', '1989-12-13', 'USA', 'Pop', 'https://example.com/taylor.jpg', 2004, NULL, '@taylorswift', '@taylorswift13', NULL, 'https://taylorswift.com', 95, '2025-05-24 18:27:47', '2025-05-24 18:27:47'),
	(2, ' Swift', 'American singer-songwriter', '1989-12-13', 'USA', 'Pop', 'https://example.com/.jpg', 2004, NULL, '@taylorswift', '@taylorswift13', NULL, 'https://taylorswift.com', 70, '2025-05-24 18:47:42', '2025-05-24 18:47:42'),
	(3, 'uajangg', 'American singer-songwriter', '1989-12-13', 'USA', 'Pop', 'https://example.com/.jpg', 2004, NULL, '@taylorswift', '@taylorswift13', NULL, 'https://taylorswift.com', 70, '2025-05-24 18:47:52', '2025-05-24 18:47:52');

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.films: ~1 rows (approximately)
INSERT INTO `films` (`id`, `title`, `deskripsi`, `release_year`, `rating`, `genre`, `duration`, `image`, `actor`, `director`, `status_film`, `netflix_link`, `appletv_link`, `hbogo_link`, `bioskop_link`, `like_user`, `dislike`, `created_at`, `updated_at`) VALUES
	(4, 'DJ BEAUTY AND A BEAT BREAKBEAT MENGKANE REVERB VIRAL TIKTOK', 'adwdwd', 1990, 2, 'jkahdkjahkd', 20, 'uploads/e7fb37f3a8e0bcb5dd87d94b33ed0382', 'djakdh', 'Fajar', 1, 'https://www.microsoft.com/en-us/edge/update/137?form=MT012P&es=DCC2&ep=1219&cs=1637170664', 'http://localhost:5173/dashboard/addmusic', 'https://www.microsoft.com/en-us/edge/update/137?form=MT012P&es=DCC2&ep=1219&cs=1637170664', 'http://localhost:5173/dashboard/addmusic', 0, 0, '2025-05-29 12:40:28', '2025-05-31 03:59:40'),
	(5, 'DJ TIKTOK TERBARU 2025🎵DJ SU JAUH SA TANAM HATI TAPI TRA HASIL🎵DJ MANGU - SIAPA YANG MAU🔥', 'adwd', 2025, 2, 'dwdw', 160, 'uploads/05cd44d2724770befc2a9bafc1b0beae', 'jdhkawhdk', 'jkhakjdhw', 1, '', '', '', '', 0, 0, '2025-05-29 13:30:25', '2025-05-31 03:59:12');

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.music: ~7 rows (approximately)
INSERT INTO `music` (`id`, `title`, `lirik`, `release_year`, `rating`, `genre1`, `genre2`, `genre3`, `image`, `like_user`, `dislike`, `spotify_link`, `apple_link`, `youtube_link`, `deezer_link`, `created_at`, `updated_at`) VALUES
	(1, 'Anti-Hero', 'akjdnkadkandkahldldjlw', 2022, 8, 'Pop', 'Alternative', '', 'uploads/47efe04a5c3907a5dd4046957e02dfc6', 0, 0, 'https://spotify.com/antihero', 'https://music.apple.com/antihero', 'https://youtube.com/antihero', 'http://localhost:3000/api/music/1', '2025-05-24 18:35:42', '2025-06-01 15:00:36'),
	(2, 'Jakarta Hot ', 'agdjkagkd', 2012, 1, 'pop', 'rege', '', 'uploads/ccf6d826b53a66708ca2d94f980ff401', 0, 0, 'http://localhost:5173/dashboard/addmusic', 'http://localhost:5173/dashboard/addmusic', 'http://localhost:3000/api/music/', 'http://localhost:5173/dashboard/addmusic', '2025-05-31 09:08:15', '2025-06-01 15:00:26'),
	(3, 'Jakarta Hot 212', 'dadwd', 2012, 1, 'POP', 'rege', '', 'uploads/0a1b5f2c22e224d792ff13a7f1140d87', 0, 0, 'http://localhost:5173/dashboard/addmusic', 'http://localhost:5173/dashboard/addmusic', 'http://localhost:3000/api/music/', 'http://localhost:5173/dashboard/addmusic', '2025-05-31 09:18:07', '2025-06-01 14:56:55'),
	(4, 'Panjul Si petualang2', 'adawdwadhghfhf', 2012, 1, 'pop', 'Happy', 'wd', 'uploads/3945626491421ba36eef737ed7a1f8ed', 0, 0, 'http://localhost:5173/dashboard/addmusic', 'gfhjgjg', 'ujtgjgj', 'hgfhgfh', '2025-05-31 16:02:26', '2025-06-01 14:57:04'),
	(5, 'Panjul Si petualang22', 'asdw', 2012, 1, 'POP', 'rege', '', 'uploads/b584776b6eda0f880b399f86facda2f4', 0, 0, 'http://localhost:5173/dashboard/addmusic', 'http://localhost:5173/dashboard/addmusic', 'http://localhost:3000/api/music/', 'http://localhost:5173/dashboard/addmusic', '2025-06-01 07:58:01', '2025-06-01 07:58:01'),
	(6, 'Panjul Si petualang2223', 'gfdhghgfh', 2012, 1, 'POP', 'Happy', '', 'uploads/dbf890ed769f60056b531f36a659abe8', 0, 0, 'http://localhost:5173/dashboard/addmusic', 'http://localhost:5173/dashboard/addmusic', 'http://localhost:3000/api/music/', 'http://localhost:5173/dashboard/addmusic', '2025-06-01 08:15:07', '2025-06-01 15:01:09'),
	(7, 'Panjul Si petualang222ds', 'awad', 2012, 1, 'POP', 'COLLq', '', 'uploads/8ab4647c6762201989e907c16c601383', 0, 0, 'http://localhost:5173/dashboard/addmusic', 'http://localhost:5173/dashboard/addmusic', 'http://localhost:3000/api/music/', 'http://localhost:5173/dashboard/addmusic', '2025-06-01 08:28:41', '2025-06-01 15:01:23');

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
	(1, 3),
	(4, 3),
	(5, 3),
	(1, 4),
	(4, 4),
	(6, 5),
	(3, 14),
	(2, 15),
	(3, 15),
	(6, 15),
	(7, 19);

-- Dumping structure for table findfun_db.music_artists
CREATE TABLE IF NOT EXISTS `music_artists` (
  `music_id` int NOT NULL,
  `artist_id` int NOT NULL,
  PRIMARY KEY (`music_id`,`artist_id`),
  KEY `artist_id` (`artist_id`),
  CONSTRAINT `music_artists_ibfk_1` FOREIGN KEY (`music_id`) REFERENCES `music` (`id`) ON DELETE CASCADE,
  CONSTRAINT `music_artists_ibfk_2` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table findfun_db.music_artists: ~14 rows (approximately)
INSERT INTO `music_artists` (`music_id`, `artist_id`) VALUES
	(1, 1),
	(2, 1),
	(3, 1),
	(4, 1),
	(5, 1),
	(6, 1),
	(1, 2),
	(4, 2),
	(6, 2),
	(3, 3),
	(4, 3),
	(5, 3),
	(7, 3);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
