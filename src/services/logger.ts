import { createLogger, transports, format } from 'winston';

const logConfiguration = {
  transports: [
    new transports.Console({ level: 'info' }),
    new transports.File({ filename: './logs/warn.log', level: 'warn' }),
    new transports.File({ filename: './logs/error.log', level: 'error' }),
  ],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  
}; 

export default createLogger(logConfiguration);