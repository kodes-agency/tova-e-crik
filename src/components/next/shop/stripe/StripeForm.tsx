'use client'

import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { completeCheckout } from '@/actions/CheckoutActions'
import { useRouter } from 'next/navigation'

import React, { useState } from 'react';


interface StripeFormProps {
  clientSecret: string;
  cartId: string;
}

const StripeForm: React.FC<StripeFormProps> = ({ clientSecret, cartId }) => {
  const stripe = useStripe();
  const router = useRouter();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState<string | undefined>(undefined);

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsSubmitting(true);

    await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      redirect: 'if_required',
      confirmParams: {
        return_url: 'http://localhost:3000/checkout/status?cart_id=' + cartId,
      },
    }).then(async function(result) {
      if (result.error) {
        console.log(result.error.message);
        setPaymentError(result.error.message);
        setIsSubmitting(false);
      } else {
        const { data } = await completeCheckout();
        setIsSubmitting(false);
        router.push('/checkout/status?cart_id=' + cartId);
        console.log(data);
      }
    })
  };

  return (
    <form onSubmit={handlePayment}>
      {
        paymentError && <p className='text-red-600 text-sm mb-5'>{paymentError}</p>
      }
      <PaymentElement />
      <Button className="mt-5 w-full" type="submit" disabled={!stripe || isSubmitting}>
        {isSubmitting ? 'Processing...' : 'Pay now'}
      </Button>
    </form>
  );
};

export default StripeForm;