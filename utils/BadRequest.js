module.exports = class BadRequest extends Error{
    constructor(error){
        super(error.message);

        this.data = { error };
        this.statusCode = 400;
    }
}