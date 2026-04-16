const express = require('express');
const router = express.Router();
const FoodEntry = require('../models/FoodEntry');

// @route   GET /api/food
// @desc    Get all food entries
router.get('/', async (req, res) => {
    try {
        const entries = await FoodEntry.find().sort({ timestamp: -1 });
        res.json(entries);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/food
// @desc    Add a new food entry
router.post('/', async (req, res) => {
    try {
        const newEntry = new FoodEntry(req.body);
        const entry = await newEntry.save();
        res.json(entry);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/food/:id
// @desc    Delete a food entry
router.delete('/:id', async (req, res) => {
    try {
        const entry = await FoodEntry.findById(req.params.id);

        if (!entry) {
            return res.status(404).json({ msg: 'Entry not found' });
        }

        await entry.deleteOne();
        res.json({ msg: 'Entry removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Entry not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;
