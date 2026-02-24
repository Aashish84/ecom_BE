const winston = require("winston");

/**
 * Logger Configuration
 * 
 * Winston logger for structured logging across the application.
 * - Logs to console with colored output for development visibility
 * - Log level can be controlled via LOG_LEVEL environment variable (default: 'info')
 * - Format includes timestamp and log level for better debugging
 * 
 * Future Enhancement:
 * File transports can be added to log to files (error.log, combined.log)
 * by uncommenting the File transport configuration below
 */

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  transports: [
    // Console output with color formatting
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(({ level, message, timestamp }) => {
          return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        }),
        winston.format.colorize({ all: true }) // apply color AFTER printf
      ),
    }),
    
    // TODO: Add file logging in production
    // new winston.transports.File({
    //   filename: "logs/error.log",
    //   level: "error",
    //   maxsize: 5242880, // 5MB
    //   maxFiles: 5,
    // }),
    // new winston.transports.File({
    //   filename: "logs/combined.log",
    //   maxsize: 5242880, // 5MB
    //   maxFiles: 5,
    // }),
  ],
});

module.exports = logger;