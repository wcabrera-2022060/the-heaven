'use strict'

import { Schema, model } from 'mongoose'

const roomSchema = Schema({
    type: {
        type: String,
        enum: ['STANDARD', 'TWIN', 'FAMILY', 'VIP', 'SUITE'],
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    aviability: {
        type: Boolean,
        required: true
    },
    hotel: {
        type: Schema.ObjectId,
        ref: 'Hotel',
        required: true
    }
}, {
    versionKey: false
})

export default model('Room', roomSchema)