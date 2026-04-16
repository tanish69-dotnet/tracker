const mongoose = require('mongoose');

const FoodEntrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    calories: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        default: 0
    },
    carbs: {
        type: Number,
        default: 0
    },
    fat: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: String, // YYYY-MM-DD format as used in frontend
        required: true
    },
    timestamp: {
        type: Number,
        default: Date.now
    }
});

module.exports = mongoose.model('FoodEntry', FoodEntrySchema);
