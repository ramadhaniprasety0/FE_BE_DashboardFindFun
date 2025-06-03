const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Mengambil token dari header Authorization

  if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan. Silakan login terlebih dahulu.' });
  }

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token tidak valid.' });
    }

    req.user = user;  // Menyimpan informasi pengguna ke dalam request
    next();  // Lanjutkan ke route berikutnya
  });
};

module.exports = authenticateToken;
