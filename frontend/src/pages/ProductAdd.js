import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';
import utils from '../utils';
import axios from 'axios';
import { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false, product: action.payload };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

const url = 'https://mern-rhj0.onrender.com';
// const url = 'http:/localhost:5000';

function ProductAdd() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [countInStock, setCountinStock] = useState('');
  const [brand, setBrand] = useState('');
  const [rating, setRating] = useState('');
  const [numReviews, setNumReviews] = useState('');
  const [description, setDescription] = useState('');

  const { state, dispatch: newDispatch } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [{ loading, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
  });

    useEffect(() => {
      if (userInfo.isAdmin) {
        navigate('/product/add');
      }
    }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    console.log('e: ', e);
    try {
      e.preventDefault();
      dispatch({ type: 'CREATE_REQUEST', loading: true });
      const { data } = await axios.post(url + '/api/product', {
        name,
        slug,
        image,
        category,
        price,
        countInStock,
        brand,
        rating,
        numReviews,
        description,
      });
      dispatch({ type: 'CREATE_SUCCESS', payload: data });
      navigate('/');
      toast.success('success');
    } catch (error) {
      toast.error(utils(error));
      dispatch({ type: 'CREATE_FAIL' });
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Form.Group
            as={Col}
            md="12"
            className="mt-3"
            controlId="validationCustom01"
          >
            <Form.Label>name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            md="12"
            className="mt-3"
            controlId="validationCustom02"
          >
            <Form.Label>slug</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Slug"
              onChange={(e) => setSlug(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            md="12"
            className="mt-3"
            controlId="validationCustom02"
          >
            <Form.Label>Image</Form.Label>
            <Form.Control
              required
              type="file"
              name="myfile"
              placeholder="Image"
              onChange={(e) => setImage(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            md="12"
            className="mt-3"
            controlId="validationCustom02"
          >
            <Form.Label>category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Category"
              required
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group
            as={Col}
            md="12"
            className="mt-3"
            controlId="validationCustom03"
          >
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Price"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            md="12"
            className="mt-3"
            controlId="validationCustom03"
          >
            <Form.Label>CountInStock</Form.Label>
            <Form.Control
              type="text"
              placeholder="countInStock"
              required
              onChange={(e) => setCountinStock(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            md="12"
            className="mt-3"
            controlId="validationCustom03"
          >
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Brand"
              required
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            md="12"
            className="mt-3"
            controlId="validationCustom03"
          >
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="text"
              placeholder="Rating"
              required
              onChange={(e) => setRating(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            md="12"
            className="mt-3"
            controlId="validationCustom03"
          >
            <Form.Label>numReviews</Form.Label>
            <Form.Control
              type="text"
              placeholder="numReviews"
              required
              onChange={(e) => setNumReviews(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            md="12"
            className="mt-3"
            controlId="validationCustom03"
          >
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Button type="submit">Submit form</Button>
      </Form>
    </>
  );
}

export default ProductAdd;
