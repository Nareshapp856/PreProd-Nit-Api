const nodemailer = require("nodemailer");

function mailsend(UserId, Name, Email, Password) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "virtuallab@nareshit.com",
      //   user: process.env.EMAIL_USER,
      pass: "flty lonc aczf ggqv",
      //   pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "virtuallab@nareshit.com",
    to: Email,
    bcc: UserId,
    subject: ` Welcome to NareshIT ERP – Your Gateway to Learning and Growth!`,

    text: `Dear ${Name}

Welcome to NareshIT! We are thrilled to have you as part of our learning community. We take great pride in providing quality IT training and skill development, and we are excited to be a part of your learning journey.

At NareshIT, we believe in providing a seamless learning experience, and to support your progress, we have developed a dedicated ERP platform that will empower you to manage your learning more effectively. Through this portal, you can access:

    Session Schedules – Stay updated with your upcoming classes.
    Assessment Schedules – Keep track of your tests and evaluations.
    Assignments – View and submit assignments on time.
    To-Do List – Stay organized and never miss any tasks.
    Performance Analytics – Track your progress and overall performance.

To get started, please log in to the portal using the following credentials:

    Login URL: [Insert URL here]
    Username: ${Email}
    Password: ${Password}

Important: Please change your password immediately after your first login for security purposes.

We hope you make the most of your time with us, and we are confident that our platform, combined with our expert trainers and innovative courses, will help you achieve your professional goals.Should you have any questions or need assistance, feel free to reach out to our support team at [Support Email] or [Support Phone Number].

Once again, welcome to NareshIT. We look forward to being a part of your learning success!

Warm regards,
Team NareshIT
[Contact Information]
[Website URL]`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
      return error;
    } else {
      console.log("Email sent: " + info);
      return "success";
    }
  });
}

module.exports = mailsend;
