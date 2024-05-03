'use strict'

import { Schema, model } from 'mongoose'

const serviceSchema = Schema({
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    versionKey: false
})

export default model('Service', serviceSchema)
