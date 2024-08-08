require('dotenv').config()
const express = require('express')
const app = express()
const displayRoutes = require('express-routemap')
const port = process.env.APP_PORT || 3000
const sequelize = require('./config/sequelize')
const customerRoutes = require('./routes/customer.routes')
const todoRoutes = require('./routes/todos.routes')
const otpModel = require('./models/otp.model')

app.use(express.json())
app.use(customerRoutes)
app.use(todoRoutes)
app.get('/', (req, res) => {
  res.status(200).json({
    status: "success",
    message: 'Proudly 🇳🇬'
})
})

try {
  
  
  (async()=> {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connection has been established successfully.');
    app.listen(port, () => {
      displayRoutes(app)
      console.log(`Example app listening on port ${port}`)
    })
  })()


  // sequelize.authenticate()
  // .then(() => {
  //   console.log('Connection has been established successfully.');
  //   app.listen(port, () => {
  //     displayRoutes(app)
  //     console.log(`Example app listening on port ${port}`)
  //   })
  // })

} catch (error) {
  console.error('Unable to connect to the database:', error);
  process.exit(1)
}



