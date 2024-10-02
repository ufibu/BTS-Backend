const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authenticateToken } = require("../middlewares/authentication");
const { loginWithUsernameAndPassword, logout, register } = require("../services/auth.service");


const loginAccount = catchAsync(async (req, res) => {
    try {
        const { username, password } = req.body;
        const { user, token } = await loginWithUsernameAndPassword(username, password);
        res.json({ user, token });
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
    }
});

const logoutAccount = catchAsync(authenticateToken, async (req, res) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        await logout(token);
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
    }
});

const registerAccount = catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = await register(username, email, password);
        res.json(user);
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
});

module.exports = {
    loginAccount,
    logoutAccount,
    registerAccount,
};