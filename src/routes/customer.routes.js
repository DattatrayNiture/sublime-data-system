const express = require("express")
const controller = require("../controller")
const router = express.Router()

router.post('/customer', controller.createCustomer)
router.get('/customerlist', controller.getCustomersList)
router.get('/customerbyid', controller.getCustomersById)
router.get('/citylistwithcustomercount', controller.getCityWiseDetails)

module.exports = router