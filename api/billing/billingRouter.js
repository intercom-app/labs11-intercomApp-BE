require('dotenv');
const router = require('express').Router();
// const stripe = require("stripe")(process.env.SK_TEST);
router.use(require("body-parser").text());
const stripe = require("stripe")(process.env.SK_TEST);
const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const axios = require('axios');


// api/purchasingAndBilling

router.get('/', async (req,res) => {
    res.send('Hello from express router!');
})

// the FE sends the token to this endpoint
router.post('/charge2', async (req, res) => {
    try {
      // console.log('req: ', req)
      let {status} = await stripe.charges.create({
        amount: 500,
        currency: "usd",
        description: "An example charge",
        source: req.body
      });
      // console.log(req)
  
      res.json({status});
    } catch (err) {
        // console.log('err: ', err);
        res.status(500).end();
    }
});



// endpoint for attaching a credit card to a customer
router.post('/attachSourceToCustomer', async(req,res) => {
  try{
    // console.log('/attachSourceToCustomer got hit')
    // in the request body, there should be the customer id and the source id
    const userStripeId = req.body.userStripeId;
    // console.log('userStripeId',userStripeId);
    const sourceId = req.body.sourceId;
    // console.log('sourceId', sourceId);

    const newlyAttachedSource = await stripe.customers.createSource(userStripeId, {source:sourceId});
    // const newlyAttachedSource = await axios.post(`https://api.stripe.com/v1/customers/${userStripeId}/sources`, sourceId);
    // console.log('newlyAttachedSource: ', newlyAttachedSource);
    res.status(200).json(newlyAttachedSource);
    

  } catch (err) {
    // console.log('err: ', err);
    res.status(500).json(err);
  }
})


// endpoint for updating the customer's default credit card payment method
router.post('/updateDefaultSource', async(req,res) => {
  try{
    // console.log('/updateDefaultSource got hit')
    // in the request body, there should be the customer id and the source id
    const userStripeId = req.body.userStripeId;
    // console.log('userStripeId',userStripeId);
    const sourceId = req.body.sourceId;
    // console.log('sourceId', sourceId);
    
    // attach source to the customer object in stripe's backend
    const newlyUpdatedSource = await stripe.customers.update(userStripeId, {source:sourceId});
    // console.log('newlyUpdatedSource.data: ', newlyUpdatedSource.data);
    res.status(200).json(newlyUpdatedSource);
  } catch (err) {
    // console.log('err: ', err);
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
    // console.log('/createPaymentIntent hit');
    // console.log('req.body: ', req.body ); // this returns undefined in the console  
    const amountToAddToAccountBalance = req.body.amountToAddToAccountBalance;
    // console.log('amountToAddToAccountBalance: ', amountToAddToAccountBalance)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountToAddToAccountBalance,
      currency:'usd',
      payment_method_types: ['card']
    });
    // console.log('paymentIntent: ',paymentIntent)
    // console.log('client_secret: ', paymentIntent.client_secret);
    res.status(200).json({'client_secret':paymentIntent.client_secret});
  } 
  catch (err) {
    // console.log('err: ', err.response);
    res.status(500).json(err.response);
  }
});


// endpoint for making a charge
router.post('/createCharge', async(req,res) => {
  try{
    // console.log('/createCharge hit');
    // console.log('req.body: ', req.body);
    const userStripeId = req.body.userStripeId;
    const sourceId = req.body.sourceId;
    const amountToAdd = req.body.amountToAdd;
    // console.log('amountToAdd: ', amountToAdd);

    const charge = await stripe.charges.create({
      amount:amountToAdd,
      currency: 'usd',
      customer: userStripeId, 
      source: sourceId
    });

    // console.log('charge: ',charge);
    res.status(200).json({'charge':charge});
  } 
  catch (err) {
    // console.log('errorMessage: ', err.message);
    res.status(200).json({'errorMessage':err.message});
  }
});

// endpoint for gettting the user's default payment source
router.post('/retrieveCustomerDefaultSource', async(req,res) => {
  try{
    // console.log('/retrieveCustomerDefaultSource hit');
    // console.log('req.body: ', req.body)
    const userStripeId = req.body.userStripeId;

    const customer = await stripe.customers.retrieve(userStripeId);
    // console.log('customer: ',customer);
    const defaultSourceId = customer.default_source;
    // console.log('defaultSourceId: ', defaultSourceId)

    res.status(200).json({'defaultSourceId':defaultSourceId});
  } 
  catch (err) {
    // console.log('err: ', err);
    res.status(500).json(err);
  }
});



router.post('/groupTwilioCharges', async(req,res) => {
  try{
    // console.log('/groupTwilioCharges hit');
    const groupId = req.body.groupId;
    // console.log('groupId: ',  groupId);
    let groupTwilioCharges = [];
    const allTwilioChargesRes = await client.calls.list();
    // console.log('allTwilioChargesRes: ', allTwilioChargesRes)

    
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
    // console.log('sumOfGroupTwilioCharges: ', sumOfGroupTwilioCharges);
    // console.log('group twilio charges endpoint success');

    res.status(200).json({'sumOfGroupTwilioCharges':sumOfGroupTwilioCharges});
  } catch(err) {
    // console.log(err);
    res.status(500).json(err);
  }
});


router.get('/allTwilioCharges', async(req,res) => {
  try{
    // console.log('/allTwilioCharges hit');
    // const groupId = req.body.groupId;
    // let groupTwilioCharges = [];
    const allTwilioChargesRes = await client.calls.list();
    // console.log('allTwilioChargesRes: ', allTwilioChargesRes)

    const mostRecent = allTwilioChargesRes[0]
    // console.log('mostRecent: ', mostRecent)

    res.status(200).json({'allTwilioChargesRes':allTwilioChargesRes});
  } catch(err) {
    // console.log(err);
    res.status(500).json(err);
  }
});


// All of a user's stripe charges 

router.post('/userStripeCharges', async(req,res) => {
  try {
    '/userStripeCharges hit'
      const userStripeId = req.body.userStripeId;
      // console.log('userStripeId: ',userStripeId );
      // const allChargesRes = await stripe.charges.list({limit:100});
      const allChargesRes = await stripe.charges.list({customer:userStripeId, limit:100});
      // console.log('allUserStripeCharges.data.length: ', allChargesRes.data.length)

      // const allCustomerCharges = allCharges.filter(charge => charge.customer === stripeId)

      let userStripeChargesArr = allChargesRes.data.filter(charge => charge.customer === userStripeId);
      // console.log('userStripeChargesArr: ', userStripeChargesArr);
      // console.log('userStripeChargesArr.length: ', userStripeChargesArr.length);
      userStripeChargesArr = userStripeChargesArr.map(chargeObj => {
        return chargeObj.amount
      })

      // console.log('userStripeChargesArr: ', userStripeChargesArr);

      let sumOfUserStripeCharges = 0;
      // console.log('sumOfGroupTwilioCharges: ', sumOfGroupTwilioCharges)
      for (let i = 0; i < userStripeChargesArr.length;i++) {
        sumOfUserStripeCharges += userStripeChargesArr[i];
        // console.log('sumOfUserStripeCharges [cents]: ', sumOfUserStripeCharges)
      }
      // console.log('sumOfUserStripeCharges [cents]: ', sumOfUserStripeCharges)
      sumOfUserStripeCharges = sumOfUserStripeCharges/100; // converting from cents to dollars
      // console.log('sumOfUserStripeCharges [dollars]: ', sumOfUserStripeCharges)

      res.status(200).json({'sumOfUserStripeCharges':sumOfUserStripeCharges});
  } catch(err) {
    // console.log('err: ', err);
    res.status(500).json(err);
  }
});


// endpoint for updating a user's credit card (api/billingRouter/updateCreditCardIOS)

// -inputs should be user object
// -from the user object, we get the user's stripeId
// 

router.post('/updateCreditCard', async(req,res) => {
  try{
    const host = 'http://localhost:3300';
    // const host = 'intercom.netlify.com'
    const userId = req.body.userId;
    const getUserResponse = await axios.get(`${host}/api/users/${userId}`);
    // console.log('getUserResponse.data: ',getUserResponse.data);
    const userStripeId=getUserResponse.data.stripeId;
    // console.log('userStripeId: ',userStripeId);

    // //step 1: Create the source on the front-end and send it here to the backend. Receive new source here.
    const source = req.body.source;
    // console.log('source: ', source);

    //step 2: update the default source associated with the customer on stripe's backend

    // Note: This should have been named updateCustomerRes since we're updating the source attached to the customer object on stripe's backend. Leaving it like this for now. 
    const updateSourceRes = await axios.post(`${host}/api/billing/updateDefaultSource`, {
      'userStripeId': userStripeId,
      'sourceId':source.id
    });
    // console.log('updateSourceRes: ', updateSourceRes);

    if (updateSourceRes.error) {
      // console.log('updatedSourceRes.error: ', updateSourceRes.error);
      res.status(200).json({'updateSourceError':updateSourceRes.error});
    }

    const last4 = updateSourceRes.data.sources.data[0].card.last4;
    // console.log('newLast4: ', last4);
    await axios.put(`${host}/api/users/${userId}/last4`, {last4:last4})

    const updatedSource = updateSourceRes.data.updatedSource;
    // console.log('updatedSource: ', updatedSource)
    // return updatedSource; 
    res.status(200).json({'updatedSource': updatedSource});
  } catch(err) {
    // console.log('err: ', err);
    return err
  }
})

router.post('/addMoney', async(req,res) => {
  try{
    const host = 'http://localhost:3300';
    // const host = 'heroku database url';
    const userId = req.body.userId;
    const getUserResponse = await axios.get(`${host}/api/users/${userId}`);
    // console.log('getUserResponse.data: ',getUserResponse.data);
    const userStripeId=getUserResponse.data.stripeId;
    // console.log('userStripeId: ',userStripeId);

    let amountToAdd = req.body.amountToAdd; // in dollars
    // console.log('amountToAdd [dollars]: ',amountToAdd); // in dollars

    amountToAdd = Math.round(amountToAdd*100) //in cents
    // console.log('amountToAdd [cents]: ',amountToAdd); // in cents

    

    // step 1: charge the customer for the amount of he wants to add to their account balance

    const customerStripeInfo = await axios.post(`${host}/api/billing/retrieveCustomerDefaultSource`,{'userStripeId':userStripeId});
    // console.log('customerStripeInfo: ', customerStripeInfo);
    const defaultSourceId = customerStripeInfo.data.defaultSourceId;
    // console.log('defaultSourceId: ', defaultSourceId);

    // TESTING - Soon to be phased out (but working) credit card charging method
    const chargeResponse = await axios.post(`${host}/api/billing/createCharge`, {
      'userStripeId':userStripeId,
      'sourceId': defaultSourceId,
      'amountToAdd': amountToAdd // amountToAdd is in dollars, so we multiply by 100 to have the units be cents (stripe wants the amountToAdd to be in cents when making a charge). 
    })

    // console.log('chargeResponse: ', chargeResponse);
    // console.log('chargeResponse.data: ', chargeResponse.data);

    if (chargeResponse.data.errorMessage) {
      // console.log('errorMessage: ',chargeResponse.data.errorMessage);
      res.status(200).json({'errorMessage':chargeResponse.data.errorMessage});
    }

    if (chargeResponse.data.charge.status === "succeeded") {
      // console.log('charge succeeded!');

      //step 2 recalculate the user's account balance and record the change in our backend via a put request

      //get the sum of all the user's stripe charges
      const sumOfUserStripeChargesRes = await axios.post(`${host}/api/billing/userStripeCharges`, {'userStripeId': userStripeId});
      // console.log('sumOfUserStripeChargesRes :', sumOfUserStripeChargesRes); 

      let sumOfUserStripeCharges = sumOfUserStripeChargesRes.data.sumOfUserStripeCharges;
      // console.log('sumOfUserStripeCharges [dollars]: ', sumOfUserStripeCharges); //in dollars


      //get the sum of all the user's twilio charges
      const allTwilioChargesRes = await axios.get(`${host}/api/billing/allTwilioCharges`);
      // console.log('allTwilioChargesRes: ', allTwilioChargesRes);
      let allTwilioCharges = allTwilioChargesRes.data.allTwilioChargesRes;
      // console.log('allTwilioCharges: ', allTwilioCharges);

      // first get a list of all the groups the user owns
      const userOwnedGroupsRes = await axios.get(`${host}/api/users/${userId}/groupsOwned`);
      const userOwnedGroups = userOwnedGroupsRes.data 
      const userOwnedGroupsIds = userOwnedGroups.map(group => {
        return group.groupId
      });
      // console.log('userOwnedGroupsIds: ', userOwnedGroupsIds);

      
        
      let twilioChargesForEachUserOwnedGroup = [];

      for (let i=0; i<userOwnedGroupsIds.length;i++) {
        let userOwnedGroupId = userOwnedGroupsIds[i];
        // console.log('userOwnedGroupId: ', userOwnedGroupId);
        const groupTwilioChargesRes = await axios.post(`${host}/api/billing/groupTwilioCharges`, {'groupId':userOwnedGroupId});        
        // console.log("groupTwilioChargesRes: ", groupTwilioChargesRes);
        // console.log('groupTwilioChargesRes.data.sumOfGroupTwilioCharges: ', groupTwilioChargesRes.data.sumOfGroupTwilioCharges);
    
        const sumOfGroupTwilioCharges = groupTwilioChargesRes.data.sumOfGroupTwilioCharges;
        // console.log('sumOfGroupTwilioCharges: ', sumOfGroupTwilioCharges);
    
        twilioChargesForEachUserOwnedGroup.push(sumOfGroupTwilioCharges);
      }
      // console.log('twilioChargesForEachUserOwnedGroup: ', twilioChargesForEachUserOwnedGroup);
  
      let sumOfUserTwilioCharges = 0;
      for (let i = 0; i < twilioChargesForEachUserOwnedGroup.length;i++) {
        sumOfUserTwilioCharges += twilioChargesForEachUserOwnedGroup[i];
      }
      // console.log('sumOfUserTwilioCharges (exact): ', sumOfUserTwilioCharges);
      sumOfUserTwilioCharges = Math.round(sumOfUserTwilioCharges*100)/100;
      // console.log('sumOfUserTwilioCharges (rounded): ', sumOfUserTwilioCharges);
  
  
  
      const updatedAccountBalance = sumOfUserStripeCharges + sumOfUserTwilioCharges;
      // console.log('updatedAccountBalance: ', updatedAccountBalance);
  
      await axios.put(`${host}/api/users/${userId}/accountBalance`,{accountBalance:updatedAccountBalance});
      res.status(200).json({'updatedAccountBalance':updatedAccountBalance})
    } 
  }
  catch(err) {
    // console.log('err: ', err);
    res.status(500).json({err});
  }
})


module.exports = router;