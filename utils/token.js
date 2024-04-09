'use strict'

import jwt from 'jsonwebtoken'

export const createToken = async (payload) => {
    try {
        return jwt.sign(payload, process.env.SECRET_KEY, {
            algorithm: 'HS256',
            expiresIn: '3h'
        })
    } catch (error) {
        console.error(error)
        return error
    }
}