'use strict'

import Hotel from './hotel.model.js'

// Controlador para crear un nuevo hotel
export const createHotel = async (req, res) => {
    try {
        let data = req.body
        // Verificar si ya existe un hotel con el mismo nombre, teléfono o dirección
        let { _id } = await Hotel.findOne({ $or: [{ name: data.name }, { phone: data.phone }, { address: data.address }] }) ?? {}
        if (_id) return res.status(409).send({ message: 'Nombre, teléfono o dirección no disponibles' })
        // Crear una nueva instancia del modelo Hotel con los datos proporcionados
        let hotel = new Hotel(data)
        await hotel.save()
        return res.send({ message: 'Hotel creado exitosamente', hotel })
    } catch (error) {
        return res.status(500).send({ message: 'Error al crear el hotel' })
    }
}

// Controlador para obtener todos los hoteles
export const getHotels = async (req, res) => {
    try {
        // Buscar todos los hoteles en la base de datos
        let hotels = await Hotel.find({})
        return res.send({ message: 'Hoteles encontrados', hotels })
    } catch (error) {
        return res.status(500).send({ message: 'Error al obtener los hoteles' })
    }
}

// Controlador para obtener un hotel específico por ID
export const getHotel = async (req, res) => {
    try {
        let { id } = req.params
        // Buscar el hotel por ID
        let hotel = await Hotel.findById({ _id: id })
        if (!hotel) return res.status(404).send({ message: 'Hotel no encontrado' })
        return res.send({ message: 'Hotel encontrado', hotel })
    } catch (error) {
        return res.status(500).send({ message: 'Error al obtener el hotel' })
    }
}

// Controlador para actualizar un hotel
export const updateHotel = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        // Verificar si ya existe un hotel con el mismo nombre, teléfono o dirección
        let { _id } = await Hotel.findOne({ $or: [{ name: data.name }, { phone: data.phone }, { address: data.address }] }) ?? {}
        if (_id) return res.status(409).send({ message: 'Nombre, teléfono o dirección no disponibles' })
        // Actualizar el hotel por ID con los nuevos datos
        let hotel = await Hotel.findByIdAndUpdate({ _id: id }, data, { new: true })
        if (!hotel) return res.status(404).send({ message: 'Hotel no encontrado, no actualizado' })
        return res.send({ message: 'Hotel actualizado exitosamente', hotel })
    } catch (error) {
        return res.status(500).send({ message: 'Error al actualizar el hotel' })
    }
}

// Controlador para eliminar un hotel
export const deleteHotel = async (req, res) => {
    try {
        let { id } = req.params
        // Eliminar el hotel por ID
        let hotel = await Hotel.findByIdAndDelete({ _id: id })
        if (!hotel) return res.send({ message: 'Hotel no encontrado, no eliminado' })
        return res.send({ message: 'Hotel eliminado exitosamente', hotel })
    } catch (error) {
        return res.status(500).send({ message: 'Error al eliminar el hotel' })
    }
}
