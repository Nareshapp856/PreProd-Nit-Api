const nodemailer = require("nodemailer");

const MAX_EMAIL_RETRY_COUNT = 2;
const EMAIL_RETRY_DELAY = 100;

/**
 * Sends an email using nodemailer.
 *
 * @param {string} to - Recipient email address.
 * @param {number} count - Current retry count.
 * @param {string} subject - Subject of the email.
 * @param {string} text - Plain text content of the email.
 * @param {string} [html=""] - HTML content of the email (optional).
 * @returns {Promise<boolean>} - Resolves to `true` if the email is sent successfully, or `false` if it fails after retries.
 */
const sendEmail = async (to, count = 0, subject, text, html = "") => {
  const chalk = (await import("chalk")).default;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(chalk.green("Email sent successfully to:"), chalk.blue(to));
    return true;
  } catch (error) {
    console.error(
      chalk.red("Error sending email:"),
      chalk.yellow(error.message)
    );

    if (count < MAX_EMAIL_RETRY_COUNT) {
      console.log(
        chalk.yellow(
          `Retrying email to ${to} (${count + 1}/${MAX_EMAIL_RETRY_COUNT})...`
        )
      );
      return new Promise((resolve) =>
        setTimeout(async () => {
          const result = await sendEmail(to, count + 1, subject, text, html);
          resolve(result);
        }, EMAIL_RETRY_DELAY)
      );
    } else {
      console.error(
        chalk.red(
          `Failed to send email to ${to} after ${MAX_EMAIL_RETRY_COUNT} attempts.`
        )
      );
      return false;
    }
  }
};

module.exports = { sendEmail };
