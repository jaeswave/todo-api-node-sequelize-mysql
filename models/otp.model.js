const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Otp = sequelize.define(
  "Otp",
  {
    sn: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Customers",
        key: "email",
      },
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    modified_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Otp",
    tableName: "otp_tbl",
    timestamps: false,
  }
);

module.exports = { Otp };
