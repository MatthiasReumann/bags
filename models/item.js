const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema({
    name: String,
    longitude: String,
    latitude: String,
});

const priceSchema = new Schema({
    price: {type: Number, min: 0, default: 0},
    shop: shopSchema
});

const nutritionSchema = new Schema({
    fats: {type: Number, min: 0, default: 0},
    carbs: {type: Number, min: 0, default: 0},
    protein: {type: Number, min: 0, default: 0},
});

const itemSchema = new Schema({
    name: String,
    price: [priceSchema],
    barcode: String,
    nutrition: nutritionSchema
});

module.exports = mongoose.model("Item", itemSchema);