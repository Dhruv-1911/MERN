import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CheckoutStep from '../Components/CheckoutStep';
import { Button, Container, Form } from 'react-bootstrap';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const { state, dispatch: newDispatch } = useContext(Store);
  const {
    cart: {  shippingAddress , paymentMethod},
  } = state;
  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || 'Paypal' 
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const handlesubmit = (e) => {
    e.preventDefault();
    newDispatch({ type: 'PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };
  return (
    <>
      <CheckoutStep step1 step2 step3 />
      <Container className="container">
        <Helmet>
          <title>Payment</title>
        </Helmet>
        <h1 className="my-4">Payment Method</h1>
        <Form onSubmit={handlesubmit}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === 'PayPal'}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button variant="warning" type="submit">
              Coutinue
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Payment;
