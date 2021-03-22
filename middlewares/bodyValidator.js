const BadRequest = require("../utils/badRequest");

module.exports = function(req, res, next){
        const body = req.body;

        if(body.constructor === Object && Object.keys(body).length === 0){
            next(new BadRequest(new Error("Empty Request Body")));
        }else {
            next();
        }
};