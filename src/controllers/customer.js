const Customer = require('../models/customer')
const { createSummaryPdf } = require('../tools/pdfTools')

async function createCustomer (req, res) {
  try {
    const customer = new Customer(req.body)
    await customer.save()

    return res.status(200).send(JSON.stringify(customer))
  } catch (err) {
    return res.status(500).send({ message: err.message })
  }
}

async function getOneCustomer (req, res) {
  try {
    const customer = await Customer.findById(req.params.id)
    return res.send(JSON.stringify(customer))
  } catch (err) {
    return res.status(500).send({ message: err.message })
  }
}

async function getMultiCustomer (req, res) {
  try {
    const search = req.query.search || {}
    const customers = await Customer.find(search)
    return res.send(JSON.stringify(customers))
  } catch (err) {
    return res.status(500).send({ message: err.message })
  }
}

async function getOneCustomerPDF (req, res) {
  try {
    const customer = await Customer.findById(req.params.id).lean()
    const pdf = await createSummaryPdf({
      data: { ...customer, created: customer.created && new Date(customer.created).toLocaleString() },
      templateSource: `./src/tools/resources/templates/${customer.customerType}_summary.html`
    })

    res.contentType("application/pdf")
    return res.send(pdf)
  } catch (err) {
    return res.status(500).send({ message: err.message })
  }
}

module.exports = {
  createCustomer,
  getOneCustomer,
  getOneCustomerPDF,
  getMultiCustomer
}