import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100
  const publishableKey = 'pk_test_2Hx7C6zq1Ur90O1uY54hkGiz00kclC1YeX'

  const onToken = token => {

    // axios handles complex fetch requests. Returns a promise
    axios({

      url: 'payment',             // got to /payment in the backend
      method: 'post',
      data: {                     // the data to send
        token,                    // token object
        amount: priceForStripe    // payment amount
      }

    }).then(response => {         // handle backend success response
    
      alert('Payment successful!')
    
    }).catch(error => {           // handle backend error

      console.log('Payment error: ', JSON.parse(error))
      alert(
        'There was an issue with your payment. ' +
        'Please make sure you use the provided test credit card.'
      )
    })
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