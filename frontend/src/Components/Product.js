import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../Components/Rating'

const Product = ({product}) => {
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img  className="card-img-top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Card.Text className='m-0'>${product.price}</Card.Text>
        <Rating rating={product.rating} numReview={product.numReviews}></Rating>
        {product.countInStock >0 ? <Button  variant="warning" className='mt-2'>Add to Cart</Button> : <div className='mt-2 p-2' variant='light'>Out Of Stock</div> }
        
      </Card.Body>
    </Card>
  );
};

export default Product;
