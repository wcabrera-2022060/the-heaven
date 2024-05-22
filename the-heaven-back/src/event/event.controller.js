'use strict'

import User from '../user/user.model.js'
import Hotel from '../hotel/hotel.model.js'
import Event from './event.model.js'

// Controlador para crear un evento
export const createEvent = async (req, res) => {
    try {
        let data = req.body
        // Buscar el usuario por ID
        let user = await User.findById({ _id: data.user })
        if (!user) return res.status(404).send({ message: 'Usuario no encontrado' })
        // Buscar el hotel por ID
        let hotel = await Hotel.findById({ _id: data.hotel })
        if (!hotel) return res.status(404).send({ message: 'Hotel no encontrado' })
        // Crear un nuevo evento con los datos proporcionados
        let event = new Event(data)
        await event.save()
        // Poblar los campos user y hotel del evento
        const populateQuery = [{ path: 'user', select: '-password' }, { path: 'hotel' }]
        await event.populate(populateQuery)
        return res.send({ message: 'Evento creado exitosamente', event })
    } catch (error) {
        return res.status(500).send({ message: 'Error al crear el evento' })
    }
}

// Controlador para obtener todos los eventos
export const getEvents = async (req, res) => {
    try {
        // Poblar los campos user y hotel de los eventos
        const populateQuery = [{ path: 'user', select: '-password' }, { path: 'hotel' }]
        let event = await Event.find({}).populate(populateQuery)
        return res.send({ message: 'Eventos encontrados', event })
    } catch (error) {
        return res.status(500).send({ message: 'Error al obtener los eventos' })
    }
}

// Controlador para obtener un evento específico
export const getEvent = async (req, res) => {
    try {
        let { id } = req.params
        // Poblar los campos user y hotel del evento
        const populateQuery = [{ path: 'user', select: '-password' }, { path: 'hotel' }]
        let event = await Event.findById({ _id: id }).populate(populateQuery)
        if (!event) return res.status(404).send({ message: 'Evento no encontrado' })
        return res.send({ message: 'Evento encontrado', event })
    } catch (error) {
        return res.status(500).send({ message: 'Error al obtener el evento' })
    }
}

// Controlador para actualizar un evento
export const updateEvent = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        // Verificar si el hotel existe antes de actualizar
        if (data.hotel) {
            let hotel = await Hotel.findById({ _id: data.hotel })
            if (!hotel) return res.status(404).send({ message: 'Hotel no encontrado' })
        }
        // Poblar los campos user y hotel del evento
        const populateQuery = [{ path: 'user', select: '-password' }, { path: 'hotel' }]
        let event = await Event.findByIdAndUpdate({ _id: id }, data, { new: true }).populate(populateQuery)
        if (!event) return res.status(404).send({ message: 'Evento no encontrado, no actualizado' })
        return res.send({ message: 'Evento actualizado exitosamente', event })
    } catch (error) {
        return res.status(500).send({ message: 'Error al actualizar el evento' })
    }
}

// Controlador para eliminar un evento
export const deleteEvent = async (req, res) => {
    try {
        let { id } = req.params
        // Poblar los campos user y hotel del evento
        const populateQuery = [{ path: 'user', select: '-password' }, { path: 'hotel' }]
        let event = await Event.findByIdAndDelete({ _id: id }).populate(populateQuery)
        if (!event) return res.status(404).send({ message: 'Evento no encontrado, no eliminado' })
        return res.send({ message: 'Evento eliminado exitosamente', event })
    } catch (error) {
        return res.status(500).send({ message: 'Error al eliminar el evento' })
    }
}
