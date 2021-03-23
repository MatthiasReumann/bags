const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = mongoose.Types.ObjectId;

// this is not the same schema as defined in 'item.js'
// here a item is just an id referencing an item and the amount 
// which is in a bag
const itemSchema = new Schema({
    id: ObjectID, // real item id
    amount: {
        type: Number,
        min: 0,
        default: 0
    }
})
const bagSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
        default: "my bag"
    },
    items: [itemSchema]
})

const userSchema = new Schema({
    isDeleted: {
        type: Boolean,
        default: false
    },
    oauth_id: {
        type: String
    },
    bags: [bagSchema],
    favorites: [ObjectID]
});

module.exports = mongoose.model('User', userSchema);