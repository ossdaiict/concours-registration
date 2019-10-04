import mongoose from 'mongoose'

const Schema = mongoose.Schema

const registrationSchema = new Schema(
  {
    name: String,
    collegeName: String,
    contactNo: Number,
    email: String,
    sports: [],
    accommodation: Number,
    prefPayment: String,
    totalCost: Number,
  },
  { collection: 'registrations' }
)

export default mongoose.model('Registration', registrationSchema)
