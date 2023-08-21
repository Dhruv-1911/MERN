import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Store } from '../Store';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import MessageBox from '../Components/MessageBox';
import { Link, useNavigate } from 'react-router-dom';

const url = "https://mern-rhj0.onrender.com"
const Cart = () => {
  let total = 0;
  const navigate = useNavigate();
  const { state, dispatch: newDispatch } = useContext(Store);
  const {
    cart: { CartItems },
  } = state;
  const countfun = async (item, quantity) => {
    console.log('url: ', url);
    const { data } = await axios.get(url + `/api/product/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry, This Product is out of stock');
      return;
    }
    newDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  const handleRemove = (item) => {
    newDispatch({
      type: 'CART_DELETE',
      payload: item,
    });
  };

  const checkoutHandle = () => {
    navigate('/signin?redirect=/shipping');
  };

  const getPrice = (price, quantity) => {
    const sum = price * quantity;
    total += sum;
    return sum;
  };
  return (
    <>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <div>Shopping Cart</div>
      <Row>
        <Col md={8}>
          {CartItems.length === 0 ? (
            <MessageBox>
              Cart is Empty. <Link to={'/'}>Go To Store</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {CartItems.map((data) => (
                <ListGroup.Item  key={data.index} >
                  <Row className="align-items-center">
                    <Col md={4}  >
                      <img
                        className="image-fluid rounded"
                        src={data.image}
                        alt={data.name}
                      />{' '}
                      <Link to={`/product/${data.slug}`}>{data.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() => {
                          countfun(data, data.quantity - 1);
                        }}
                        variant="outline-dark"
                        disabled={data.quantity === 1}
                      >
                        -{' '}
                      </Button>{' '}
                      <span>{data.quantity}</span>{' '}
                      <Button
                        onClick={() => {
                          countfun(data, data.quantity + 1);
                        }}
                        variant="outline-dark"
                        // disabled={data.quantity === data.countInStock}
                      >
                        {' '}
                        +
                      </Button>
                    </Col>
                    <Col md={2}>${getPrice(data.price, data.quantity)}</Col>
                    <Col md={3}>
                      <Button
                        onClick={() => {
                          handleRemove(data);
                        }}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card >
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>
                    SubTotal ({CartItems.reduce((a, c) => a + c.quantity, 0)}):
                    ${total}
                  </h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      onClick={checkoutHandle}
                      variant="warning"
                      type="button"
                      disabled={CartItems.quantity === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}></Col>
      </Row>
    </>
  );
};

export default Cart;
