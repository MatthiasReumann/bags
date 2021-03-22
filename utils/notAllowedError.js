module.exports = class NotAllowed extends Error{
    constructor(error){
        super(error.message);

        this.data = { error };
        this.statusCode = 405;
    }
}