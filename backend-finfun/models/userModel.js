const db = require('../db');
const bcrypt = require('bcrypt'); 

const User = {
  findByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
  },

  create: (userData, callback) => {
    const { email, username, password } = userData;

    // Hash password sebelum disimpan di database
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return callback(err);
      }

      // Menyimpan pengguna baru dengan password yang sudah di-hash
      db.query('INSERT INTO users (email, username, password) VALUES (?, ?, ?)', [email, username, hashedPassword], callback);
    });
  },
};

module.exports = User;
