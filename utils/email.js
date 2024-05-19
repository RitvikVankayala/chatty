// const nodemailer = require("nodemailer");

// const { encodeRegistrationToken } = require("../utils/tokens");

// const sendEmailForVerification = (email) => {
//     const token = encodeRegistrationToken(email);
//     const transpoter = nodemailer.createTestAccount({
//         host: "mail.smtp2go.com",
//         port: 8025,
//         secure: true,
//         auth: {
//             user: process.env.SENDGRID_USERNAME,
//             pass: process.env.SENDGRID_PASSWORD
//         }
//     });

//     const mailOptions = { from: "21je0643@iitism.ac.in", to: email, subject: "Account Verification Link", text: 'Hello ' + email + ',\n\n' + 'Please verify your account by clicking the link: \n' + process.env.URL + '\/confirmation\/' + email + '\/' + token + '\n\nThank You!\n' };

//     transpoter.sendMail(mailOptions, (err) => {
//         if (err) {
//             return { status: false, msg: 'Technical Issue!, Please click on resend for verify your Email.' };
//         }
//         return { staus: true, msg: 'A verification email has been sent to ' + email + '. It will be expire after one day. If you not get verification Email click on resend token.' }
//     })
// }

// module.exports = sendEmailForVerification;
