const mongodb = require("mongodb")

module.exports = function(options){
    return function(req, res, next){
        const id = req.params[options.id]; 

        if(id === undefined || !mongodb.ObjectID.isValid(id)) {
            next(new Error("ID undefined"));
            //res.status(400).send("ID undefined");
        } else if(!mongodb.ObjectID.isValid(id)) {
            next(new Error("ID invalid"));
        } else {
            next();
        }
    }
}