import { Schema, model } from 'mongoose';

const poemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        default: 'Anonymous'
    },
    imageUrl: {
        type: String,
        required: false
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
});

poemSchema.index({ location: '2dsphere' });

const Poem = model('Poem', poemSchema);

export default Poem;