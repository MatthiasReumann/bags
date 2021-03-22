const mongoMapper = require('../utils/itemMongoMapper');

module.exports = function(req, res, next){
    req.body = mongoMapper({}).map(req.body);
    next();
}