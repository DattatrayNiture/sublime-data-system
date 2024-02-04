const customer = require("../model/customer.model")
const { success, error } = require("../common/res.common")
const { messages, http_codes } = require("../constants/text.constant")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
const getCustomersById = async (req, res) => {

    try {
        const { customerId } = req.query
        let { timezone } = req.headers
        if (!timezone) {
            timezone = "+05:30"
        }
        if (!ObjectId.isValid(customerId)) {
            return error(http_codes.badRequest, messages.inValidCustomerId, res)
        }

        let customerDetails = await customer.findOne({ _id: new ObjectId(customerId) })
        if (!customerDetails) {
            return error(http_codes.notFound, messages.customerNotFound, res)
        }
        const data = {}
        data['customerDetails'] = customerDetails;
        return success(http_codes.ok, messages.success, data, res)
    } catch (e) {
        console.log("error : ", e)
        return error(http_codes.internalError, messages.internalServerError, res)
    }
}
module.exports = { getCustomersById }
