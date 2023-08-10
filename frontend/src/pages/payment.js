import React from 'react';
import { Helmet } from 'react-helmet-async';
import CheckoutStep from '../Components/CheckoutStep';

const payment = () => {
  return (
    <>
      <CheckoutStep step1 step2 step3 />
      <Helmet>
        <title>Payment</title>
      </Helmet>
    </>
  );
};

export default payment;
