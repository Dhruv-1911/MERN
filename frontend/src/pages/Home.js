import React from 'react';
import data from '../data';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <h1>Featured Product</h1>
      <div className="products">
        {data.product.map((product) => (
          <div className="product" key={product.slug}>
            <Link to={`/product/${product.slug}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <div className="productInfo">
              <Link to={`/product/${product.slug}`}>
                <h5>{product.name}</h5>
              </Link>
              <h5>
                <b>${product.price}</b>
              </h5>
              <button>Add To Cart</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
