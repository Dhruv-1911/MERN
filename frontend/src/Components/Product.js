import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../Components/Rating';
import { Store } from '../Store';

const Product = ({ product }) => {
  const { state, dispatch } = useContext(Store);
  const handelCart = (e) => {
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity: 1 },
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
        {product.countInStock > 0 ? (
          <Button onClick={handelCart} variant="warning" className="mt-2">
            Add to Cart
          </Button>
        ) : (
          <div className="mt-2 p-2" variant="light">
            Out Of Stock
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;
