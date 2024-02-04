const customer = require("../model/customer.model")
const { success, error } = require("../common/res.common")
const { messages, http_codes } = require("../constants/text.constant")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
const getCustomersList = async (req, res) => {

    try {
        const { first_name, last_name, city, limit, page } = req.query
        let { timezone } = req.headers
        if (!timezone) {
            timezone = "+05:30"
        }
        let perPage = parseInt(limit) || 10;
        let pages = typeof page != "undefined" ? page == 0 ? 1 : page || 1 : 1;
        let skip = perPage * pages - perPage;

        const match_pipeline = []
        if (city) {
            match_pipeline.push({
                $match: {
                    city: {
                        $regex: city,
                        $options: "i"
                    },
                }
            })
        }

        if (last_name) {
            match_pipeline.push({
                $match: {
                    last_name: {
                        $regex: last_name,
                        $options: "i"
                    },
                }
            })
        }
        if (first_name) {
            match_pipeline.push({
                $match: {
                    first_name: {
                        $regex: first_name,
                        $options: "i"
                    },
                }
            })
        }
        const pipeline = [
            ...match_pipeline,
            {
                $addFields: {
                    created_At: {
                        $dateToString: {
                            date: '$created_At',
                            timezone: timezone,
                            format: '%Y-%m-%d %H:%M:%S'
                        }
                    },
                }
            },
            { $sort: { created_At: -1 } }
        ]
        const countPipeline = [...pipeline]
        countPipeline.push({ $count: "count" })
        pipeline.push({ $skip: skip }, { $limit: perPage })
        let customerList = await customer.aggregate(pipeline)
        const customerCount = await customer.aggregate(countPipeline)

        const data = {}
        data['customerList'] = customerList || [];
        data['current'] = parseInt(pages) || 1;
        data['total_pages'] = Math.ceil((customerCount[0]?.count || 0) / perPage);
        data['total_items'] = customerCount[0]?.count || 0
        return success(http_codes.ok, messages.success, data, res)
    } catch (e) {
        console.log("error : ", e)
        return error(http_codes.internalError, messages.internalServerError, res)
    }
}
module.exports = { getCustomersList }
