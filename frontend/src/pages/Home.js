import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Product from '../Components/Product';
import { Helmet } from 'react-helmet-async';
import Loadingbox from '../Components/Loadingbox';
import MessageBox from '../Components/MessageBox';  

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const url = "https://mern-rhj0.onrender.com"

const Home = () => {
  const [{ loading, products, error }, dispatch] = useReducer(reducer, {
    products: [],
    error: '',
    loading: true,
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(url + '/api/product');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Helmet>
        <title>Store</title>
      </Helmet>
      <div className="products">
        {loading ? (
          <Loadingbox />
        ) : error ? (
          <MessageBox variant="danger"> {error}</MessageBox>
        ) : (
          <Row>
            <h1>Featured Product</h1>
            {products?.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </>
  );
};

export default Home;
