import { options } from "./config.js";
import { createTransport } from "nodemailer";

const adminMail = options.mail.adminMail;

const transporter = createTransport({
  host: options.mail.transporter.host,
  port: options.mail.transporter.port,
  auth: {
    user: adminMail,
    pass: options.mail.adminMailPass,
  },
});

const mailOptions = {
  from: "Server Node.js",
  to: adminMail,
  subject: "",
  html: '',
};

export { transporter, mailOptions };
