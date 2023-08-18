import React, { useContext, useEffect, useReducer } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import CheckoutStep from '../Components/CheckoutStep';
import { Store } from '../Store';
import { Link, useNavigate } from 'react-router-dom';
import utils from '../utils';
import axios from 'axios';
import Loadingbox from '../Components/Loadingbox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};
const PlaceOrder = () => {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });
  const { state, dispatch: newDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round1 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.ItemPrice = round1(
    cart.CartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  cart.ShippingPrice = cart.ItemPrice > 100 ? round1(0) : round1(10);
  cart.TaxPrice = round1(0.15 * cart.ItemPrice);
  cart.totalPrice = cart.ItemPrice + cart.ShippingPrice + cart.TaxPrice;
  const url = "https://mern-rhj0.onrender.com"
  const handlesubmit = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      
      console.log('cart.CartItems: ', cart.CartItems);
      const { data } = await axios.post(url+
        '/api/order',
        {
          orderItem: cart.CartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          ItemPrice: cart.ItemPrice,
          ShippingPrice: cart.ShippingPrice,
          TaxPrice: cart.TaxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
        );
        console.log('data: ', data);
      newDispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('CartItem');
      navigate(`/order/${data.order._id}`);

    } catch (error) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(utils(error));
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [navigate, cart]);
  return (
    <>
      <CheckoutStep step1 step2 step3 step4 />

      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="my-4">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping:</Card.Title>
              <Card.Text>
                <b>Name: </b>
                {cart.shippingAddress.fullname}
                <br />
                <b>Address: </b>
                {cart.shippingAddress.address} {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.country}
                {cart.shippingAddress.postalcode}
              </Card.Text>
              <Link to={'/shipping'}>Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <b>Method: </b>
                {cart.paymentMethod}
              </Card.Text>
              <Link to={'/payment'}>Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cart.CartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="image-smaller"
                        />
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to={'/cart'}>Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Item</Col>
                    <Col>${cart.ItemPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${cart.ShippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${cart.TaxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total:</strong>
                    </Col>
                    <Col>
                      <strong>${cart.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid mt-3">
                    <Button
                      type="button"
                      variant="warning"
                      onClick={handlesubmit}
                      disabled={cart.CartItems.length === 0}
                    >
                      Place Order
                    </Button>
                  </div>
                  {loading && <Loadingbox></Loadingbox>}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
