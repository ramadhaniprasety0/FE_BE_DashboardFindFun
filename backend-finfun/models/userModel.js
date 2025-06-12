const db = require('../db');
const bcrypt = require('bcrypt'); 

const User = {
  findByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
  },

  create: (userData, callback) => {
    const { email, username, password, role } = userData;
    // Default role adalah 'user' jika tidak disediakan
    const userRole = role || 'user';

    // Hash password sebelum disimpan di database
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return callback(err);
      }

      // Menyimpan pengguna baru dengan password yang sudah di-hash dan role
      db.query('INSERT INTO users (email, username, password, role) VALUES (?, ?, ?, ?)', 
        [email, username, hashedPassword, userRole], callback);
    });
  },

  // Menambahkan fungsi untuk mendapatkan user berdasarkan ID
  findById: (id, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], callback);
  },

  // Menambahkan fungsi untuk mengupdate role user
  updateRole: (userId, role, callback) => {
    db.query('UPDATE users SET role = ? WHERE id = ?', [role, userId], callback);
  },
};

module.exports = User;
