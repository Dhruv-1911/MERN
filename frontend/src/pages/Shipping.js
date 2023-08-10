import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import CheckoutStep from '../Components/CheckoutStep';

const Shipping = () => {
  const navigate = useNavigate();
  const { state, dispatch: newDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullname, setFullname] = useState(shippingAddress.fullname || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalcode, setPostalcode] = useState(
    shippingAddress.postalcode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [navigate, userInfo]);

  const submithandle = (e) => {
    e.preventDefault();
    newDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullname, address, city, postalcode, country },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({ fullname, address, city, country, postalcode })
    );
    navigate('/payment');
  };
  return (
    <>
      <CheckoutStep step1 step2 />
      <Container className="container mt-5">
        <Helmet>
          <title>Shipping Address</title>
        </Helmet>
        <h1 className="my-4">Shipping Address</h1>
        <Form onSubmit={submithandle}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalcode}
              onChange={(e) => setPostalcode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="warning" type="submit">
            Coutinue
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Shipping;
