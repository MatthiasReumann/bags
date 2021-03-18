const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: String,
    price: {type: Number, min: 0, default: 0},
    amount: {type: Number, min: 0, default: 0},
    isMarkedAsBought: {type: Boolean, default: false}
});

module.exports = itemSchema;
