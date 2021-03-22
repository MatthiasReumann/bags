const NotAllowed = require('../utils/notAllowedError');

module.exports = function(req, res, next){
    next(new NotAllowed(new Error("Method Not Allowed")));
}