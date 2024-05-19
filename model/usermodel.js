const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    Email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
        min: 8,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: "",
    },
    // verified: {
    //     type: Boolean,
    //     default: false
    // }
});

module.exports = mongoose.model("Users", userSchema);