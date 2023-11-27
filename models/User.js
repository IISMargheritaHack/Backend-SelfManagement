import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    organizzatore: {
        type: Boolean,
        default: false
    },
    classe: {
        type: String,
        default: ""
    }
}, {timestamps: true})

export default mongoose.model('User', UserSchema)