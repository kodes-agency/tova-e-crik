'use client'

import { Elements } from '@stripe/react-stripe-js'
import StripeForm from './StripeForm'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
  'pk_test_51PH15AIFghsulHekGlo7AKPFqtMFWqTTFsYcCx8L5gkVmLu0AzZWf6qESoyffOgAzRKad84urLAi5kTZp3ZLH2e400nxUUaQBz',
)

export function StripeProvider({ cartId, clientSecret }: { cartId: string; clientSecret: string }) {
  if(!clientSecret) return null
  return (
    <div>
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
          }}
        >
          <StripeForm clientSecret={clientSecret} cartId={cartId} />
        </Elements>
      )}
    </div>
  )
}
