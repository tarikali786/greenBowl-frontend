import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import { useSelector } from "react-redux";

// Replace with your actual publishable key
const stripePromise = loadStripe(
  "pk_test_51NLfpWSGdaY5SfT3CFhW6bnCEMKOhbHXBqpC5Egbl8eIGXkZ4eIIyNPU0krWT0vtCVjERT5q72lPbc03p2mfMyIS00YMxJojrx"
);

const Checkout = () => {
  const orderDetails = useSelector((state) => state.salad.orderDetails);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-center ">Checkout</h1>
      <div className="flex justify-center gap-4">
        <b>Order Details:</b>

        <p className="text-lg ">{orderDetails?.recipeName}</p>
        <p className="text-lg font-semibold">₹{orderDetails?.price}</p>
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm totalPrice={orderDetails?.price} />
      </Elements>
    </div>
  );
};

export default Checkout;
