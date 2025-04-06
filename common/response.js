const responseHandler = (res, status, success, message, data = null) => {
    res.status(status).json({
        success,
        message,
        data,
        status

    });
};


module.exports = {
    successResponse: (res, message, data = null, status = 200) =>
        responseHandler(res, status, true, message, data),
    failureResponse: (res, message, status = 400) =>
        responseHandler(res, status, message)
}