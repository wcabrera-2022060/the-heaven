import Invoice from './invoice.model.js'
import Reservation from '../reservation/reservation.model.js'
import Room from '../room/room.model.js'
import fs from 'fs'
import PDFDocument from 'pdfkit-table'
import User from '../user/user.model.js'

export const createInvoice = async (req, res) => {
  try {
    const { idR, idE } = req.params
    if (idR) {
      const reservation = await Reservation.findById(idR)
      if (!reservation) return res.status(404).send({ message: 'Reservation not found' })
      const room = await Room.findById(reservation.room)
      if (!room) return res.status(404).send({ message: 'Room not found' })
      const data = {
        idReservation: idR
      }
      data.subTotal = room.price * reservation.numberRooms
      data.total = data.subTotal + (data.subTotal * 0.12)
      const invoice = new Invoice(data)
      await invoice.save()
      await generateIncoice(invoice)
      return res.send({ message: 'Invoice created successfully' })
    } else if (idE) {
      const event = await Event.findById(idE)
      if (!event) return res.status(404).send({ message: 'Event not found' })
      const data = {
        idEvent: idE
      }
      data.subTotal = event.price
      data.total = data.subTotal + (data.subTotal * 0.12)
      const invoice = new Invoice(data)
      await invoice.save()
      return res.send({ message: 'Invoice created successfully' })
    }
  } catch (error) {
    return res.status(500).send({ message: 'Error creating invoice' })
  }
}

export const generateIncoice = async (invoice) => {
  try {
    const { _id, idReservation, idEvent, subTotal, total, date } = invoice
    const formatDate = date.toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour12: true
    })

    const reservation = await Reservation.findById(idReservation)
    const room = await Room.findById(reservation.room)
    const user = await User.findById(reservation.user)
    const dateIn = reservation.dateIn
    const dateOut = reservation.dateOut

    const formatDateIn = dateIn.toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour12: true
    })

    const formatDateOut = dateOut.toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour12: true
    })

    const doc = new PDFDocument()
    doc.fontSize(25).font('Helvetica-Bold').text('Invoice', { align: 'center' }).moveDown(1)
    doc.fontSize(12).font('Helvetica-Bold').text('ID: ', { continued: true }).font('Helvetica').text(_id).moveDown(0.5)
    doc.fontSize(12).font('Helvetica-Bold').text('Date: ', { continued: true }).font('Helvetica').text(formatDate).moveDown(0.5)

    const table = {
      headers: ['DateIn', 'DateOut', 'Room', 'Price', 'Quantity', 'Subtotal'],
      rows: []

    }
    table.rows.push([formatDateIn, formatDateOut, room.type, room.price, reservation.numberRooms, subTotal])

    doc.table(table, {
      prepareHeader: () => doc.font('Helvetica-Bold').fontSize(14),
      prepareRow: () => doc.font('Helvetica').fontSize(12)
    })

    doc.fontSize(13).font('Helvetica-Bold').text('Total: ', { continued: true }).font('Helvetica').text(`$${total.toFixed(2)}`).moveDown(3)
    doc.fontSize(13).font('Helvetica-Bold').text('Name: ', { continued: true }).font('Helvetica').text(user.name).moveDown(0.5)
    doc.fontSize(13).font('Helvetica-Bold').text('Surname: ', { continued: true }).font('Helvetica').text(user.surname).moveDown(0.5)
    doc.fontSize(13).font('Helvetica-Bold').text('Username: ', { continued: true }).font('Helvetica').text(user.username).moveDown(0.5)
    doc.fontSize(13).font('Helvetica-Bold').text('Email: ', { continued: true }).font('Helvetica').text(user.email).moveDown(3)
    doc.fontSize(14).text('Thanks for your purchase')

    const fileName = formatDate.replace(/[ ,:]/g, '-')
    doc.pipe(fs.createWriteStream(`${fileName}.pdf`))
    doc.end()
  } catch (error) {
    return error
  }
}
