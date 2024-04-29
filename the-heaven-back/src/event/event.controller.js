'use strict'

import User from '../user/user.model.js'
import Hotel from '../hotel/hotel.model.js'
import Event from './event.model.js'

export const createEvent = async (req, res) => {
    try {
        let data = req.body
        let user = await User.findById({ _id: data.user })
        if (!user) return res.status(404).send({ message: 'User not found' })
        let hotel = await Hotel.findById({ _id: data.hotel })
        if (!hotel) return res.status(404).send({ message: 'Hotel not found' })
        let event = new Event(data)
        await event.save()
        const populateQuery = [{ path: 'user', select: '-password' }, { path: 'hotel' }]
        await event.populate(populateQuery)
        return res.send({ message: 'Event created successfully', event })
    } catch (error) {
        return res.status(500).send({ message: 'Error creating event' })
    }
}

export const getEvents = async (req, res) => {
    try {
        const populateQuery = [{ path: 'user', select: '-password' }, { path: 'hotel' }]
        let event = await Event.find({}).populate(populateQuery)
        return res.send({ message: 'Events found', event })
    } catch (error) {
        return res.status(500).send({ message: 'Error getting events' })
    }
}

export const getEvent = async (req, res) => {
    try {
        let { id } = req.params
        const populateQuery = [{ path: 'user', select: '-password' }, { path: 'hotel' }]
        let event = await Event.findById({ _id: id }).populate(populateQuery)
        if (!event) return res.status(404).send({ message: 'Event not found' })
        return res.send({ message: 'Event found', event })
    } catch (error) {
        return res.status(500).send({ message: 'Error getting event' })
    }
}

export const updateEvent = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        if (data.hotel) {
            let hotel = await Hotel.findById({ _id: data.hotel })
            if (!hotel) return res.status(404).send({ message: 'Hotel not found' })
        }
        const populateQuery = [{ path: 'user', select: '-password' }, { path: 'hotel' }]
        let event = await Event.findByIdAndUpdate({ _id: id }, data, { new: true }).populate(populateQuery)
        if (!event) return res.status(404).send({ message: 'Event not found not updated' })
        return res.send({ message: 'Event updated successfully', event })
    } catch (error) {
        return res.status(500).send({ message: 'Error updating event' })
    }
}

export const deleteEvent = async (req, res) => {
    try {
        let { id } = req.params
        const populateQuery = [{ path: 'user', select: '-password' }, { path: 'hotel' }]
        let event = await Event.findByIdAndDelete({ _id: id }).populate(populateQuery)
        if (!event) return res.status(404).send({ message: 'Event not found not deleted' })
        return res.send({ message: 'Event deleted successfully', event })
    } catch (error) {
        return res.status(500).send({ message: 'Error deleting event' })
    }
}