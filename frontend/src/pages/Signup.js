import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import utils from '../utils';

const Signup = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectUrl ? redirectUrl : '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const { state, dispatch: newDispatch } = useContext(Store);
  const { userInfo } = state;
  const url =process.env.URL
  const handlesubmit = async (e) => {
      e.preventDefault();
    console.log('confirmpassword: ', confirmpassword);
    console.log('password: ', password);
    if (password !== confirmpassword) {
      return toast.error('password does not same');
    }
    try {
      const { data } = await axios.post(url+'/api/user/signup', {
        name,
        email,
        password,
      });
      newDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userData', JSON.stringify(data));
      navigate(redirect || '/');
      toast.success('success');
    } catch (error) {
      toast.error(utils(error));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <>
      <Container className="container">
        <Helmet>
          <title>Sign up</title>
        </Helmet>
        <h3 className="my-3">Sign up</h3>
        <Form onSubmit={handlesubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="ConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="warning" type="submit">
            Sign up
          </Button>
          <div className="mt-3">
            Already have an Account?{' '}
            <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Signup;
