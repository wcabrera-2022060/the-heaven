'use strict'

import { Schema, model } from 'mongoose'

const hotelSchema = Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    versionKey: false
})

export default model('Hotel', hotelSchema)