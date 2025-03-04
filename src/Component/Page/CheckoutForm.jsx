import { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
export const CheckoutForm = ({ totalPrice }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentIntentId, setPaymentIntentid] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const createPaymentIntent = async () => {
    const api = `${
      import.meta.env.VITE_API_URL
    }/payment/create-payment-intent/`;
    const data = {
      amount: totalPrice * 100,
      description: "Purchase of Green Bowl Salad",
      name: "John Doe",
      address: {
        line1: "123 Main Street",
        city: "Mumbai",
        state: "Maharashtra",
        postal_code: "400001",
        country: "IN",
      },
    };
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.post(api, data, { headers });

      setPaymentIntentid(response?.data?.payment_intent_id);
    } catch (error) {
      console.error(
        "Error fetching payment intent:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (totalPrice > 0) {
      createPaymentIntent();
    }
  }, [totalPrice]);

  console.log(paymentIntentId);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !paymentIntentId) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      paymentIntentId,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      setPaymentStatus(`Payment failed: ${error.message}`);
    } else if (paymentIntent) {
      setPaymentStatus("Order  successful!");
      console.log("PaymentIntent:", paymentIntent);
    }
    setIsProcessing(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="card-element"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Credit or debit card
          </label>
          <div className="border rounded-md p-3">
            <CardElement
              id="card-element"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isProcessing || !stripe}
          className="w-full bg-green-600 text-white-500 font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition disabled:opacity-50"
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
        {paymentStatus && (
          <div
            className={`mt-4 text-center ${
              paymentStatus.includes("failed")
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {paymentStatus}
          </div>
        )}
      </form>
    </>
  );
};
