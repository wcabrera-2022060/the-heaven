'use strict'
import Hotel from '../hotel/hotel.model.js'
import Rating from '../rating/rating.model.js'
import { login } from '../user/user.controller.js'

export const createRating = async (req, res) => {
    try {
        let { _id } = req.user
        let data = req.body
        let hotel = await Hotel.findById({ _id: data.hotel })
        if (!hotel) return res.status(404).send({ message: 'Hotel not found' })
        data.user = _id
        let rating = new Rating(data)
        await rating.save()
        const populateQuery = [{ path: 'user', select: '-password -role' }, { path: 'hotel' }]
        await rating.populate(populateQuery)
        return res.send({ message: 'Rating created successfully', rating })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error saving rating' })
    }
}

export const getRatings = async (req, res) => {
    try {
        const populateQuery = [{ path: 'user', select: '-password -role' }, { path: 'hotel' }]
        let ratings = await Rating.find({}).populate(populateQuery)
        return res.send({ message: 'Ratings found', ratings })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error getting ratings' })
    }
}

export const getRating = async (req, res) => {
    try {
        let { id } = req.params
        const populateQuery = [{ path: 'user', select: '-password -role' }, { path: 'hotel' }]
        let rating = await Rating.findById({ _id: id }).populate(populateQuery)
        if (!rating) return res.status(404).send({ message: 'Rating not found' })
        return res.send({ message: 'Rating found', rating })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error getting rating' })
    }
}

export const updateRating = async (req, res) => {
    try {
        let { _id } = req.user
        let { id } = req.params
        let data = req.body
        let { user } = await Rating.findById({ _id: id }) ?? { user: '' }
        if (user.toString() !== _id.toString()) return res.status(403).send({ message: 'You can not update this rating' })
        data.date = new Date()
        const populateQuery = [{ path: 'user', select: '-password -role' }, { path: 'hotel' }]
        let rating = await Rating.findByIdAndUpdate({ _id: id }, data, { new: true }).populate(populateQuery)
        if (!rating) return res.status(404).send({ message: 'Rating not found not updated' })
        return res.send({ message: 'Rating updated successfully', rating })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error updating rating' })
    }
}

export const deleteRating = async (req, res) => {
    try {
        let { _id } = req.user
        let { id } = req.params
        let { user } = await Rating.findById({ _id: id }) ?? { user: '' }
        if (user.toString() !== _id.toString()) return res.status(403).send({ message: 'You can not delete this rating' })
        const populateQuery = [{ path: 'user', select: '-password -role' }, { path: 'hotel' }]
        let rating = await Rating.findByIdAndDelete({ _id: id }).populate(populateQuery)
        if (!rating) return res.status(404).send({ message: 'Rating not found not deleted' })
        return res.send({ message: 'Rating deleted successfully', rating })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error deleting rating' })
    }
}