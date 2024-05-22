'use strict'

import Service from './service.model.js'

// Controlador para crear un nuevo servicio
export const createService = async (req, res) => {
    try {
        let data = req.body
        // Crear un nuevo servicio con los datos proporcionados
        let service = new Service(data)
        // Guardar el nuevo servicio en la base de datos
        await service.save()
        return res.send({ message: 'Servicio creado exitosamente', service })
    } catch (error) {
        // Manejar errores en caso de que la creación del servicio falle
        return res.status(500).send({ message: 'Error al crear el servicio' })
    }
}

// Controlador para obtener todos los servicios
export const getServices = async (req, res) => {
    try {
        // Obtener todos los servicios de la base de datos
        let services = await Service.find({})
        return res.send({ message: 'Servicios encontrados', services })
    } catch (error) {
        // Manejar errores en caso de que la obtención de los servicios falle
        return res.status(500).send({ message: 'Error al obtener los servicios' })
    }
}

// Controlador para obtener un servicio específico por su ID
export const getService = async (req, res) => {
    try {
        let { id } = req.params
        // Buscar el servicio por su ID en la base de datos
        let service = await Service.findById({ _id: id })
        if (!service) return res.status(404).send({ message: 'Servicio no encontrado' })
        return res.send({ message: 'Servicio encontrado', service })
    } catch (error) {
        // Manejar errores en caso de que la obtención del servicio falle
        return res.status(500).send({ message: 'Error al obtener el servicio' })
    }
}

// Controlador para actualizar un servicio
export const updateService = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        // Actualizar el servicio en la base de datos con los nuevos datos
        let service = await Service.findByIdAndUpdate({ _id: id }, data, { new: true })
        if (!service) return res.status(404).send({ message: 'Servicio no encontrado, no actualizado' })
        return res.send({ message: 'Servicio actualizado exitosamente', service })
    } catch (error) {
        // Manejar errores en caso de que la actualización del servicio falle
        return res.status(500).send({ message: 'Error al actualizar el servicio' })
    }
}

// Controlador para eliminar un servicio
export const deleteService = async (req, res) => {
    try {
        let { id } = req.params
        // Eliminar el servicio de la base de datos
        let service = await Service.findByIdAndDelete({ _id: id })
        if (!service) return res.status(404).send({ message: 'Servicio no encontrado, no eliminado' })
        return res.send({ message: 'Servicio eliminado exitosamente', service })
    } catch (error) {
        // Manejar errores en caso de que la eliminación del servicio falle
        return res.status(500).send({ message: 'Error al eliminar el servicio' })
    }
}
