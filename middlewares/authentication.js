const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const config = require('../config');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Access denied');
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
        }

        req.user = decoded; 

        next();
    });
};

module.exports = {
    authenticateToken
}