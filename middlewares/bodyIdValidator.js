const validator = require('../utils/validate');

module.exports = function(options){
    return function(req, res, next){
            const err = validator.id(req.body[options.id]);
            if(err !== undefined){
                next(err);
            }else{
                next();
            }       
        }
}