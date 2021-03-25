module.exports = function(options){
    // build(base) returns meta object in the form of
    // {
    //      limit: <Number>
    //      fields: <mongoose query string in the form of 'a b c'>
    //      sort: <object containing one key:value pair in the form of 'field':(-1/1)>
    // }
    return {
        build: function(base){
            const meta = {
                limit: options.limit,
            };

            const sortParameter = base.sort;
            const limit = base.limit;
            const fields = base.fields;

            if(sortParameter !== undefined){
                const sort = {};
                if(sortParameter.charAt(0) == "-"){ //DESC
                    sort[sortParameter.substr(1)] = -1;
                }else{ //ASC
                    sort[sortParameter] = 1;
                }
                meta.sort = sort;
            }

            if(limit !== undefined && !isNaN(limit)){
                meta.limit = Number(limit);
            }

            if(fields !== undefined){
                meta.fields = fields.replace(',',' ');
            }

            return meta;
        }
    }
}