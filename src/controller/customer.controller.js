const customer = require("../model/customer.model")
const { success, error } = require("../common/res.common")
const { messages, http_codes } = require("../constants/text.constant")
const isValidEmail = require("../common/emailValidation.common")
const Joi = require("joi")

const createCustomer = async (req, res) => {

    try {
        const bodyData = (req || {}).body || {};
        const schema = Joi.object({
            first_name: Joi.string().trim().required().strict(),
            last_name: Joi.string().trim().required().strict(),
            city: Joi.string().trim().required().strict(),
            company: Joi.string().trim().required().strict(),
            email: Joi.string() // here
                .email()
                .trim()
                .lowercase()
                .required()
                .messages({
                    'string.email': 'Email must be a valid email address',
                    'string.trim': 'Email may not contain any spaces at the beginning or end',
                    'string.empty': 'Email is required'
                })
        });
        const schemaValidator = schema.validate(bodyData)
        if (schemaValidator.error) {
            return error(http_codes.badRequest, schemaValidator.error.message || messages.badRequest, res)
        }
        const { email } = req.body
        if (!isValidEmail(email)) {
            return error(http_codes.badRequest, messages.internalServerError, res)

        }
        const isEmailExist = await customer.findOne({ email: email, is_active: true })
        if (!isEmailExist) {
            const newCustomer = await customer.create(req.body)
            if (newCustomer) {
                return success(http_codes.created, messages.customerCreatedSuccessfully, { customerDetails: newCustomer }, res)
            } else {
                return error(http_codes.internalError, messages.internalServerError, res)
            }
        } else {
            return error(http_codes.badRequest, messages.companyAlreadyExist, res)

        }
    } catch (e) {
        console.log("error : ", e)
        return error(http_codes.internalError, messages.internalServerError, res)
    }
}

module.exports = { createCustomer }





// 2. Node.js
// Create a simple Node.js Rest API which provides data about customers.

// You are supposed to follow the following conditions:

// 1) Create a customers.json file with multiple customers.

// Sample customer data. {
// id: 1,
// first_name: 'Aman',
// last_name: 'Gupta',
// city: 'Ahmedabad',
// company: 'SublimeDataSystems'
// }
// or You can use database of your choice and add the sample data in it.

// 2) Create a list API with search by first_name, last_name and city with pagination.

// 3) Create an API to get single customer data by its id.

// 4) Create an API to list all the unique cities with number of customers from a particular city.

// 5) Create an API to add a customer with validations.

// All fields required and the city and company should already exists for an existing customer.
// No new city or company can be added.

// ** Submit a Repo link after completing the test