const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = mongoose.Types.ObjectId;

// this is not the same schema as defined in 'item.js'
// here a item is just an id referencing an item and the amount 
// which is in a bag

const userSchema = new Schema({
    isDeleted: {
        type: Boolean,
        default: false
    },
    oauth_id: {
        type: String
    },
    favorites: [ObjectID]
});

module.exports = mongoose.model('User', userSchema);