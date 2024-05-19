// const jwt = require("jsonwebtoken");

// function encodeRegistrationToken(email) {
//     let info = { email };
//     const token = jwt.sign(info, "yoursecretkey");
//     return token;
// }

// function decodeRegistrationToken(token) {
//     let decoded = jwt.verify(token, process.env.JWT_SECRT);

//     let email = decoded.email;

//     // Check that the user didn't take too long
//     let dateNow = new Date();
//     let tokenTime = decoded.iat * 1000;

//     // Two hours
//     let hours = 24;
//     let tokenLife = hours * 60 * 1000;

//     // User took too long to enter the code
//     if (tokenTime + tokenLife < dateNow.getTime()) {
//         return {
//             expired: true
//         };
//     }

//     // User registered in time
//     return {
//         email
//     };

// }

// module.exports = {
//     encodeRegistrationToken,
//     decodeRegistrationToken
// }
