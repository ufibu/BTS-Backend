const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('./tools/morgan')
const ApiError = require('./utils/ApiError');
const { errorConverter, errorHandler } = require('./middlewares/error');

// Basic Security
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

// Route
const routes = require('./routes/v1')
const httpStatus = require('http-status');

const app = express();

app.use(morgan.errorHandler)
app.use(morgan.successHandler)

app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
app.use(compression())
app.use(cors())
app.options('*', cors())
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));

app.use('/v1', routes)


app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not Found'));
})

app.use(errorConverter)
app.use(errorHandler)

module.exports = app;