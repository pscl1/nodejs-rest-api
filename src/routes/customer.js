const express = require('express')
const router = express.Router()

const { createCustomer, getOneCustomer, getOneCustomerPDF, getMultiCustomer } = require('../controllers/customer')

router.post('/', createCustomer)

router.get('/:id', getOneCustomer)
router.get('/', getMultiCustomer)
router.get('/:id/pdf', getOneCustomerPDF)

module.exports = router