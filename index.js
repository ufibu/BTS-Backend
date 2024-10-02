const mongoose = require('mongoose')
const app = require('./app');
const config = require('./config');
const logger = require('./utils/logger');

let server;
mongoose.connect(config.mongoose.url, {}).then(() => {
    logger.log("MongoDB connected", "info");
    logger.log(`Running in ${config.env} mode`, "info");
    server = app.listen(config.port, () => {
      logger.log(`Server started on port ${config.port}`, "info");
    });
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger('Server closed', 'info');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
}

const unexpectedErrorHandler = (error) => {
    logger(error, "error");
    exitHandler();
}

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
    logger("SIGTERM received", "info");
    if (server) {
        server.close();
    }
})