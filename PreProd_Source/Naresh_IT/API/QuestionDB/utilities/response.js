class Response{
    constructor(app)
    {
        app.use((req,res,next) => this.bindResponse(req,res,next));
    }
    bindResponse(req, res, next) {
        this.request = req;
        res.sendResponse = (response) => {
        res.json({
        status: 'success',
        data: response
        });
        };
        res.sendError = (error) => {
        if(error.httpCode) {
        res.status(error.httpCode);
        }
        res.json({
        status: 'error',
        error: error.code ? error.getError(): error
        });
        };
        next();
        }
}
module.exports = Response;