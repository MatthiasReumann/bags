const mongoMapper = require('../utils/itemMongoMapper');
const metaBuilder = require('../utils/searchMetaBuilder');

module.exports = function(req, res, next){
        if(req.query !== undefined){
            req.meta = metaBuilder({limit: 50}).build(req.query);
            req.query = mongoMapper({}).map(req.query);
        }

        next();
}