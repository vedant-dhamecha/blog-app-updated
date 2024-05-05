import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./PaymentForm.css";
import toast from "react-hot-toast";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || processing) {
      // Stripe.js has not yet loaded or already processing.
      return;
    }

    setProcessing(true);
    // Show "Processing..." for 4 seconds
    setTimeout(() => {
      setProcessing(false);
      const result = stripe
        .createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
        })
        .then((result) => {
          if (result.error) {
            // console.error(result.error.message);
            toast.error(result.error.message);
            // // Handle payment failure
          } else {
            console.log("Payment successful:", result.paymentMethod);
            // Navigate to success page
            window.location.href = "/success";
          }
        });
    }, 4000);
  };


  return (
    <>
      <div class="main intro">
        <div class="right-payment-info">
          <div class="credit-card-form">
            <img
              class="Image1"
              src="https://i.ibb.co/hgJ7z3J/6375aad33dbabc9c424b5713-card-mockup-01.png"
              alt="6375aad33dbabc9c424b5713-card-mockup-01"
              border="0"
            />
            <br />
            <form onSubmit={handleSubmit}>
              <CardElement />
              <br />
              <button type="submit" disabled={!stripe || processing}>
                {processing ? "Processing..." : "Pay ₹ 199"}
              </button>
            </form>
          </div>
          <img
            src="https://www.logo.wine/a/logo/Stripe_(company)/Stripe_(company)-Powered-by-Stripe-Outline-Logo.wine.svg"
            style={{
              width: "200px",
              height: "50px",
              marginLeft: "660px",
              marginTop: "2px",
              marginBottom: "30px",
            }}
            alt="powered by stripe"
          />
        </div>
      </div>
    </>
  );
};

export default PaymentForm;
