import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form} from 'react-bootstrap';
import {toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import axios from "axios"
import { Link, isRouteErrorResponse, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import utils from '../utils';


const Signin = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectUrl ? redirectUrl : '/';
  console.log('redirect: ', redirect);
  
  const { state, dispatch: newDispatch } = useContext(Store);
  const {userInfo} = state
  const navigate = useNavigate()
  const handlesubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/api/user/signin",{
        email,
        password
      })
      console.log('data: ', data);
      newDispatch({type:"USER_SIGNIN" , payload:data})
      localStorage.setItem("userData" , JSON.stringify(data))
      navigate(redirect || "/") 
      toast.success("success")
    } catch (error) {
      toast.error(utils(error))
    }
  };

  useEffect(()=>{
   if(userInfo){
    navigate(redirect)
   } 
  },[navigate,redirect,userInfo])

  return (
    <>
      <Container className="container">
        <Helmet>
          <title>Sign in</title>
        </Helmet>
        <h3 className="my-3">Sign in</h3>
        <Form onSubmit={handlesubmit}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required  onChange={(e) => setEmail(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required  onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>
          <Button variant="warning" type="submit">
            Sign in
          </Button>
          <div className="mt-3">
            New Customer?{' '}
            <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Signin;
