import dotenv from "dotenv";
import ParsedArgs from "minimist";
import path from "path";

dotenv.config();

const args = ParsedArgs(process.argv.slice(2), {
  alias: {
    p: "port",
    m: "mode",
    e: "env",
  },
  default: {
    port: process.env.PORT,
    mode: process.env.MODE,
    env: process.env.NODE_ENV,
  },
});

export const options = {
  server: {
    PORT: args.port,
    MODE: args.mode,
    NODE_ENV: args.env,
    DB_TYPE: process.env.DB_TYPE || "mongo",
    SECRET_SESSION: process.env.SECRET_SESSION,
  },
  mongo: {
    url:
      args.env === "TEST" ? process.env.MONGO_URL_TEST : process.env.MONGO_URL,
  },
  sqlite: {
    client: "sqlite",
    connection: {
      filename: path.join(import.meta.url, "../databases/mysqldb.sqlite"),
    },
    useNullAsDefault: true,
  },
  mail: {
    adminMail: process.env.ADMIN_MAIL,
    adminMailPass: process.env.ADMIN_MAIL_PASS,
    transporter: {
      host: process.env.TRANSPORTER_HOST,
      port: process.env.TRANSPORTER_PORT,
    },
  },
};
