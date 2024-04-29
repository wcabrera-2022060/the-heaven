'use strict'

import { Schema, model } from "mongoose"

const serviceSchema = Schema({
    reservation: {
        type: Schema.ObjectId,
        ref: 'Reservation',
        required: true
    },
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
    quantity: {
        type: Number,
        required: true
    }
}, {
    versionKey: false
})

export default model('Service', serviceSchema)