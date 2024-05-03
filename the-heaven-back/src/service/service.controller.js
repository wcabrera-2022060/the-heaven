'use strict'

import Service from './service.model.js'

export const createService = async (req, res) => {
    try {
        let data = req.body
        let service = new Service(data)
        await service.save()
        return res.send({ message: 'Service created successfully', service })
    } catch (error) {
        return res.status(500).send({ message: 'Error create service' })
    }
}

export const getServices = async (req, res) => {
    try {
        let services = await Service.find({})
        return res.send({ message: 'Services found', services })
    } catch (error) {
        return res.status(500).send({ message: 'Error getting services' })
    }
}

export const getService = async (req, res) => {
    try {
        let { id } = req.params
        let service = await Service.findById({ _id: id })
        if (!service) return res.status(404).send({ message: 'Service not found' })
        return res.send({ message: 'Service found', service })
    } catch (error) {
        return res.status(500).send({ message: 'Error getting service' })
    }
}

export const updateService = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let service = await Service.findByIdAndUpdate({ _id: id }, data, { new: true })
        if (!service) return res.status(404).send({ message: 'Service not found, not updated' })
        return res.send({ message: 'Service updated successfully', service })
    } catch (error) {
        return res.status(500).send({ message: 'Error updating service' })
    }
}

export const deleteService = async (req, res) => {
    try {
        let { id } = req.params
        let service = await Service.findByIdAndDelete({ _id: id })
        if (!service) return res.status(404).send({ message: 'Service not found, not deleted' })
        return res.send({ message: 'Service deleted successfully', service })
    } catch (error) {
        return res.status(500).send({ message: 'Error deleting service' })
    }
}
