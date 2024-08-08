const express = require('express')
const router = express.Router()
const { createTodo } = require('../controllers/todo.controller')

router.post('/todo', createTodo)



module.exports = router