"use client"

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { ArrowRight, Loader2 } from 'lucide-react';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripeButtonProps {
  productId: string;
  amount: number;
  productName: string;
}

export const StripeButton = ({ productId, amount, productName }: StripeButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          amount,
          productName,
        }),
      });

      const { url, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('There was an error initiating checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="flex-1 w-full px-8 py-4 bg-accent text-white camera-hud-text text-[10px] tracking-[0.2em] uppercase hover:bg-accent/80 transition-all flex items-center justify-center gap-2 group"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          Initialize Secure Checkout
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </>
      )}
    </button>
  );
};
