// utils/responseHandler.js
const successResponse = (res, data) => {
    res.status(200).json({
        status: true,
        data: data,
    });
};

const notFoundResponse = (res, message) => {
    res.status(404).json({
        status: false,
        message: message || 'Not Found',
    });
};

const errorResponse = (res, statusCode, message) => {
    res.status(statusCode || 500).json({
        status: false,
        message: message || 'Internal Server Error',
    });
};

module.exports = {
    successResponse,
    notFoundResponse,
    errorResponse,
};