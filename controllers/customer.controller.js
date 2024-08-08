const {createCustomerValidation } = require('../validations/customer.validation')
const {Customers}  = require('../models/customer.model')
const { Otp } = require('../models/otp.model')
const {hashPassword, generateOtp} = require('../utils')
const { v4: uuidv4 } = require('uuid');

const createCustomer = async(req, res) => {

   try{

    const { surname, othernames, email, password } = req.body
    const { error } = createCustomerValidation(req.body)
    if (error != undefined) throw new Error(error.details[0].message) 
     const checkIfEmailExist = await Customers.findOne({where:{ email: email} })
 
    if(checkIfEmailExist != null ) throw new Error('A customer already exist with this email')
    const [hash, salt] = await hashPassword(password)
    await Customers.create({
        customer_id: uuidv4(),
        surname: surname,
        othernames: othernames,
        email: email,
        hash: hash,
        salt: salt
    })
    //generate otp
    const otp = generateOtp()
    await Otp.create({
        email: email,
        otp: otp
    })
//seem the otp as notification

    
     res.status(200).json({
            status: "success",
            message: 'An OTP has been sent to your email'
     })

   }catch(error){

    res.status(400).json({
        status: "error",
        message: error.message
    })
   }
   
}


const verifyEmail = async(req, res) => {

    try{
        const { email, otp } = req.params
        const checkIfEmailAndOtpExist =  await Otp.findOne({where:{ email: email, otp: otp} })
       

        if(checkIfEmailAndOtpExist == null ) throw new Error('Invalid or Expired OTP')
            //todo : check the expirationtime of the otp
        await Customers.update(
            { is_email_verified: true },
            {
              where: {
                email: email,
              },
            },
          )
        res.status(200).json({
            status: "success",
            message: 'Email verified successfully'
        })

    }catch(error){
        res.status(400).json({
            status: "error",
            message: error.message
        })
    }
    
}

const updateCustomer = (req, res) => { 
//assignment
 }


module.exports = {
    createCustomer,
    updateCustomer,
    verifyEmail
}