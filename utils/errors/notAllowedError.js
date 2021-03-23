module.exports = class NotAllowed extends Error{
    constructor(error){
        if(typeof error === 'string'){
            console.log(error);
            super(error);
        }else if(typeof error == 'object'){
            super(error.message);
        }

        this.data = { error };
        this.statusCode = 405;
    }
}