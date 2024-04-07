'use strict'

import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('Connect Mongo DB')
    } catch (error) {
        console.error(error)
        return error
    }
}