'use strict'

import Room from './room.model.js'
import Hotel from '../hotel/hotel.model.js'

export const createRoom = async (req, res) => {
    try {
        let data = req.body
        let hotel = await Hotel.findById({ _id: data.hotel })
        if (!hotel) return res.status(404).send({ message: 'Enter a valid hotel' })
        data.aviability = true
        let room = new Room(data)
        await room.save()
        return res.send({ message: 'Room created successfully', room })
    } catch (error) {
        return res.status(500).send({ message: 'Error creating room' })
    }
}

export const getRooms = async (req, res) => {
    try {
        let rooms = await Room.find({})
        return res.send({ message: 'Rooms found', rooms })
    } catch (error) {
        return res.status(500).send({ message: 'Error getting rooms' })
    }
}

export const getRoom = async (req, res) => {
    try {
        let { id } = req.params
        let room = await Room.findById({ _id: id })
        if (!room) return res.status(404).send({ message: 'Room not found' })
        return res.send({ message: 'Room found', room })
    } catch (error) {
        return res.status(500).send({ message: 'Error getting room' })
    }
}

export const updateRoom = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let room = await Room.findByIdAndUpdate({ _id: id }, data, { new: true })
        if (!room) return res.status(404).send({ message: 'Room not found not updated' })
        return res.send({ message: 'Room updated successfully', room })
    } catch (error) {
        return res.status(500).send({ message: 'Error updating room' })
    }
}

export const deleteRoom = async (req, res) => {
    try {
        let { id } = req.params
        let room = await Room.findByIdAndDelete({ _id: id })
        if (!room) return res.status(404).send({ message: 'Room not found not deleted' })
        return res.send({ message: 'Room deleted successfully', room })
    } catch (error) {
        return res.status(500).send({ message: 'Error deleting room' })
    }
}