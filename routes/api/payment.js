const express = require("express");
const app = express();
const { PrismaClient } = require ('@prisma/client');
const prisma = new PrismaClient()


app.post('/deposit', async (req, res) => {
    try {
        const { plan, paymentMethod, amount } = req.body;
    
        // Validate payment data, e.g., amount, plan, and payment_method
        if (!plan || !paymentMethod || !amount) {
            return res.status(400).json({ error: 'Invalid payment data' });
        }

        // Check if the plan and payment method are valid
        const validPlans = ['basic', 'standard', 'gold', 'insurance', 'realEstate', 'immigration'];
        const validPaymentMethods = ['eth', 'btc'];

        if (!validPlans.includes(plan) || !validPaymentMethods.includes(paymentMethod)) {
            return res.status(400).json({ error: 'Invalid plan or payment method' });
        }
    
        // Create a new payment record in the database
        const payment = await prisma.payment.create({
          data: {
            plan, 
            paymentMethod, 
            amount
          },
        });
    
        res.status(201).json({ message: 'Payment successful', payment });
      } catch (error) {
        console.error('Error making payment:', error);
        res.status(500).json({ error: 'An error occurred while processing the payment' });
      }
});


module.exports = app