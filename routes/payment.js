const express = require('express');
const router = express.Router();
const { initiatePayment, handleWebhook } = require('../conrollers/paymentController');
const { authGuard } = require('../middleware/authMiddleware');

router.post('/initiate', authGuard, initiatePayment);
router.post('/webhook', handleWebhook);

module.exports = router;