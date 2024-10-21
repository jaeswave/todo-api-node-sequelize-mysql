const express = require("express");
const router = express.Router();
const {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
  updateStatus,
} = require("../controllers/todo.controller");
const {authorisation}= require("../middleware/authorisation")

router.post("/todo",authorisation, createTodo);
router.get("/get-todos/:id",authorisation, getTodos);
router.get("/get-todo/:customer_id",authorisation, getTodo);
router.patch("/update-todo/:id", authorisation,updateTodo);
router.delete("/delete-todo/:id",authorisation, deleteTodo);
router.patch("/update-status/:id",authorisation, updateStatus);
module.exports = router;
