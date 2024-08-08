
const { Todo } = require('../models/todo.model');
const { validateTodo } = require('../validations/todo.validation')
const { v4: uuidv4 } = require('uuid'); 



const createTodo = async(req, res) => {

    try{
        const { customer_id, todo_name, todo_description  } = req.body
        //valodating the request body
        const { error } = validateTodo(req.body)
        if(error != undefined) throw new Error(error.details[0].message)
        //checking if the customer exist
        const checkIfTodoExist = await Todo.findOne({where:{ todo_name: todo_name} })
        if(checkIfTodoExist != null ) throw new Error('A todo name already exist ')
        await Todo.create({
            todo_id: uuidv4(),
            todo_name: todo_name,
            todo_description: todo_description,
            customer_id: customer_id
        })
        res.status(200).json({
            status: "success",
            message: 'Todo created successfully'
        })

    }catch(error){

        res.status(400).json({
            status: "error",
            message: error.message
        })
    }

}


module.exports = { createTodo }