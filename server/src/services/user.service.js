const { StatusCodes } = require("http-status-codes");

const { UserRepository } = require("../repositories");
const { Batch } = require("../models");
const AppError = require("../utils/errors/app-error");

const userRepository = new UserRepository();

async function createUser(data) {
  try {
    console.log(data);
    const batch = await Batch.findByPk(data.batchId);
    if (!batch) {
      throw new AppError("Batch not found", StatusCodes.NOT_FOUND);
    }
    const existingUser = await userRepository.getOneByEmail(data.Email);
    if (existingUser) {
      console.log("Yes user exists");
      /*  
          The current user is already subscribed for the current month, now they can change their batch in next month only 
      */
      if (existingUser.updatedAt.getMonth() == new Date().getMonth()) {
        console.log("here inside if");
        throw new AppError(
          "Subsrciption for current month is already done!",
          StatusCodes.BAD_REQUEST
        );
      }
      /*
        User is not subscribed for current month and can change their batch
      */
      const updatedUser = await userRepository.update(existingUser.id, data);
      return updatedUser;
    }
    const user = await userRepository.create(data);
    return user;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST); // Send client-related status code for SequelizeValidationError
    }
    console.log(error);
    throw new AppError(
      "Cannot complete the create request!",
      StatusCodes.INTERNAL_SERVER_ERROR
    ); // Or else send server-related status code
  }
}

module.exports = {
  createUser,
};
