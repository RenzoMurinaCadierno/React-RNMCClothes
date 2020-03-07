import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100
  const publishableKey = 'pk_test_2Hx7C6zq1Ur90O1uY54hkGiz00kclC1YeX'

  const onToken = token => {
    console.log(token)
    alert('Payment successful')
  }

  return (
    <StripeCheckout
      label='Pay now'
      panelLabel='Pay Now!'
      name='RNMC Clothes'
      description={`Your total is $${ price }`}
      image='https://sendeyo.com/up/d/f3eb2117da'
      billingAddress
      shippingAddress
      amount={ priceForStripe }
      stripeKey={ publishableKey }
      token={ onToken }
    />
  )
}

export default StripeCheckoutButton