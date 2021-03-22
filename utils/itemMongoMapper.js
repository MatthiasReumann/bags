module.exports = function(options){
    return {
        map: function(base){
            const mapping = {};
        
            if(base.name !== undefined){
                mapping.name = base.name;
            }
        
            if(base.price !== undefined){
                if(typeof base.price === 'object'){ // req.body
                    if(base.price.amount !== undefined){
                        mapping['price.amount'] = base.price.amount;
                    }

                    if(base.price.price !== undefined){
                        mapping['price.price'] = base.price.price;
                    }

                    if(base.price.per !== undefined){
                        mapping['price.per'] = base.price.per;
                    }
                }else{
                    mapping['price.price'] = base.price; // req.query
                }
            }
        
            if(base.amount !== undefined){
                mapping['price.amount'] = base.amount;
            }
        
            if(base.per !== undefined){
                mapping['price.per'] = base.per;
            }
        
            if(base.shop !== undefined){
                mapping['price.shop.name'] = base.shop;
            }
        
            if(base.barcode !== undefined){
                mapping.barcode = base.barcode;
            }
        
            return mapping;
        }
    }
}