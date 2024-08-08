const Joi = require('joi');

const validateTodo = (todo) => {
    const  todoSchema = Joi.object({    
        customer_id: Joi.string().required(),
        todo_name: Joi.string().required(),
        todo_description: Joi.string()
    })
    return todoSchema.validate(todo)
    
}

module.exports = { validateTodo }
