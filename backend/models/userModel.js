const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the user's name"],
    },
    email: {
        type: String,
        required: [true, "Please add the user email address"],
        unique: [true, "Email address already taken"]
    },
    phone: {
        type: String,
        required: [true, "Please add the user phone number"]
    },
    password: {
        type: String,
        required: [true, "Please add the user password"]
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model("User", userSchema);
