import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "others"]
    },
    profilepicture: {
        type: String,
        default: ""
    }
});

const User = mongoose.model('User', userSchema);

export default User;
