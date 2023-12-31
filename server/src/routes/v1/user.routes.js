const express = require("express");
const router = express.Router();

const { UserMiddleware } = require("../../middlewares");

const { UserController } = require("../../controllers");

router.post(
  "/signup",
  UserMiddleware.validateCreateRequest,
  UserController.createUser
);

router.get("/", UserController.getAllUser);

module.exports = router;
