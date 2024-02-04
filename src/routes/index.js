const customer_router = require("./customer.routes")

const routes = ({ app }) => {

    app.use('/api', customer_router)

}
module.exports = routes