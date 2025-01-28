
class Helper {
    static getException({error, message}) {
    if(error instanceof EXCEPTION) {
    return error;
    } else {
    console.error(error);
    console.error(error.stack);
    return new global.EXCEPTION('UnKnownError', message);
    }
    }
    }
    module.exports = Helper;