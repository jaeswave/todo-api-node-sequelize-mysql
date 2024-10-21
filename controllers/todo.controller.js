const { Todo } = require("../models/todo.model");
const { validateTodo } = require("../validations/todo.validation");
const { v4: uuidv4 } = require("uuid");

const createTodo = async (req, res) => {
  try {
    const { customer_id } = req.params;
    console.log('hey:',customer_id);
    const { todo_name, todo_description } = req.body;
    //valodating the request body
    const { error } = validateTodo(req.body);
    if (error != undefined) throw new Error(error.details[0].message);
    //checking if the customer exist
    const checkIfTodoExist = await Todo.findOne({
      where: { todo_name: todo_name ,customer_id : customer_id},
    });
    if (checkIfTodoExist != null) throw new Error("A todo name already exist ");
    await Todo.create({
      todo_id: uuidv4(),
      todo_name: todo_name,
      todo_description: todo_description,
      customer_id: customer_id,
    });
    res.status(200).json({
      status: "success",
      message: "Todo created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getTodos = async (req, res) => {
  try {
    const { customer_id } = req.params || null;
    const todos = await Todo.findAll({
      attributes: ["todo_name", "todo_description", "status"],
      where: { customer_id: customer_id, is_deleted: false },
    });
    res.status(200).json({
      status: "success",
      data: todos,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Invalid todo id");
    const todo = await Todo.findOne({
      where: { todo_id: id, is_deleted: false },
    });
    res.status(200).json({
      status: "success",
      data: todo,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const todo = await Todo.findOne({
      where: { todo_id: id, is_deleted: false },
    });
    if (todo == null) throw new Error("Todo not found");
    await todo.update(updates);
    res.status(200).json({
      status: "success",
      message: "Todo updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findOne({
      where: { todo_id: id, is_deleted: false },
    });
    if (todo == null) throw new Error("Todo not found");

    await todo.update({ is_deleted: true });
    res.status(200).json({
      status: "success",
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStatus = async (req, res) => {
  //   const { id } = req.params;
  //   const { status } = req.body;
  const {
    body: { status },

    params: { id },
  } = req;
  try {
    const todo = await Todo.findOne({
      where: { todo_id: id, is_deleted: false },
    });
    if (todo === null) throw new Error("Todo not found");
    await todo.update({ status });
    res.status(200).json({
      status: "success",
      message: "Todo status updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
  updateStatus,
};
