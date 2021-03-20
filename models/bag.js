const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const itemSchema = new Schema({
    name: String,
    price: {type: Number, min: 0, default: 0},
    amount: {type: Number, min: 0, default: 0},
    isMarkedAsBought: {type: Boolean, default: false}
});

const bagSchema = new Schema({
    name: String,
    owner: ObjectId,
    createdAt: { type: Date, default: Date.now },
    items: { type: [itemSchema], default: []}
});

module.exports = mongoose.model('Bag', bagSchema);