const jwt = require("jsonwebtoken");
const { Customers } = require("../models/customer.model");

const authorisation = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) throw new Error("Unauthorised Access1");

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(400).json({
          status: "error",
          message: err.message,
        });
      }

      const email = decoded.email;
      //use the email to fetch the customer_id
      const data = await Customers.findOne({ where: { email: email } });
      if (data == null) {
        return res.status(400).json({
          status: "error",
          message: "Unauthorised Access3",
        });
      }

      req.params.customer_id = data.customer_id;
      next();
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Unauthorised Access4",
    });
  }
};

module.exports = {
  authorisation,
};
