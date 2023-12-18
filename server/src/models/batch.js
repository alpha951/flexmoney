"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Batch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.User, {
        foreignKey: "batchId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Batch.init(
    {
      startTiming: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      endTiming: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Batch",
    }
  );
  return Batch;
};
