module.exports = function(options){
    return {
        build: function(base){
            const meta = {
                limit: options.limit,
                select: '' //select *
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