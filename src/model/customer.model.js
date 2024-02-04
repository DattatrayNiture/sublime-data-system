const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
const { schemas } = require("../constants/text.constant");

const orderSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    created_At: {
        type: Date,
        default: Date.now,
        required: true
    },
    updated_At: {
        type: Date,
        default: Date.now,
        required: true
    },
});

module.exports = mongoose.model(schemas.customers, orderSchema)
