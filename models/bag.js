const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const itemSchema = new Schema({
    id: {
        type: ObjectId,
        required: true
    },
    amount: {
        type: Number,
        min: 0,
        default: 0
    }
})
const bagSchema = new Schema({
    owner: {
        type: ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
        default: "my bag"
    },
    items: [itemSchema]
});

module.exports = mongoose.model('Bag', bagSchema);