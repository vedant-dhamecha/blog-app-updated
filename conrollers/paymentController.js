// controllers/paymentController.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');

async function initiatePayment(req, res) {
    const { amount, currency, description, token } = req.body;
    
    try {
        // Create a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            description,
            payment_method: token,
            confirm: true
        });

        // Update user privileges (e.g., set isMember to true)
        // Example:
        await User.findByIdAndUpdate(req.user.id, { Member: true });

        res.status(200).json({ success: true, paymentIntent });
    } catch (error) {
        console.error('Error initiating payment:', error);
        res.status(500).json({ success: false, error: error.message });
    }
}

async function handleWebhook(req, res) {
    const event = req.body;

    // Handle Stripe webhook event (e.g., payment succeeded)
    // Update user privileges accordingly

    res.sendStatus(200);
}

module.exports = { initiatePayment, handleWebhook };
