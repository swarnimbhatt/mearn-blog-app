const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    firstName: { type: String, required: true, min: 2},
    lastName: { type: String, required: true, min: 2 },
    username: { type: String, required: true, min: 4, unique: true },
    password: { type: String, required: true, min: 4 },
    profilePic: { type: String },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;