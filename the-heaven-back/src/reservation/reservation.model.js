'use strict'

import { Schema, model } from 'mongoose'

const reservationSchema = Schema({
    hotel: {
        type: Schema.ObjectId,
        ref: 'Hotel',
        required: true
    },
    numberAdults: {
        type: Number,
        required: true
    },
    numberKids: {
        type: Number,
        default: 0,
    },
    numberRooms: {
        type: Number,
        required: true
    },
    dateIn: {
        type: Date,
        required: true
    },
    dateOut: {
        type: Date,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    },
}, {
    versionKey: false
})

export default model('Reservation', reservationSchema)
