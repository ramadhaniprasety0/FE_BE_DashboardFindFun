const Ulasan = require('../models/ulasanModel');


const ulasanControllers = {
    getAll: (req, res) => {
        Ulasan.getAll((err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json(result);
            }
        });
    },
    
    getById: (req, res) => {
        const id = req.params.id;
        Ulasan.getById(id, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
            }
            res.json({
                success: true,
                data: result,
                count: result.length
            }) 
        });
    },

    create: (req, res) => {

        console.log('Received ulasan data:', req.body);

        const ulasan = req.body;

        if (!ulasan) {
            res.status(400).json({ error: 'Missing ulasan data' });
            return;
        }

        Ulasan.create(ulasan, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).json(result);
            }
        });
    },
}

module.exports = ulasanControllers