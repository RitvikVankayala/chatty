// const { encodeRegistrationToken, decodeRegistrationToken } = require("../utils/tokens");
// const User = require("../model/usermodel.js");

// const confirmEmail = async (req, res) => {
//     const token = req.params.token;
//     const email = req.params.email;

//     const value = decodeRegistrationToken(token);

//     if (value?.expired) {
//         const x = sendEmailForVerification(email);
//         return x;
//     } else if (value?.email === email) {

//         const user = await User.findOne({ Email: email });
//         user.verified = true;
//         await user.save();
//         res.json({
//             status: true,
//             msg: "Successfull."
//         });
//     }
// }

// module.exports = confirmEmail;
