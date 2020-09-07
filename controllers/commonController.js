const nodemailer = require("nodemailer");
const { validationResult } = require("express-validator");

module.exports = {
  sendContactMail: (req, res) => {
    errorMessages = [];

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array().forEach((err) => {
        if (!errorMessages.includes(err.msg)) {
          errorMessages.push(err.msg);
        }
      });
      req.flash("errorMessages", errorMessages);
      return res.render("contact.ejs", {
        errorMessages: req.flash("errorMessages"),
      });
    }

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: "youremail@gmail.com",
      to: process.env.GMAIL_USERNAME,
      subject: `${req.body.name} wants to contact with you!`,
      text: `${req.body.name} sent you a message from your blog that he wants to contact you.\n He sent it from ${req.body.email} adding his phone number as: ${req.body.phone} and sent you a message:\n ${req.body.message}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.redirect("/");
  },
};
