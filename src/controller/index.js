const customer = require("./customer.controller")
const getCustomerList = require("./getCustomerList.controller")
const getCustomerById = require("./getCustomerById.controller")
const getCityWiseDetails = require("./getCityWiseDetails.controller")

module.exports = {
    ...customer,
    ...getCustomerList,
    ...getCustomerById,
    ...getCityWiseDetails
}