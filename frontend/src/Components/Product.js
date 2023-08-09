import React, { useContext, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../Components/Rating';
import { Store } from '../Store';
import axios from 'axios';

const Product = ({ product }) => {
  const [disable, setdisable] = useState(false)
  const { state, dispatch: newDispatch } = useContext(Store);
  const {
    cart: { CartItems },
  } = state;

  const handelCart = async () => {
    const exists = CartItems.find((x) => x._id === product._id);
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
  };

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img className="card-img-top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Card.Text className="m-0">${product.price}</Card.Text>
        <Rating rating={product.rating} numReview={product.numReviews}></Rating>
        {!disable ? (
          <Button
            onClick={() => {
              handelCart();
            }}
            variant="warning"
            className="mt-2"
          >
            Add to Cart
          </Button>
        ) : (
          <Button variant="light" disabled className="mt-2">
            Out Of Stock
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;
