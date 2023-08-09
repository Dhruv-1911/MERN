import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import MessageBox from '../Components/MessageBox';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { CartItems },
  } = state;
  console.log('CartItems: ', CartItems);
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
                <ListGroup.Item key={data.index}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        className="image-fluid rounded"
                        src={data.image}
                        alt={data.name}
                      />{' '}
                      <Link to={`/product/${data.slug}`}>{data.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button variant="light" disabled={data.quantity === 1}>
                        {' '}
                        -{' '}
                      </Button>{' '}
                      <span>{data.quantity}</span>{' '}
                      <Button
                        variant="light"
                        disabled={data.quantity === data.countInStock}
                      >
                        {' '}
                        +{' '}
                      </Button>
                    </Col>
                    <Col md={2}>${data.price}</Col>
                    <Col md={3}>
                      <Button variant="danger">Delete</Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>
                    SubTotal ({CartItems.reduce((a, c) => a + c.quantity, 0)}):
                    $({CartItems.reduce((a, c) => a + c.price, 0)})
                  </h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
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
