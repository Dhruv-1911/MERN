import React, { useEffect, useReducer, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import utils from '../utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Col, Row } from 'react-bootstrap';
import Rating from '../Components/Rating';
import Loadingbox from '../Components/Loadingbox';
import MessageBox from '../Components/MessageBox';
import Product from '../Components/Product';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        products: action.payload.product,
        countproduct: action.payload.countproduct,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const prices = [
  {
    name: '$1 to $50',
    value: '1-50',
  },
  {
    name: '$51 to $200',
    value: '51-200',
  },
  {
    name: '$201 to $1000',
    value: '201-1000',
  },
];

const ratings = [
  {
    name: '4star & up',
    rating: 4,
  },
  {
    name: '3star & up',
    rating: 3,
  },
  {
    name: '2star & up',
    rating: 2,
  },
  {
    name: '1star & up',
    rating: 1,
  },
];
const SearchPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const category = sp.get('category') || 'all';
  const query = sp.get('query') || 'all';
  const price = sp.get('price') || 'all';
  const rating = sp.get('rating') || 'all';
  const order = sp.get('order') || 'newest';
  const page = sp.get('page') || 'all';

  const [{ loading, error, products, countproduct }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });
    const url = "https://mern-rhj0.onrender.com"
  useEffect(() => {
    const fetchdata = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(url+
          `/api/product/search?category=${category}&page=${page}&query=${query}&price=${price}&rating=${rating}&order=${order}`
        );

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: utils(error) });
      }
    };
    fetchdata();
  }, [category, page, query, price, rating, order]);

  const [Categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const { data } = await axios.get(url+'/api/product/categories');
        setCategories(data);
      } catch (error) {
        toast.error(utils(error));
      }
    };
    fetchdata();
  }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterpage = filter.page || page;
    const filtercategory = filter.category || category;
    const filterquery = filter.query || query;
    const filterprice = filter.price || price;
    const filterrating = filter.rating || rating;
    const sortrorder = filter.order || order;

    return `search/category=${filtercategory}&query=${filterquery}&price=${filterprice}&rating=${filterrating}&order=${sortrorder}&page=${filterpage}`;
  };
  return (
    <div>
      <Helmet>
        <title>Search Products</title>
      </Helmet>
      <Row>
        <Col md={3}>
          <h3>Department</h3>
          <div>
            <ul>
              <li>
                <Link
                  className={category === 'all' ? 'text-bold' : ''}
                  to={getFilterUrl({ category: 'all' })}
                >
                  Any
                </Link>
              </li>
              {Categories.map((c) => (
                <li>
                  <Link
                    className={category === c ? 'text-bold' : ''}
                    to={getFilterUrl({ category: c })}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              <li>
                <Link
                  className={price === 'all' ? 'text-bold' : ''}
                  to={getFilterUrl({ price: 'all' })}
                >
                  Any
                </Link>
              </li>
              {prices.map((P) => (
                <li key={P.value}>
                  <Link
                    to={getFilterUrl({ price: P.value })}
                    className={price === P.value ? 'text-bold' : ''}
                  >
                    {P.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Avg. Customer Review</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    className={`${rating}` === `${r.rating}` ? 'text-bold' : ''}
                  >
                    <Rating rating={r.rating} caption={' & up'} />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  className={rating === 'all' ? 'text-bold' : ''}
                  to={getFilterUrl({ rating: 'all' })}
                >
                  <Rating rating={0} caption={' & up'} />
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <Loadingbox></Loadingbox>
          ) : error ? (
            <MessageBox varient="danger">{error}</MessageBox>
          ) : (
            <>
              <Row className="d-flex justify-content-center">
                <Col md={6}>
                  <div>
                    {countproduct === 0 ? 'no' : countproduct}Results
                    {query !== 'all' && ' : ' + query}
                    {category !== 'all' && ' : ' + category}
                    {price !== 'all' && 'price : ' + price}
                    {rating !== 'all' && ' rating: ' + rating + ' & up'}
                    {query !== 'all' ||
                    category !== 'all' ||
                    price !== 'all' ||
                    rating !== 'all' ? (
                      <Button variant="light" onClick={navigate('/search')}>
                        click
                      </Button>
                    ) : null}
                  </div>
                </Col>
                <Col className="text-end">
                  Sort by
                  <select
                    value={order}
                    onClick={(e) => {
                      getFilterUrl({ order: e.target.value });
                    }}
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">price: Low to High</option>
                    <option value="highest">price: High to Low</option>
                    <option value="toprated">Avg. Customer Review</option>
                  </select>
                </Col>
              </Row>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}

              <Row>
                {products.map((product) => (
                  <Col sm={6} lg={4} className="mb-3" key={product._id}>
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SearchPage;
