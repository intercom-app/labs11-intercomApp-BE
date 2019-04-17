require('dotenv').config({path: '../../.env'});
const router = require('express').Router();
const stripe = require("stripe")(process.env.SK_TEST);
router.use(require("body-parser").text());


//Returns a list of your customers. The customers are returned sorted by creation date, with the most recent customers appearing first.
const arrayOfCustomerIds = async(numberToRetrieve) => { 
    try{
        const res = await stripe.customers.list({limit:numberToRetrieve}); //return A object with a data property that contains an array of up to limit customers, starting after customer starting_after
        
        const arrayOfCustomerObjects = res.data;
        // console.log(arrayOfCustomerObjects);

        const arrayOfCustomerStripeIds = arrayOfCustomerObjects.map((obj) => {
            return obj.id
        });
        // console.log(arrayOfCustomerStripeIds)
        return arrayOfCustomerStripeIds
        
    } catch (err) {
        console.log(err);
    }
} 

// Permanently deletes a customer. It cannot be undone. Also immediately cancels any active subscriptions on the customer.
const deleteCustomers = async(numberToDelete) => {
    const deletedCustomers = [];
    try {
        const customerIds = await arrayOfCustomerIds(numberToDelete);
        // console.log(customerIds)

        for (let i = 0; i < customerIds.length; i++) {
            const deleted = await stripe.customers.del(customerIds[i]);
            deletedCustomers.push(deleted);
        }
        console.log(deletedCustomers)
        return deletedCustomers
    } catch(err) {
        console.log(err)
    }
}


// All stripe charges 

const getAllCharges = async() => {
    let allChargesArr = [];
    try{
        const allCharges = await stripe.charges.list({limit:3});
        console.log('allCharges: ', allCharges)
        return allCharges
    } catch(err) {
        console.log(err)
    }
}

getAllCharges();