const Film = require('../models/filmModel');
const path = require('path');

const filmControllers = {
  getAll: (req, res) => {
    Film.getAll((err, results) => {
      if (err) {
        console.error('Error fetching films:', err);
        return res.status(500).json({ error: 'Failed to fetch films' });
      }
      res.json({
        success: true,
        data: results,
        count: results.length
      });
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    Film.getById(id, (err, result) => {
      if (err) {
        console.error('Error fetching film:', err);
        return res.status(500).json({ error: 'Failed to fetch film' });
      }
      
      if (!result || result.length === 0) {
        return res.status(404).json({ error: 'Film not found' });
      }
      
      res.json({
        success: true,
        data: result[0]
      });
    });
  },

  create: (req, res) => {
    const film = {
      title: req.body.title,
      deskripsi: req.body.description,
      release_year: req.body.release_year,
      rating: req.body.rating,
      genre: req.body.genre,
      duration: req.body.duration,
      actor: req.body.actor,
      director: req.body.director,
      status_film: req.body.status_film,
      netflix_link: req.body.netflix,
      appletv_link: req.body.appletv,
      hbogo_link: req.body.hbogo,
      bioskop_link: req.body.bioskop,
      image: req.file ? `uploads/${req.file.filename}` : null,  // <--- fix
      like_user: 0,
      dislike: 0
    };
  
    // Validasi wajib
    if (!film.title || !film.genre) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    Film.create(film, (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to create film' });
      res.status(201).json({ success: true, message: 'Film created', data: { id: result.insertId, ...film } });
    });
  },

  update: (req, res) => {
    const id = req.params.id;

    const image = req.file ? `uploads/${req.file.filename}` : req.body.existingImage;

    const film = {
      title: req.body.title,
      deskripsi: req.body.description,
      release_year: req.body.release_year,
      rating: req.body.rating,
      genre: req.body.genre,
      duration: req.body.duration,
      actor: req.body.actor,
      director: req.body.director,
      status_film: req.body.status_film,
      netflix_link: req.body.netflix,
      appletv_link: req.body.appletv,
      hbogo_link: req.body.hbogo,
      bioskop_link: req.body.bioskop,
      image: image,
      like_user: 0,
      dislike: 0
    };
  
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
  
    Film.update(id, film, (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to update film' });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Film not found' });
      res.json({ success: true, message: 'Film updated successfully' });
    });
  },
  

  
  // update: (req, res) => {
  //   const id = req.params.id;
  //   const film = {
  //     title: req.body.title,
  //     deskripsi: req.body.description,
  //     release_year: req.body.release_year,
  //     rating: req.body.rating,
  //     genre: req.body.genre,
  //     duration: req.body.duration,
  //     actor: req.body.actor,
  //     director: req.body.director,
  //     status_film: req.body.status_film,
  //     netflix_link: req.body.netflix,
  //     appletv_link: req.body.appletv,
  //     hbogo_link: req.body.hbogo,
  //     bioskop_link: req.body.bioskop,
  //     image: req.body.imageFile 
  //   };
  
  //   if (!id || isNaN(id)) {
  //     return res.status(400).json({ error: 'Invalid ID format' });
  //   }
  
  //   // Validate rating if provided
  //   if (film.rating && (film.rating < 1 || film.rating > 10)) {
  //     return res.status(400).json({ 
  //       error: 'Rating must be between 1 and 10'
  //     });
  //   }
  
  //   Film.update(id, film, (err, result) => {
  //     if (err) {
  //       console.error('Error updating film:', err);
  //       return res.status(500).json({ error: 'Failed to update film' });
  //     }
      
  //     if (result.affectedRows === 0) {
  //       return res.status(404).json({ error: 'Film not found' });
  //     }
      
  //     res.json({
  //       success: true,
  //       message: 'Film updated successfully'
  //     });
  //   });
  // },
  
  delete: (req, res) => {
    const id = req.params.id;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    Film.delete(id, (err, result) => {
      if (err) {
        console.error('Error deleting film:', err);
        return res.status(500).json({ error: 'Failed to delete film' });
      }
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Film not found' });
      }
      
      res.json({
        success: true,
        message: 'Film deleted successfully'
      });
    });
  },

  search: (req, res) => {
    const searchTerm = req.query.q;
    
    if (!searchTerm) {
      return res.status(400).json({ error: 'Search term is required' });
    }

    Film.search(searchTerm, (err, results) => {
      if (err) {
        console.error('Error searching films:', err);
        return res.status(500).json({ error: 'Failed to search films' });
      }
      
      res.json({
        success: true,
        data: results,
        count: results.length,
        searchTerm: searchTerm
      });
    });
  },

  getByGenre: (req, res) => {
    const genre = req.params.genre;
    
    if (!genre) {
      return res.status(400).json({ error: 'Genre is required' });
    }

    Film.getByGenre(genre, (err, results) => {
      if (err) {
        console.error('Error fetching films by genre:', err);
        return res.status(500).json({ error: 'Failed to fetch films by genre' });
      }
      
      res.json({
        success: true,
        data: results,
        count: results.length,
        genre: genre
      });
    });
  }
};

module.exports = filmControllers;