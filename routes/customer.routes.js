const express = require('express')
const router = express.Router()
const { createCustomer, updateCustomer, verifyEmail } = require('../controllers/customer.controller')


router.post('/customer', createCustomer); 

router.patch('/verify-email/:email/:otp', verifyEmail);

router.patch('/customer/:id', updateCustomer);


module.exports = router;