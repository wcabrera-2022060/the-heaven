'use strict'

import { Schema, model } from 'mongoose'

const reservationSchema = Schema({
    room: {
        type: Schema.ObjectId,
        ref: 'Room',
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
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
        type: String,
        required: true
    },
    dateOut: {
        type: String,
        required: true
    },
    services: [{
        service: {
            type: Schema.ObjectId,
            ref: 'Service'
        },
        quantity: {
            type: Number
        }
    }]
}, {
    versionKey: false
})

export default model('Reservation', reservationSchema)
