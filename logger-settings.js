const winston = require('winston');
const config = require('config');
const loggerSection = config.get('logger');

let logConfiguration = {
    'transports' : new (winston.transports.File)({
        filename :loggerSection.file_name,
        level :loggerSection.file_level
    })
};

let logger = winston.createLogger(logConfiguration);

module.exports = logger;

