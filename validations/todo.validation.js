const Joi = require('joi');

const validateTodo = (todo) => {
    const  todoSchema = Joi.object({    
        todo_name: Joi.string().required(),
        todo_description: Joi.string()
    })
    return todoSchema.validate(todo)
    
}

module.exports = { validateTodo }
