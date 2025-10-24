import mongoose from 'mongoose';
const { Schema } = mongoose;
import { v4 as uuidv4 } from 'uuid';

const userSchema = new Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


export default mongoose.model('Users', userSchema);
