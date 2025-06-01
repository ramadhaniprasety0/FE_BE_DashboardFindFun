const Album = require('../models/albumModel');

const albumControllers = {
  getAll: (req, res) => {
    Album.getAll((err, results) => {
      if (err) {
        console.error('Error fetching albums:', err);
        return res.status(500).json({ error: 'Failed to fetch albums' });
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

    Album.getById(id, (err, result) => {
      if (err) {
        console.error('Error fetching album:', err);
        return res.status(500).json({ error: 'Failed to fetch album' });
      }
      
      if (!result || result.length === 0) {
        return res.status(404).json({ error: 'Album not found' });
      }
      
      res.json({
        success: true,
        data: result[0]
      });
    });
  },

  create: (req, res) => {
    const album = req.body;
    console.log('Creating album:', album);
    
    // Validation
    if (!album.title || !album.release_year || !album.deskripsi || !album.genre || !album.image) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['title', 'release_year', 'deskripsi', 'genre', 'image']
      });
    }

    Album.create(album, (err, result) => {
      if (err) {
        console.error('Error creating album:', err);
        return res.status(500).json({ error: 'Failed to create album' });
      }
      res.status(201).json({
        success: true,
        message: 'Album created successfully',
        data: { id: result.insertId, ...album }
      });
    });
  },

  update: (req, res) => {
    const id = req.params.id;
    const album = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    Album.update(id, album, (err, result) => {
      if (err) {
        console.error('Error updating album:', err);
        return res.status(500).json({ error: 'Failed to update album' });
      }
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Album not found' });
      }
      
      res.json({
        success: true,
        message: 'Album updated successfully'
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    Album.delete(id, (err, result) => {
      if (err) {
        console.error('Error deleting album:', err);
        return res.status(500).json({ error: 'Failed to delete album' });
      }
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Album not found' });
      }
      
      res.json({
        success: true,
        message: 'Album deleted successfully'
      });
    });
  }
};

module.exports = albumControllers;