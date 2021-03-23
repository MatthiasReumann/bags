const mongodb = require("mongodb");
const BadRequest = require('./errors/badRequestError');

module.exports = {
    id: function validate(id){
        if(id === undefined || !mongodb.ObjectID.isValid(id)) {
            return new BadRequest("ID undefined");
        } else if(!mongodb.ObjectID.isValid(id)) {
            return new BadRequest("ID invalid");
        }
    }
}