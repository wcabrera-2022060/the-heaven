'use strict'

import { comparePassword, encryptPassword } from '../../utils/encrypt.js'
import { createToken } from '../../utils/token.js'
import User from './user.model.js'

export const createUser = async (req, res) => {
    try {
        let data = req.body
        let { _id } = await User.findOne({ $or: [{ username: data.username }, { email: data.email }] }) ?? {}
        if (_id) return res.status(409).send({ message: 'Username or email not available' })
        data.role = 'CLIENT'
        data.password = await encryptPassword(data.password)
        let user = new User(data)
        await user.save()
        const { password, ...userInfo } = user.toObject()
        let token = await createToken(userInfo)
        res.cookie('token', token)
        return res.send({ message: 'User created successfully', user })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error creating user' })
    }
}

export const login = async (req, res) => {
    try {
        let { username, email, password } = req.body
        let user = await User.findOne({ $or: [{ username: username }, { email: email }] })
        if (user && await comparePassword(password, user.password)) {
            let { password, ...userInfo } = user._doc
            let token = await createToken(userInfo)
            res.cookie('token', token)
            return res.send({
                message: `Welcome ${user.username}`,
                userInfo, token
            })
        }
        return res.status(404).send({ message: 'Invalid credentials' })
    } catch (error) {
        return res.status(500).send({ message: 'Error to login' })
    }
}

export const getUsers = async (req, res) => {
    try {
        let users = await User.find({}, { password: 0 })
        return res.send({ message: 'Users found', users })
    } catch (error) {
        return res.status(500).send({ message: 'Error getting users' })
    }
}

export const getUser = async (req, res) => {
    try {
        let { id } = req.params
        let user = await User.findById({ _id: id }, { password: 0 })
        if (!user) return res.status(404).send({ message: 'User not found' })
        return res.send({ message: 'User found', user })
    } catch (error) {
        return res.status(500).send({ message: 'Error getting user' })
    }
}

export const updateUser = async (req, res) => {
    try {
        let { _id } = req.user
        let { id } = req.params
        let data = req.body
        let { _id: exist } = await User.findOne({ $or: [{ username: data.username }, { email: data.email }] }) ?? {}
        if (exist) return res.status(409).send({ message: 'Username or email not available' })
        if (id == _id) {
            let user = await User.findByIdAndUpdate({ _id: id }, data, { new: true })
            if (!user) return res.status(404).send({ message: 'User not found not updated' })
            return res.send({ message: 'User updated successfully', user })
        }
        return res.status(403).send({ message: 'You do not have permission to delete this user' })
    } catch (error) {
        return res.status(500).send({ message: 'Error updating user' })
    }
}

export const deleteUser = async (req, res) => {
    try {
        let { _id } = req.user
        let { id } = req.params
        if (id == _id) {
            let user = await User.findByIdAndDelete({ _id: id })
            if (!user) return res.status(404).send({ message: 'User not found not deleted' })
            return res.send({ message: 'User deleted successfully', user })
        }
        return res.status(403).send({ message: 'You do not have permission to update this user' })
    } catch (error) {
        return res.status(500).send({ message: 'Error deleting user' })
    }
}