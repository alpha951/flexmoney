const { Logger } = require("../config");
const { UserService } = require("../services/");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createUser(req, res) {
  try {
    const { name, email, age, batchId } = req.body;

    const user = await UserService.createUser({
      Name: name,
      Email: email,
      Age: age,
      batchId: batchId,
    });

    SuccessResponse.data = user;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log("error inside the controller", error);
    ErrorResponse.error = error;
    Logger.error(error);
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createUser,
};
