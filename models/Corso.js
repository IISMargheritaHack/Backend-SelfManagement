
import mongoose from "mongoose";

const CorsoSchema = new mongoose.Schema({
    name: {
        type: String,
        reuired: true
    },
    desc: {
        type: String
    },
    iscritti: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        default: []
    },
    img: {
        type: String
    },
    classe: {
        type: String
    },
    capienzaMassima: {
        type: Number
    },
    durata: {
        type: Number
    },
    organizzatore: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

export default mongoose.model('Corso', CorsoSchema)

