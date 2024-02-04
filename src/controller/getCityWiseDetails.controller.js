const customer = require("../model/customer.model")
const { success, error } = require("../common/res.common")
const { messages, http_codes } = require("../constants/text.constant")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
const getCityWiseDetails = async (req, res) => {

    try {
        const { limit, page } = req.query
        let { timezone } = req.headers
        if (!timezone) {
            timezone = "+05:30"
        }
        let perPage = parseInt(limit) || 10;
        let pages = typeof page != "undefined" ? page == 0 ? 1 : page || 1 : 1;
        let skip = perPage * pages - perPage;

        const pipeline = [
            {
                $group: {
                    _id: "$city",
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]

        const countPipeline = [...pipeline]
        countPipeline.push({ $count: "count" })
        pipeline.push({ $skip: skip }, { $limit: perPage })
        let cityList = await customer.aggregate(pipeline)
        const customerCount = await customer.aggregate(countPipeline)

        const data = {}
        data['city_wise_customer_count'] = cityList || [];
        data['current'] = parseInt(pages) || 1;
        data['total_pages'] = Math.ceil((customerCount[0]?.count || 0) / perPage);
        data['total_items'] = customerCount[0]?.count || 0
        return success(http_codes.ok, messages.success, data, res)
    } catch (e) {
        console.log("error : ", e)
        return error(http_codes.internalError, messages.internalServerError, res)
    }
}
module.exports = { getCityWiseDetails }
