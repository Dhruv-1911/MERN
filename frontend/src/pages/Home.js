import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const Home = () => {
  const [ products , setProducts ] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/api/product');
        console.log('result: ', result);
        setProducts(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <h1>Featured Product</h1>
      <div className="products">
        {products.map((product) => (
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
