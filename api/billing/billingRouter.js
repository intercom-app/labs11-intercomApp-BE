require('dotenv');
const router = require('express').Router();
// const stripe = require("stripe")(process.env.SK_TEST);
router.use(require("body-parser").text());
const stripe = require("stripe")(process.env.SK_TEST);
// const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);




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



router.post('/groupCosts', async(req,res) => {
  try{
    console.log('/groupCosts  hit');
    const groupId = req.body.groupId;
    let groupCostsList = [];
    const groupCosts = await client.calls.list();

    for (let i = 0; i < groupCosts.length; i++) {
        if (groupCosts[i].from_formatted === groupId) {
            groupCostsList.push(groupCosts[i].price)
        }
    }

    let totalCost = 0;
    for (let i = 0; i < groupCostsList.length;i++) {
      totalCost += groupCostsList[i];
    }

    res.status(200).json({'totalcost':totalCost});

  } catch(err) {
    console.log(err)
  }
})




// const callSessions = async(groupId) => {
//     try{
//         // const res = await axios.get(`https://api.twilio.com/2010-04-01/Accounts/${process.env.ACCOUNT_SID}/Calls.json`);
//         // console.log(res)

//         // const callSessions = await client.calls.list();

//         let callSessionsPriceList = []

//         // const callSessions = await client.calls.each({from_formatted:`${groupId}`},
//         //     calls => {
//         //         console.log(calls.price);
//         //         callSessionsList.push(calls.price)
//         // });



//         // let callSessionsContainer =[];
//         // console.log('callSessionsList: ', callSessionsList)

//         const callSessions = await client.calls.list();
//         // console.log('callSessions:', callSessions)
//         for (let i = 0; i < callSessions.length; i++) {
//             if (callSessions[i].from_formatted === groupId) {
//                 callSessionsPriceList.push(callSessions[i].price)
//             }
//         }
//         console.log('callSessionsPriceList: ', callSessionsPriceList)
//         // return callSessionsList

        
        
//     }
//     catch(err) {
//         console.log(err)
//     }
// }

// callSessions();



module.exports = router;