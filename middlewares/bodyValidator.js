const BadRequest = require("../utils/errors/badRequestError");

module.exports = function(req, res, next){
        const body = req.body;

        if(body.constructor === Object && Object.keys(body).length === 0){
            next(new BadRequest("Empty Request Body"));
        }else {
            next();
        }
};