const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Todo = sequelize.define(
  "Todo",
  {
    sn: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
    },
    todo_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    todo_name: {
      type: DataTypes.STRING,
      defaultValue: false,
      allowNull: false,
    },
    todo_description: {
      type: DataTypes.TEXT,
      defaultValue: false,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "customers",
        key: "customer_id",
      },
    },
    status: {
      type: DataTypes.ENUM("pending", "completed"),
      defaultValue: "pending",
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    customer_id: {
      type: DataTypes.UUID,
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
    modelName: "Todo",
    tableName: "todos",
    timestamps: false,
  }
);

module.exports = { Todo };
