const CrudRepository = require("./crud.repository");
const { User } = require("../models");

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async getOneByEmail(email) {
    return await this.model.findOne({ where: { Email: email } });
  }
}

module.exports = UserRepository;
