const User = require("../models/userModel");
const bcrypt = require("bcrypt"); // For password hashing
const jwt = require("jsonwebtoken"); // For generating JWT token

const authController = {
  login: (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (!results || results.length === 0) {
        return res
          .status(401)
          .json({ message: "Username atau password salah" });
      }

      const user = results[0];

      // Compare password with hashed password in DB
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return res.status(500).json({ message: "Server error" });

        if (!isMatch) {
          return res
            .status(401)
            .json({ message: "Username atau password salah" });
        }

        // Create JWT token with role information
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            role: user.role || "user",
            username: user.username,
            image: user.image,
          },
          "your_secret_key",
          { expiresIn: "1h" }
        );

        res.json({
          message: "Login successful",
          token,
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            image: user.image,
            role: user.role || "user",
          },
        });
      });
    });
  },

  register: (req, res) => {
    const { email, username, password, role } = req.body;

    console.log("Received registration data:", req.body);

    // Mengecek apakah email sudah terdaftar
    User.findByEmail(email, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Server error" });
      }

      if (results && results.length > 0) {
        return res.status(400).json({ message: "Email sudah terdaftar" });
      }

      // Menambahkan pengguna baru ke dalam database dengan role default 'user'
      User.create(
        { email, username, password, role: role || "user" },
        (err, result) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Gagal mendaftar pengguna" });
          }

          // Mengirimkan respons sukses
          res.status(201).json({ message: "Pengguna berhasil didaftarkan" });
        }
      );
    });
  },

  // Fungsi untuk membuat admin (hanya bisa diakses oleh admin yang sudah ada)
  createAdmin: (req, res) => {
    const { email, username, password } = req.body;

    // Verifikasi bahwa yang membuat request adalah admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Akses ditolak. Hanya admin yang dapat membuat admin baru.",
      });
    }

    // Cek apakah email sudah terdaftar
    User.findByEmail(email, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Server error" });
      }

      if (results && results.length > 0) {
        return res.status(400).json({ message: "Email sudah terdaftar" });
      }

      // Buat user baru dengan role admin
      User.create(
        { email, username, password, role: "admin" },
        (err, result) => {
          if (err) {
            return res.status(500).json({ message: "Gagal mendaftar admin" });
          }

          res.status(201).json({ message: "Admin berhasil didaftarkan" });
        }
      );
    });
  },
};

module.exports = authController;
