import { transporter, mailOptions } from "../config/mail.config.js";
import { logger } from "../logs/logger.js";

export const sendMail = async (subject, html) => {
  try {
    mailOptions.subject = subject;
    mailOptions.html = html;
    const response = await transporter.sendMail(mailOptions);
    logger.info(response);
  } catch (error) {
    logger.error(error);
  }
};
