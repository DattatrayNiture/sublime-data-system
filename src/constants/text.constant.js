const http_codes = {
    badRequest: 400,
    internalError: 500,
    created: 201,
    notFound: 404,
    ok: 200,
    notImplemented: 501,
    forbidden: 403,
    unAuthorized: 401,
    Conflict: 409
}
const schemas = {
    customers: "customers",
}
const messages = {
    inValidBody: "invalid body",
    badRequest: "bad request",
    success: "success",
    customerCreatedSuccessfully: "customer created successfully",
    internalServerError: "Internal server error",
    inValidCustomerId: "customerId is invalid",
    customerNotFound: "customer not found",
    inValidEmail: "invalid email",
    companyAlreadyExist: "company already exist with that email",
    dataNotFound: "data not found"
}

module.exports = {
    schemas,
    messages,
    http_codes
}