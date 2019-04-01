require('dotenv');
const router = require('express').Router();
// const stripe = require("stripe")(process.env.SK_TEST);
router.use(require("body-parser").text());




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

module.exports = router;