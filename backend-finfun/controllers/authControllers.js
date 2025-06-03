const User = require('../models/userModel');
const bcrypt = require('bcrypt');  // For password hashing
const jwt = require('jsonwebtoken');  // For generating JWT token

const authController = {
  login: (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });

      if (!results || results.length === 0) {
        return res.status(401).json({ message: 'Username atau password salah' });
      }

      const user = results[0];

      // Compare password with hashed password in DB
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return res.status(500).json({ message: 'Server error' });

        if (!isMatch) {
          return res.status(401).json({ message: 'Username atau password salah' });
        }

        // Create JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
      });
    });
  },

  register: (req, res) => {
    const { email, username, password } = req.body;

    console.log('Received music data:', req.body);

    // Mengecek apakah email sudah terdaftar
    User.findByEmail(email, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }

      if (results && results.length > 0) {
        return res.status(400).json({ message: 'Email sudah terdaftar' });
      }

      // Menambahkan pengguna baru ke dalam database
      User.create({ email, username, password }, (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Gagal mendaftar pengguna' });
        }

        // Mengirimkan respons sukses
        res.status(201).json({ message: 'Pengguna berhasil didaftarkan' });
      });
    });
  }
};

module.exports = authController;
