const responseHandler = (res, status, success, message, data = null) => {
    res.status(status).json({
        success,
        message,
        data
    });
};


module.exports = {
    successResponse: (res, message, data) => 
        responseHandler(res, 200, true, message, data),
    failureResponse: (res, message, status = 400) => 
        responseHandler(res, status, message)
}