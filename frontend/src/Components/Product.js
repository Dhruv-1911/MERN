import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../Components/Rating'

const Product = ({product}) => {
  return (
    <Card key={product.slug}>
      <Link to={`/product/${product.slug}`}>
        <img  className="card-img-top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Card.Text>${product.price}</Card.Text>
        <Rating rating={product.rating} numReview={product.numReviews}></Rating>
        <Button>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
