const express = require("express");
const app = express();
const {prisma} = require("../utils/db");


app.post('/deposit', async (req, res) => {
  try {
      const { plan, paymentMethod, amount, user_id } = req.body;
  
      // Validate payment data, e.g., amount, plan, and payment_method
      let error = [];

      if (!plan || !paymentMethod || !amount) {
          //return res.status(400).json({ error: 'Invalid payment data' });
          error.push({ error: 'Invalid payment data' });
      }

      // Check if the plan and payment method are valid
      const validPlans = ['basic', 'standard', 'gold', 'insurance', 'realEstate', 'immigration'];
      const validPaymentMethods = ['eth', 'btc'];

      if (!validPlans.includes(plan) || !validPaymentMethods.includes(paymentMethod)) {
          return res.status(400).json({ error: 'Invalid plan or payment method' });
      }
      

      //passing the amount as an integer instead of a string
      let newAmount = req.body.amount;
      const amountAsInteger = parseInt(newAmount, 10)

      // Create a new payment record in the database
      const payment = await prisma.payment.create({ 
          data: {
              plan,
              paymentMethod,
              amount: amountAsInteger,
              user: {
                  connect: {
                      id: userId                    
                  }
              }
          }
          
      });

      console.log(payment)

      res.status(201).json({ message: 'Payment successful', payment });
    } catch (error) {
      console.error('Error making payment:', error);
      res.status(500).json({ error: 'An error occurred while processing the payment' });
    }
});


module.exports = app