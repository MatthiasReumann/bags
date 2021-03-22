module.exports = function(req, res, next){
    const oauth_id = req.body.oauth_id;
    
    //you can only update the oauth_id
    if(oauth_id !== undefined){ //check if really is oauth id
        req.body = {
            oauth_id
        };
    }

    next();
}