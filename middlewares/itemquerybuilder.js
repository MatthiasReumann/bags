module.exports = function(options){
    return function(req, res, next){
        if(req.method === "GET"){
            const query = {};
            const sort = {};

            req.meta = {
                limit: options.limit,
                select: '' //select *
            };

            const itemName = req.query.name;
            const itemPrice = req.query.price;
            const shopName = req.query.shopname;
            const itemBarcode = req.query.barcode;
            const sortParameter = req.query.sort;
            const limit = req.query.limit;
            const fields = req.query.fields;

            if(req.query !== undefined){
                if(itemName !== undefined){
                    query.name = itemName
                }
    
                if(itemPrice !== undefined && !isNaN(itemPrice)){
                    query["price.price"] = Number(itemPrice);
                }
    
                if(shopName !== undefined){
                    query["price.shop.name"] = shopName;
                }  
    
                if(itemBarcode !== undefined){
                    query.barcode = itemBarcode;
                }

                if(sortParameter !== undefined){
                    if(sortParameter.charAt(0) == "-"){ //DESC
                        sort[sortParameter.substr(1)] = -1;
                    }else{ //ASC
                        sort[sortParameter] = 1;
                    }
                    req.meta.sort = sort;
                }

                if(limit !== undefined && !isNaN(limit)){
                    req.meta.limit = Number(limit);
                }

                if(fields !== undefined){
                    req.meta.fields = fields.replace(',',' ');
                }
            }

            req.query = query;
        }

        next();
    }
}