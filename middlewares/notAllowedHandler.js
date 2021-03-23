const NotAllowed = require('../utils/errors/notAllowedError');

module.exports = function(req, res, next){
    next(new NotAllowed("Method Not Allowed"));
}