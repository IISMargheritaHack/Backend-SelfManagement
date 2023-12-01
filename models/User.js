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
    iscrizioni: {
        type: Number,
        default: 0
    },
    classe: {
        type: String,
        default: ""
    }
}, {timestamps: true})

export default mongoose.model('User', UserSchema)