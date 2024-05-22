'use strict'

import { compare, hash } from 'bcrypt'

export const encryptPassword = async (password) => {
    try {
        return await hash(password, 5)
    } catch (error) {
        console.error(error)
        return err
    }
}

export const comparePassword = async (password, passwordHash) => {
    try {
        return await compare(password, passwordHash)
    } catch (error) {
        console.error(error)
        return error
    }
}