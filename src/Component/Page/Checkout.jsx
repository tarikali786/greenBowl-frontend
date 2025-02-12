import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSaladContext } from "../SaladContextApi";
import { CheckoutForm } from "./CheckoutForm";

// Replace with your actual publishable key
const stripePromise = loadStripe(
  "pk_test_51NLfpWSGdaY5SfT3CFhW6bnCEMKOhbHXBqpC5Egbl8eIGXkZ4eIIyNPU0krWT0vtCVjERT5q72lPbc03p2mfMyIS00YMxJojrx"
);

const Checkout = () => {
  const { state } = useSaladContext();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-center ">Checkout</h1>
      <div className="flex justify-center gap-4">
        <b>Order Details:</b>

        <p className="text-lg ">{state?.priceForOrder?.recipeName}</p>
        <p className="text-lg font-semibold">₹{state?.priceForOrder?.price}</p>
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm totalPrice={state?.priceForOrder?.price} />
      </Elements>
    </div>
  );
};

export default Checkout;

