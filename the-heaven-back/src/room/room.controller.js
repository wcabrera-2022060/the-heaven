'use strict'

import Room from './room.model.js'
import Hotel from '../hotel/hotel.model.js'

// Controlador para crear una nueva habitación
export const createRoom = async (req, res) => {
    try {
        let data = req.body
        // Verificar si el hotel asociado a la habitación existe
        let hotel = await Hotel.findById({ _id: data.hotel })
        if (!hotel) return res.status(404).send({ message: 'Ingrese un hotel válido' })
        // Establecer la disponibilidad de la habitación como verdadera por defecto
        data.availability = true
        let room = new Room(data)
        // Guardar la nueva habitación en la base de datos
        await room.save()
        return res.send({ message: 'Habitación creada exitosamente', room })
    } catch (error) {
        // Manejar errores en caso de que la creación de la habitación falle
        return res.status(500).send({ message: 'Error al crear la habitación' })
    }
}

// Controlador para obtener todas las habitaciones
export const getRooms = async (req, res) => {
    try {
        // Obtener todas las habitaciones de la base de datos
        let rooms = await Room.find({})
        return res.send({ message: 'Habitaciones encontradas', rooms })
    } catch (error) {
        // Manejar errores en caso de que la obtención de habitaciones falle
        return res.status(500).send({ message: 'Error al obtener las habitaciones' })
    }
}

// Controlador para obtener una habitación específica por su ID
export const getRoom = async (req, res) => {
    try {
        let { id } = req.params
        // Buscar la habitación por su ID en la base de datos
        let room = await Room.findById({ _id: id })
        if (!room) return res.status(404).send({ message: 'Habitación no encontrada' })
        return res.send({ message: 'Habitación encontrada', room })
    } catch (error) {
        // Manejar errores en caso de que la obtención de la habitación falle
        return res.status(500).send({ message: 'Error al obtener la habitación' })
    }
}

// Controlador para actualizar una habitación
export const updateRoom = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        // Actualizar la habitación en la base de datos
        let room = await Room.findByIdAndUpdate({ _id: id }, data, { new: true })
        if (!room) return res.status(404).send({ message: 'Habitación no encontrada, no actualizada' })
        return res.send({ message: 'Habitación actualizada exitosamente', room })
    } catch (error) {
        // Manejar errores en caso de que la actualización de la habitación falle
        return res.status(500).send({ message: 'Error al actualizar la habitación' })
    }
}

// Controlador para eliminar una habitación
export const deleteRoom = async (req, res) => {
    try {
        let { id } = req.params
        // Eliminar la habitación de la base de datos
        let room = await Room.findByIdAndDelete({ _id: id })
        if (!room) return res.status(404).send({ message: 'Habitación no encontrada, no eliminada' })
        return res.send({ message: 'Habitación eliminada exitosamente', room })
    } catch (error) {
        // Manejar errores en caso de que la eliminación de la habitación falle
        return res.status(500).send({ message: 'Error al eliminar la habitación' })
    }
}
