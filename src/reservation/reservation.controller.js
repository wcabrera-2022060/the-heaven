'use strict'

import User from '../user/user.model.js'
import Room from '../room/room.model.js'
import Reservation from '../reservation/reservation.model.js'

export const createReservation = async (req, res) => {
    try {
        let data = req.body
        let { _id } = req.user
        let user = await User.findOne({ _id: _id })
        if (!user) return res.status(404).send({ message: 'User not found' })
        let room = await Room.findOne({ _id: data.room })
        if (!room) return res.status(404).send({ message: 'Room not found' })
        data.user = _id
        let reservation = new Reservation(data)
        await reservation.save()
        const populateQuery = [{ path: 'user', select: '-password' }, { path: 'room', populate: [{ path: 'hotel' }] }]
        await reservation.populate(populateQuery)
        return res.send({ message: 'Reservation saved successfully', reservation })
    } catch (error) {
        return res.status(500).send({ message: 'Error saving Reservation' })
    }
}

export const getReservations = async (req, res) => {
    try {
        const populateQuery = [{ path: 'user', select: '-password' }, { path: 'room', populate: [{ path: 'hotel' }] }]
        let reservations = await Reservation.find({}).populate(populateQuery)
        return res.send({ message: 'Reservations found', reservations })
    } catch (error) {
        return res.status(500).send({ message: 'Error gettings Reservations' })
    }
}

export const getReservation = async (req, res) => {
    try {
        let { id } = req.params
        const populateQuery = [{ path: 'user', select: '-password' }, { path: 'room', populate: [{ path: 'hotel' }] }]
        let reservation = await Reservation.findById({ _id: id }).populate(populateQuery)
        if (!reservation) return res.status(404).send({ message: 'Reservation not found' })
        return res.send({ message: 'Resertavion found', reservation })
    } catch (error) {
        return res.status(500).send({ message: 'Error getting reservation' })
    }
}

export const updateReservation = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let {_id} = req.user
        if (data.room) {
            let room = await Room.findById({ _id: data.room })
            if (!room) return res.status(404).send({ message: 'Room not found' })
        }
        let {user} = await Reservation.findById({_id: id}) ?? {}
        if(user.toString() !== _id.toString()) return res.status(403).send({message: 'You cannot update this reservation'})
        const populateQuery = [{ path: 'user', select: '-password' }, { path: 'room', populate: [{ path: 'hotel' }] }]
        let reservation = await Reservation.findByIdAndUpdate({ _id: id }, data, { new: true }).populate(populateQuery)
        if (!reservation) return res.status(404).send({ message: 'Reservation not found and not updated' })
        return res.send({ message: 'Reservation updated successfully', reservation })
    } catch (error) {
        return res.status(500).send({ message: 'Error updating reservation' })
    }
}


export const deleteReservation = async (req, res) => {
    try {
        let { id } = req.params
        let{_id} = req.user
        let {user} = await Reservation.findById({_id:id}) ?? { user: ''}
        if(user.toString() !== _id.toString()) return res.status(403).send({message: 'You cannot delete this reservation'})
        const populateQuery = [{ path: 'user', select: '-password' }, { path: 'room', populate: [{ path: 'hotel' }] }]
        let reservation = await Reservation.findByIdAndDelete({ _id: id }).populate(populateQuery)
        if (!reservation) return res.status(404).send({ message: 'Reservation not found and not deleted' })
        return res.send({ message: 'Reservation deleted successfully', reservation })
    } catch (error) {
        return res.status(500).send({ message: 'Error deleting Reservation' })
    }
}