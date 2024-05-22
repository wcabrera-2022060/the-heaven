'use strict'

import { Schema, model } from 'mongoose'

const ratingSchema = Schema({
    hotel: {
        type: Schema.ObjectId,
        ref: 'Hotel',
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
}, {
    versionKey: false
})

export default model('Rating', ratingSchema)