'use client';

import {useEffect,useState} from "react";
import { Appearance, loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useTheme } from 'next-themes';
import CheckoutForm from "./checkout-form";
import { PaymentOption } from "@/app/lib/definitions";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

if(!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) throw new Error('stripe public key must be defined!');

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function StripePaymentComponent({projectId,paymentOption}:{projectId:string,paymentOption:PaymentOption}) {
  const [clientSecret, setClientSecret] = useState("");
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({projectId:projectId,paymentOption:paymentOption}),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance:Appearance = {
    theme: resolvedTheme === 'light'? 'stripe':'night',
    
  };
  const options:StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}