const mongodb = require("mongodb")

module.exports = function(options){
    return function(req, res, next){
        const id = req.params[options.id]; 

        if(id === undefined){
            throw new Error('ID undefined');
        }

        if(!mongodb.ObjectID.isValid(id)){
            throw new Error('Invalid ID');
        }

        next();
    }
}