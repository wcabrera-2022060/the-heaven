'use strict'

import Hotel from '../hotel/hotel.model.js'
import Rating from '../rating/rating.model.js'
import { login } from '../user/user.controller.js'

// Controlador para crear una nueva calificación
export const createRating = async (req, res) => {
    try {
        let { _id } = req.user // Obtiene el ID del usuario desde el token
        let data = req.body
        // Verifica si el hotel existe
        let hotel = await Hotel.findById({ _id: data.hotel })
        if (!hotel) return res.status(404).send({ message: 'Hotel no encontrado' })
        data.user = _id // Asigna el ID del usuario a los datos de la calificación
        let rating = new Rating(data) // Crea una nueva instancia del modelo Rating
        await rating.save()
        // Define las rutas de población para los campos user y hotel
        const populateQuery = [{ path: 'user', select: '-password -role' }, { path: 'hotel' }]
        await rating.populate(populateQuery)
        return res.send({ message: 'Calificación creada exitosamente', rating })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error al guardar la calificación' })
    }
}

// Controlador para obtener todas las calificaciones
export const getRatings = async (req, res) => {
    try {
        // Define las rutas de población para los campos user y hotel
        const populateQuery = [{ path: 'user', select: '-password -role' }, { path: 'hotel' }]
        let ratings = await Rating.find({}).populate(populateQuery) // Busca todas las calificaciones y las popula
        return res.send({ message: 'Calificaciones encontradas', ratings })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error al obtener las calificaciones' })
    }
}

// Controlador para obtener una calificación específica por ID
export const getRating = async (req, res) => {
    try {
        let { id } = req.params
        // Define las rutas de población para los campos user y hotel
        const populateQuery = [{ path: 'user', select: '-password -role' }, { path: 'hotel' }]
        let rating = await Rating.findById({ _id: id }).populate(populateQuery)
        if (!rating) return res.status(404).send({ message: 'Calificación no encontrada' })
        return res.send({ message: 'Calificación encontrada', rating })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error al obtener la calificación' })
    }
}

// Controlador para actualizar una calificación
export const updateRating = async (req, res) => {
    try {
        let { _id } = req.user // Obtiene el ID del usuario desde el token
        let { id } = req.params
        let data = req.body
        // Verifica si el usuario tiene permiso para actualizar la calificación
        let { user } = await Rating.findById({ _id: id }) ?? { user: '' }
        if (user.toString() !== _id.toString()) return res.status(403).send({ message: 'No puedes actualizar esta calificación' })
        data.date = new Date() // Actualiza la fecha
        // Define las rutas de población para los campos user y hotel
        const populateQuery = [{ path: 'user', select: '-password -role' }, { path: 'hotel' }]
        let rating = await Rating.findByIdAndUpdate({ _id: id }, data, { new: true }).populate(populateQuery)
        if (!rating) return res.status(404).send({ message: 'Calificación no encontrada, no actualizada' })
        return res.send({ message: 'Calificación actualizada exitosamente', rating })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error al actualizar la calificación' })
    }
}

// Controlador para eliminar una calificación
export const deleteRating = async (req, res) => {
    try {
        let { _id } = req.user // Obtiene el ID del usuario desde el token
        let { id } = req.params
        // Verifica si el usuario tiene permiso para eliminar la calificación
        let { user } = await Rating.findById({ _id: id }) ?? { user: '' }
        if (user.toString() !== _id.toString()) return res.status(403).send({ message: 'No puedes eliminar esta calificación' })
        // Define las rutas de población para los campos user y hotel
        const populateQuery = [{ path: 'user', select: '-password -role' }, { path: 'hotel' }]
        let rating = await Rating.findByIdAndDelete({ _id: id }).populate(populateQuery)
        if (!rating) return res.status(404).send({ message: 'Calificación no encontrada, no eliminada' })
        return res.send({ message: 'Calificación eliminada exitosamente', rating })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error al eliminar la calificación' })
    }
}
