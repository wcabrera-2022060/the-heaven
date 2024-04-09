'use strict'

import Hotel from './hotel.model.js'

export const createHotel = async (req, res) => {
    try {
        let data = req.body
        let { _id } = await Hotel.findOne({ $or: [{ name: data.name }, { phone: data.phone }, { address: data.address }] }) ?? {}
        if (_id) return res.status(409).send({ message: 'Name, phone or address not available' })
        let hotel = new Hotel(data)
        await hotel.save()
        return res.send({ message: 'Hotel created successfully', hotel })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error creating hotel' })
    }
}

export const getHotels = async (req, res) => {
    try {
        let hotels = await Hotel.find({})
        return res.send({ message: 'Hotels found', hotels })
    } catch (error) {
        return res.status(500).send({ message: 'Error getting hotels' })
    }
}

export const getHotel = async (req, res) => {
    try {
        let { id } = req.params
        let hotel = await Hotel.findById({ _id: id })
        if (!hotel) return res.status(404).send({ message: 'Hotel not found' })
        return res.send({ message: 'Hotel found', hotel })
    } catch (error) {
        return res.status(500).send({ message: 'Error getting hotel' })
    }
}

export const updateHotel = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let { _id } = await Hotel.findOne({ $or: [{ name: data.name }, { phone: data.phone }, { address: data.address }] }) ?? {}
        if (_id) return res.status(409).send({ message: 'Name, phone or address not available' })
        let hotel = await Hotel.findByIdAndUpdate({ _id: id }, data, { new: true })
        if (!hotel) return res.status(404).send({ message: 'Hotel not found not updated' })
        return res.send({ message: 'Hotel updated successfully', hotel })
    } catch (error) {
        return res.status(500).send({ message: 'Error updating hotel' })
    }
}

export const deleteHotel = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let hotel = await Hotel.findByIdAndDelete({ _id: id })
        if (!hotel) return res.send({ message: 'Hotel not found not deleted' })
        return res.send({ message: 'Hotel deleted successfully', hotel })
    } catch (error) {
        return res.status(500).send({ message: 'Error deleting user' })
    }
}