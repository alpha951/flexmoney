const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

function validateCreateRequest(req, res, next) {
  if (!req.body.email || !req.body.name || !req.body.age || !req.body.batchId) {
    ErrorResponse.message = "Something went wrong while creating airplane";
    ErrorResponse.explanation = "Complete input not found in the request body";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = { validateCreateRequest };
