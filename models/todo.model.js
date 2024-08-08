
const {Sequelize, DataTypes} = require("sequelize")
const sequelize = require('../config/sequelize')


const Todo = sequelize.define("Todo", 
    {
    sn: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    todo_id:{
        type: DataTypes.STRING,
        allowNull: false,
        uniqueKey: true
    },
    
    customer_id: {
        type: DataTypes.STRING,
        allowNull: false,
        uniqueKey: true,
        references: {
            model: 'Customers',
            key: 'customer_id'
        }

    },
    todo_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    todo_description:{
        type: DataTypes.TEXT,
        allowNull: true

    },
    status: {
        type: DataTypes.ENUM('pending', 'completed'),
        allowNull: false,
        defaultValue: 'pending'
    },
    is_deleted : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    created_at: {
      type: DataTypes.STRING,
      
    },
    modified_at: {
      type: DataTypes.STRING
    }

},{
  timestamps: false,
  createdAt: false,
  updatedAt: false  
})


module.exports = { Todo }
