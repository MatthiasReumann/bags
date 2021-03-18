const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const bagSchema = new Schema({
    name: String,
    owner: ObjectId,
    createdAt: { type: Date, default: Date.now },
    items: { type: [String], default: [] }
});

module.exports = mongoose.model('Bag', bagSchema);