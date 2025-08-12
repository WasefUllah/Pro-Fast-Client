import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
const stripePromise = loadStripe(import.meta.env.VITE_payment_key);
const CheckoutForm = () => {
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate()
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { parcelId } = useParams();
  const { data: parcel = {}, isPending } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  const amountInCents = parcel.cost * 100;

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      setError("");
      console.log("[PaymentMethod]", paymentMethod);
      const res = await axiosSecure.post("/create-checkout-session", {
        amountInCents,
        parcelId,
      });
      console.log(res);
      const clientSecret = res.data.clientSecret;
      console.log(clientSecret);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        setError("");
        if (result.paymentIntent.status === "succeeded") {
          const paymentData = {
            parcelId,
            email: user?.email,
            amount: parcel.cost,
            transactionId: result.paymentIntent.id,
            paymentMethod: result.paymentIntent.payment_method_types,
          };
          const finalResult = await axiosSecure.post("/payment", paymentData);
          console.log(finalResult);
          if (finalResult.data.insertedId) {
            toast.success("Payment successful");
            navigate("/dashboard/myParcels")
          }
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-lg mx-auto mt-20 border-2 rounded-xl border-primary p-10 shadow-md hover:shadow-lg"
    >
      <Toaster></Toaster>
      <CardElement
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
      <div className="flex justify-center items-center">
        <button
          className="btn btn-primary  text-black mt-5 mx-auto "
          type="submit"
          disabled={!stripe}
        >
          Pay ট{parcel.cost}
        </button>
      </div>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </form>
  );
};
const Payment = () => {
  //   console.log(parcelId);
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
