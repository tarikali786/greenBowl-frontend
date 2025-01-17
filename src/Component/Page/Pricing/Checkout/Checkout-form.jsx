import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
import { Status } from "../../../Model";

export const CheckoutForm = ({ paymentIntentId }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [status, setStatus] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !paymentIntentId) {
      setPaymentStatus("Stripe is not ready. Please try again.");
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    try {
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
        setStatus("fail");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setPaymentStatus("Payment successful!");
        setStatus("success");
        console.log("PaymentIntent:", paymentIntent);
      }
    } catch (err) {
      setPaymentStatus(`Error: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleHideStatus = () => {
    setStatus("");
    setPaymentStatus("");
  };
  return (
    <>
      {paymentStatus && (
        <Status
          status={status}
          message={paymentStatus}
          onClick={handleHideStatus}
        />
      )}

      <form onSubmit={handleSubmit} className=" ">
        <div className="mt-4">
          <label
            htmlFor="card-element"
            className="block text-sm font-medium text-black-400 mb-2"
          >
            Credit or debit card
          </label>
          <div className="border rounded-md p-3 text-[#101119] ">
            <CardElement
              id="card-element"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#101119",
                    "::placeholder": {
                      color: "#2a2c3e",
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
        <p className="text-black-500 mt-6 mb-4 text-sm">
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our{" "}
          <Link to="/privacy-policy" className="text-blue-500">
            privacy policy
          </Link>
          .
        </p>
        <div className="flex justify-between mt-6 items-center">
          <Link to="/subscription" className="text-blue-500 cursor-pointer">
            Return to information
          </Link>
          {status !== "success" && (
            <button
              type="submit"
              disabled={isProcessing || !stripe}
              className=" bg-green-600 text-white-500 bg-blue-700 font-semibold py-3 px-4 rounded-md hover:bg-yellow-500 transition disabled:opacity-50"
            >
              {isProcessing ? "Processing..." : "Sign up now"}
            </button>
          )}
        </div>

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
