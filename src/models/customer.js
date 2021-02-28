const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
  customerType: {
    type: String,
    enum: ['private', 'company']
  },
  created: {
    type: Date,
    default: Date.now
  },
  firstName: String,
  lastName: String,
  email: String,
  country: String,
  company: String,
  ustid: String
})

// Export the model
module.exports = mongoose.model('customer', CustomerSchema)