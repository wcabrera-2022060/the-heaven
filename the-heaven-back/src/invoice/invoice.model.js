import { Schema, model } from 'mongoose'

const invoiceSchema = Schema({
  idReservation: {
    type: Schema.ObjectId,
    ref: 'Reservation'
  },
  idEvent: {
    type: Schema.ObjectId,
    ref: 'Event'
  },
  subTotal: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
})

export default model('Invoice', invoiceSchema)
