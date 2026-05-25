'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { StripeCheckout } from './stripe-checkout';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripeCheckoutWrapperProps {
  orderId: number;
  cart: {
    id: number;
    totalAmount: number;
    items: any[];
    userId: number | null;
    token: string | null;
    userData?: {
      fullName: string;
      email: string;
      phone: string;
      address: string;
      comment: string | null;
    };
  };
}

export const StripeCheckoutWrapper = ({ cart, orderId }: StripeCheckoutWrapperProps) => {
  return (
    <Elements stripe={stripePromise}>
      <StripeCheckout totalAmount={cart.totalAmount} orderId={orderId} />
    </Elements>
  );
};
