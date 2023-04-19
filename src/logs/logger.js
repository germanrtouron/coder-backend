import log4js from 'log4js';

log4js.configure({
  appenders: {
    console: { type: "console" },
    warn: { type: "file", filename: "./src/logs/warn.log", level: "warn" },
    error: { type: "file", filename: "./src/logs/error.log", level: "error" },
    loggerConsole: {
      type: "logLevelFilter",
      appender: "console",
      level: "info",
    },
    loggerError: { type: "logLevelFilter", appender: "error", level: "error" },
  },
  categories: {
    default: { appenders: ["loggerConsole", "loggerError"], level: "all" },
    production: { appenders: ["loggerError"], level: "all" },
  },
});

export const logger = log4js.getLogger();
