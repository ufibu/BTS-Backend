const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { User, Token } = require("../models");
const jwt = require('jsonwebtoken');
const config = require("../config");
const JWT_SECRET = config.jwtSecret


const loginWithUsernameAndPassword = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect username');
    }

    const validPassword = await user.isPasswordMatch(password);
    if (!validPassword) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
    }

    const token = jwt.sign({ username: user.username, id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    const tokenEntry = new Token({ token });
    await tokenEntry.save();

    return { user: user.username, id: user.id, token }
}

const logout = async () => {
    const token = req.headers['authorization'].split(' ')[1];

    const loggedOut = await Token.findOneAndUpdate({ token }, { status: 'blacklisted' });

    return loggedOut
}

const register = async (username, email, password) => {
    const existingUser = await User.findOne({ username });
    if (existingUser) throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken');

    const newUser = new User({ username, email, password });
    await newUser.save();

    return newUser;
}

module.exports = {
    loginWithUsernameAndPassword,
    logout,
    register,
}