const mongodb = require("mongodb")

module.exports = {
    id: function validate(id){
        if(id === undefined || !mongodb.ObjectID.isValid(id)) {
            return new Error("ID undefined");
        } else if(!mongodb.ObjectID.isValid(id)) {
            return new Error("ID invalid");
        }
    }
}