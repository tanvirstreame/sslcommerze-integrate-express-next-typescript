
import express, { Application, Request, Response } from "express";
const SSLCommerzPayment = require('sslcommerz').SslCommerzPayment
const bodyParser = require('body-parser')
const cors = require('cors');
const app: Application = express()
require('dotenv').config()

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());


app.get('/', async (request: Request, response: Response) => {

  /** 
  * Root url response 
  */

  return response.status(200).json({
    message: "Welcome to sslcommerz app",
    url: `${process.env.ROOT}/ssl-request`
  })
})

app.post('/ssl-request', async (request: Request, response: Response) => {

  /** 
  * Create ssl session request 
  */

  const data = {
    total_amount: request.body.price,
    currency: 'BDT',
    tran_id: 'REF123', // Make it unique, it is dummy
    success_url: `${process.env.ROOT}/ssl-payment-success`,
    fail_url: `${process.env.ROOT}/ssl-payment-fail`,
    cancel_url: `${process.env.ROOT}/ssl-payment-cancel`,
    shipping_method: 'No',
    product_name: request.body.name,
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: 'Customer Name',
    cus_email: 'cust@yahoo.com',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    multi_card_name: 'mastercard',
    value_a: 'ref001_A',
    value_b: 'ref002_B',
    value_c: 'ref003_C',
    value_d: 'ref004_D',
    ipn_url: `${process.env.ROOT}/ssl-payment-notification`,
  };

  const sslcommerz = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD, false) //true for live default false for sandbox
  sslcommerz.init(data).then((data: any) => {

    //process the response that got from sslcommerz 
    //https://developer.sslcommerz.com/doc/v4/#returned-parameters

    if (data?.GatewayPageURL) {
      return response.status(200).json({ data: data?.GatewayPageURL });
    }
    else {
      return response.status(400).json({
        message: "Session was not successful"
      });
    }
  });

});

app.post("/ssl-payment-notification", async (request: Request, response: Response) => {

  /** 
  * If payment notification
  */

  return response.status(200).json(
    {
      data: request.body,
      message: 'Payment notification'
    }
  );
})

app.post("/ssl-payment-success", async (request: Request, response: Response) => {

  /** 
  * If payment successful 
  */

  console.log("success response", request.body);
  return response.redirect(`${process.env.CLIENT_ROOT}/paymentSuccessful`);

})

app.post("/ssl-payment-fail", async (request: Request, response: Response) => {

  /** 
  * If payment failed 
  */

  console.log("fail response", request.body);
  return response.redirect(`${process.env.CLIENT_ROOT}/paymentFailure`);
})

app.post("/ssl-payment-cancel", async (request: Request, response: Response) => {

  /** 
  * If payment cancelled 
  */

  console.log("cancel response", request.body);
  return response.redirect(`${process.env.CLIENT_ROOT}/paymentFailure`);
})

app.listen(process.env.PORT, () =>
  console.log(`ssl app listening on port ${process.env.PORT}!`),
);
