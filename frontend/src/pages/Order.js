import React, { useContext, useEffect, useReducer } from 'react';
import Loadingbox from '../Components/Loadingbox';
import MessageBox from '../Components/MessageBox';
import utils from '../utils';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const Order = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { state, dispatch: newDispatch } = useContext(Store);
  const { userInfo, cart } = state;
  const { id: orderId } = params;
  const [{ loading, order, error }, dispatch] = useReducer(reducer, {
    order: {},
    error: '',
    loading: true,
  });
  console.log('order: ', order);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(`/api/order/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        console.log('data: ', data);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: utils(error) });
      }
    };

    if (!userInfo) {
      return navigate('/login');
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchData();
    }
  }, [order, orderId, navigate, userInfo]);
  return (
    <>
      {}
      {loading ? (
        <Loadingbox />
      ) : error ? (
        <MessageBox variant="danger"> {error}</MessageBox>
      ) : (
        <div>
          <Helmet>
            <title>Order </title>
          </Helmet>
          <h3>Order {orderId}</h3>
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
                  {console.log('order.isDelivered: ', order)}
                  {order.isDelivered ? (
                    <MessageBox variant="success">Delivered </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Not Delivered</MessageBox>
                  )}
                </Card.Body>
              </Card>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Payment</Card.Title>
                  <Card.Text>
                    <b>Method: </b>
                    {cart.paymentMethod}
                  </Card.Text>
                  {order.isPaid ? (
                    <MessageBox variant="success">Paid </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Not Paid</MessageBox>
                  )}
                </Card.Body>
              </Card>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Items</Card.Title>
                  <ListGroup variant="flush">
                    {order.orderItem.map((item) => (
                      <ListGroup.Item key={item._id}>
                        <Row className="align-items-center">
                          <Col md={6}>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="image-smaller"
                            />
                            <Link to={`/product/${item.slug}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={3}>
                            <span>{item.quantity}</span>
                          </Col>
                          <Col md={3}>${item.price}</Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
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
                        <Col>${order.ItemPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping</Col>
                        <Col>${order.ShippingPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Tax</Col>
                        <Col>${order.TaxPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <strong> Order Total:</strong>
                        </Col>
                        <Col>
                          <strong>${order.totalPrice.toFixed(2)}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {loading && <Loadingbox></Loadingbox>}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Order;
