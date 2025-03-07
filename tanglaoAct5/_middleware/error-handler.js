"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    if (typeof err === 'string') {
        // Custom application error
        const is404 = err.toLowerCase().endsWith('not found');
        const statusCode = is404 ? 404 : 400;
        return res.status(statusCode).json({ message: err });
    }
    // Default to 500 server error
    return res.status(500).json({ message: err.message || 'Internal Server Error' });
}
exports.default = errorHandler;
