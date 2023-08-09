import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, ListGroup, Card, Badge, Button } from 'react-bootstrap';
import Rating from '../Components/Rating';
import { Helmet } from 'react-helmet-async';
import Loadingbox from '../Components/Loadingbox';
import MessageBox from '../Components/MessageBox';
import utils from '../utils';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, product: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const Product = () => {
  const [disable , setdisable] = useState(false)
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [{ loading, product, error }, dispatch] = useReducer(reducer, {
    product: [],
    error: '',
    loading: true,
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/product/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: utils(error) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: newDispatch } = useContext(Store);
  const { cart } = state;
  const handelCart = async () => {
    const exists = cart.CartItems.find((x) => x._id === product._id);
    const quantity = exists ? (exists.quantity += 1) : 1;
    const { data } = await axios.get(`/api/product/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry, This Product is out of stock');
      setdisable(true)
      return;
    }
    newDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/cart');
  };
  return (
    <>
      {loading ? (
        <Loadingbox />
      ) : error ? (
        <MessageBox variant="danger"> {error}</MessageBox>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <img
                className="image-larger"
                src={product.image}
                alt={product.name}
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Helmet>
                    <title>{product.name}</title>
                  </Helmet>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={product.rating}
                    numReview={product.numReviews}
                  ></Rating>
                </ListGroup.Item>
                <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  <img
                    className="image-smaller"
                    src={product.image}
                    alt={product.name}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  Description:{' '}
                  <p>
                    <b>{product.description}</b>
                  </p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>${product.price}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0 ? (
                            <Badge bg="success">In Stock</Badge>
                          ) : (
                            <Badge bg="danger">Unavailable</Badge>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {!disable ? (
                      <ListGroup.Item>
                        <div className="d-grid">
                          <Button onClick={handelCart} variant="warning">
                            ADD TO CART
                          </Button> 
                        </div>
                      </ListGroup.Item>
                    ) : (
                      <Button variant="light" disabled className="mt-2">
                        Out Of Stock
                      </Button>
                    )}
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

export default Product;
