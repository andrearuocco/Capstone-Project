import {model, Schema} from 'mongoose'
import Profile from './profileSchema.js';

const commentsSchema = new Schema(
    {
        content: {
            type: String,
            minLength: 3,
            maxLength: 5000,
            required: true,
            trim: true, // elimina spazi bianchi all'inizio e alla fine del testo inserito in modo da non appesantire il database con caratteri inutili
        },
        profile: {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
        },
    },
    {
        collection: "comments",
        timestamps: true,
    }
)

export default model("Comment", commentsSchema)