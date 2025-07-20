const responseHandler = (res, status, message, data = null) => {
    res.status(status).json({
        message,
        data,
        status

    });
};


module.exports = {
    successResponse: (res, message, data = null, status = 200) =>
        responseHandler(res, status, message, data),
    failureResponse: (res, message, status = 400) =>
        responseHandler(res, status, message)
}