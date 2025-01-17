import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./Checkout-form";
import { Link } from "react-router-dom";
export const Payment = ({paymentIntentId}) => {
  const stripePromise = loadStripe(
    "pk_test_51NLfpWSGdaY5SfT3CFhW6bnCEMKOhbHXBqpC5Egbl8eIGXkZ4eIIyNPU0krWT0vtCVjERT5q72lPbc03p2mfMyIS00YMxJojrx"
  );

  return (
    <div className="mt-5 border p-4 rounded-lg bg-blue-100">
      <>
        <p className="text-2xl text-black-400">Payment</p>
        <p className="text-sm text-black-300 mt-1">
          All transactions are secure and encrypted
        </p>

        <p className="bg-[#c3d0f6] mt-3 px-4 py-3 rounded-lg text-black-300 cursor-pointer font-semibold">
          Credit Card (Stripe)
        </p>
        <p className="text-sm text-black-300 mt-6">
          Pay with your credit card via Stripe.
        </p>
        <Elements stripe={stripePromise}>
          <CheckoutForm totalPrice={100} paymentIntentId ={paymentIntentId} />
        </Elements>
      </>
    </div>
  );
};
