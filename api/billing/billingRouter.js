require('dotenv');
const router = require('express').Router();
// const stripe = require("stripe")(process.env.SK_TEST);
router.use(require("body-parser").text());
const stripe = require("stripe")(process.env.SK_TEST);
const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);




// api/purchasingAndBilling

router.get('/', async (req,res) => {
    res.send('Hello from express router!');
})

// the FE sends the token to this endpoint
router.post('/charge2', async (req, res) => {
    try {
      console.log('req: ', req)
      let {status} = await stripe.charges.create({
        amount: 500,
        currency: "usd",
        description: "An example charge",
        source: req.body
      });
      console.log(req)
  
      res.json({status});
    } catch (err) {
        console.log('err: ', err);
        res.status(500).end();
    }
});



// endpoint for attaching a credit card to a customer
router.post('/attachSourceToCustomer', async(req,res) => {
  try{
    console.log('/attachSourceToCustomer got hit')
    // in the request body, there should be the customer id and the source id
    const userStripeId = req.body.userStripeId;
    console.log('userStripeId',userStripeId);
    const sourceId = req.body.sourceId;
    console.log('sourceId', sourceId);

    const newlyAttachedSource = await stripe.customers.createSource(userStripeId, {source:sourceId});
    // const newlyAttachedSource = await axios.post(`https://api.stripe.com/v1/customers/${userStripeId}/sources`, sourceId);
    console.log('newlyAttachedSource: ', newlyAttachedSource);
    res.status(200).json(newlyAttachedSource);
    

  } catch (err) {
    console.log('err: ', err);
    res.status(500).json(err);
  }
})


// endpoint for updating the customer's default credit card payment method
router.post('/updateDefaultSource', async(req,res) => {
  try{
    console.log('/updateDefaultSource got hit')
    // in the request body, there should be the customer id and the source id
    const userStripeId = req.body.userStripeId;
    console.log('userStripeId',userStripeId);
    const sourceId = req.body.sourceId;
    console.log('sourceId', sourceId);
    
    const newlyUpdatedSource = await stripe.customers.update(userStripeId, {source:sourceId});
    console.log('newlyUpdatedSource: ', newlyUpdatedSource);
    res.status(200).json(newlyUpdatedSource);
  } catch (err) {
    console.log('err: ', err);
    res.status(500).json(err);
  }
})


// endpoint for creating a PaymentIntent

// A PaymentIntent is an object that represents your intent to collect payment from a customer, tracking the lifecycle of the payment process through each stage. When you create a PaymentIntent, specify the amount of money that you wish to collect from the customer, the currency, and the permitted payment methods. 
// We recommend creating a PaymentIntent when the customer begins their checkout process. This helps track all the payment attempts with one object.
// The PaymentIntent object contains a client secret, a unique key that you need to pass to Stripe.js on the client side in order to create a charge. 
// The client secret can be used to complete the payment process with the amount specified on the PaymentIntent. It should not be logged, embedded in URLs, or exposed to anyone other than the customer. Make sure that you have TLS enabled on any page that includes the client secret.

// Note to self: When creating the paymentIntent object I can 
// also pass in the customer stripeId and a sourceId. I should 
// probably also add a statement_descriptor. And I should probably also 
// retrieve paymentIntent.status on the client side

router.post('/createPaymentIntent', async(req,res) => {
  try{
    console.log('/createPaymentIntent hit');
    console.log('req.body: ', req.body ); // this returns undefined in the console  
    const amountToAddToAccountBalance = req.body.amountToAddToAccountBalance;
    console.log('amountToAddToAccountBalance: ', amountToAddToAccountBalance)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountToAddToAccountBalance,
      currency:'usd',
      payment_method_types: ['card']
    });
    console.log('paymentIntent: ',paymentIntent)
    console.log('client_secret: ', paymentIntent.client_secret);
    res.status(200).json({'client_secret':paymentIntent.client_secret});
  } 
  catch (err) {
    console.log('err: ', err.response);
    res.status(500).json(err.response);
  }
});


// endpoint for making a charge
router.post('/createCharge', async(req,res) => {
  try{
    console.log('/createCharge hit');
    console.log('req.body: ', req.body);
    const userStripeId = req.body.userStripeId;
    const sourceId = req.body.sourceId;
    const amountToAdd = req.body.amountToAdd;
    console.log('amountToAdd: ', amountToAdd);

    const charge = await stripe.charges.create({
      amount:amountToAdd,
      currency: 'usd',
      customer: userStripeId, 
      source: sourceId
    });

    console.log('charge: ',charge);
    res.status(200).json({'charge':charge});
  } 
  catch (err) {
    console.log('err: ', err);
    res.status(500).json(err);
  }
});

// endpoint for gettting the user's default payment source
router.post('/retrieveCustomerDefaultSource', async(req,res) => {
  try{
    console.log('/retrieveCustomerDefaultSource hit');
    console.log('req.body: ', req.body)
    const userStripeId = req.body.userStripeId;

    const customer = await stripe.customers.retrieve(userStripeId);
    console.log('customer: ',customer);
    const defaultSourceId = customer.default_source;
    console.log('defaultSourceId: ', defaultSourceId)

    res.status(200).json({'defaultSourceId':defaultSourceId});
  } 
  catch (err) {
    console.log('err: ', err);
    res.status(500).json(err);
  }
});



router.post('/groupTwilioCharges', async(req,res) => {
  try{
    console.log('/groupTwilioCharges hit');
    const groupId = req.body.groupId;
    let groupTwilioCharges = [];
    const allTwilioChargesRes = await client.calls.list();
    // console.log('allTwilioChargesRes: ', allTwilioChargesRes)

    console.log('groupId: ',  groupId);
    // console.log('allTwilioChargesRes: ',  allTwilioChargesRes);

    for (let i = 0; i < allTwilioChargesRes.length; i++) {
        if (allTwilioChargesRes[i].fromFormatted === groupId) {
          groupTwilioCharges.push(allTwilioChargesRes[i].price)
        }
    }
    // console.log('groupTwilioCharges: ', groupTwilioCharges)

    let sumOfGroupTwilioCharges = 0;
    for (let i = 0; i < groupTwilioCharges.length;i++) {
      sumOfGroupTwilioCharges += groupTwilioCharges[i];
    }
    console.log('sumOfGroupTwilioCharges: ', sumOfGroupTwilioCharges)

    res.status(200).json({'sumOfGroupTwilioCharges':sumOfGroupTwilioCharges});
  } catch(err) {
    console.log(err)
    res.status(500).json(err);
  }
});


router.get('/allTwilioCharges', async(req,res) => {
  try{
    console.log('/allTwilioCharges hit');
    // const groupId = req.body.groupId;
    // let groupTwilioCharges = [];
    const allTwilioChargesRes = await client.calls.list();
    console.log('allTwilioChargesRes: ', allTwilioChargesRes)

    const mostRecent = allTwilioChargesRes[allTwilioChargesRes.length-1]
    console.log('mostRecent: ', mostRecent)

    // const allTwilioChargesResFromFormatted = client.calls.each({
    //   startTimeAfter: new Date(Date.UTC(2019,03,17)),
    //   status:'completed'
    // },
    //   calls => console.log(calls)
    // );

    res.status(200).json({'allTwilioChargesRes':allTwilioChargesRes});
  } catch(err) {
    console.log(err)
    res.status(500).json(err);
  }
});


// All of a user's stripe charges 

router.post('/userStripeCharges', async(req,res) => {
  try {
      const stripeId = req.body.stripeId;
      const allCharges = await stripe.charges.list();
      console.log('allCharges: ', allCharges)

      // const allCustomerCharges = allCharges.filter(charge => charge.customer === stripeId)

      let userStripeChargesArr = allCharges.data.filter(charge => charge.customer === stripeId);
      
      userStripeChargesArr = userStripeChargesArr.map(chargeObj => {
        return chargeObj.amount
      })

      // console.log('userStripeChargesArr: ', userStripeChargesArr);

      let sumOfUserStripeCharges = 0;
      // console.log('sumOfGroupTwilioCharges: ', sumOfGroupTwilioCharges)
      for (let i = 0; i < userStripeChargesArr.length;i++) {
        sumOfUserStripeCharges += userStripeChargesArr[i];
      }
      console.log('sumOfUserStripeCharges: ', sumOfUserStripeCharges)
      // sumOfUserStripeCharges = Math.round((sumOfUserStripeCharges/100))/100; // converting from cents to dollars
      // console.log('sumOfUserStripeCharges: ', sumOfUserStripeCharges)

      res.status(200).json({'sumOfUserStripeCharges':sumOfUserStripeCharges});
  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});







module.exports = router;