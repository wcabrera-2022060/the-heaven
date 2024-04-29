'use strict'
import { Schema, model } from "mongoose"

const eventSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    hotel: {
        type: Schema.ObjectId,
        ref: 'Hotel',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    guests: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    versionKey: false
})

export default model('Event', eventSchema)