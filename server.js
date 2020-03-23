const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const compression = require('compression')
const enforce = require('express-sslify')


// SERVER CONFIGS 

// if development or testing, load .env
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

// we need access to stripe key, that's why the import is here
// it returns a function that takes the secrey key as param
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// call for express and set port up
const app = express()
const port = process.env.PORT || 5000


// MIDDLEWARES

// everything will be gzipped IRT
app.use(compression())

// each res/req will be converted to JSON
app.use(bodyParser.json())

// url strings in/out will not contain invalid characters
app.use(bodyParser.urlencoded({ extended: true }))

// Enforce all request to be converted to https://
// Heroku runs a reverse proxy to forge unencrypted HTTP 
// traffic to it, which HIDES the headers (so, Heroku does
// not know if the request comes from HTTP).
// trustProtoHeader tells Heroku to pass those requests 
app.use(enforce.HTTPS({ trustProtoHeader: true }))

// if a req/res is being sent to a different server, it is
// cancelled by default. This applies to ports too.
// CORS will allow our localhost:3000 (frontend) to our
// localhost:5000 (backend). This is why we set the proxy up.
app.use(cors())


// HEROKU PRODUCTION ENVIRONMENT

if (process.env.NODE_ENV === 'production') {

  // make the app compatible with HTTP as well as HTTPS
  app.use(enforce.HTTPS({ trustProtoHeader: true }));

  // serve all static files in client/build folder (HTML/CSS/JS)  
  // (which is automatically built by package.json)
  app.use(express.static(path.join(__dirname, 'client/build')))

  // Serve all paths and send index.html inside client/build.
  // get is GET request, when the client asks for a URL.
  // the second parameter is the callback triggered on GET.
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}


// PORT LISTENING

app.listen(port, error => {
  if (error) throw error
  console.log('Server running on port ' + port)
})


// ROUTING

// if service-worker.js is requested (PWA, browsers)
app.get('/service-worker.js', (req, res) => {

  // direct them to the file. From client, up one folder,
  // then into build, and there you have the file.
  res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'))
})

app.post('/payment', (req, res) => {

  // the token from Stripe will come with the req object, which
  // serves as an identifier of who made the payment.
  const body = {
    source: req.body.token.id,   // the id of token is stipe source
    amount: req.body.amount,     // the total amount of the purchase
    currency: 'usd'              // currency in stripe (has many others)
  }

  // create the actual charge with Stripe. It callbacks with
  // an error or a response if successful
  stripe.charges.create(body, (stripeErr, stripeRes) => {

    // on error, respond with 500 and the error message
    if (stripeErr) res.status(500).send({ error: stripeErr })

    // otherwise, 200 and a success message
    else res.status(200).send({ success: stripeRes })
  })
})