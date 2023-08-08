import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import {Navbar ,Container} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';

function App() {
  return (
    <Router>
      <div className='d-flex flex-column main'>
        <header>
          <Navbar bg='dark' variant='dark'>
            <Container>
              <LinkContainer to={'/'}>
              <Navbar.Brand>Store</Navbar.Brand>
              </LinkContainer>
            </Container>
          </Navbar>
        </header> 
        <main>
          <Container className='mt-4'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/product/:slug' element={<Product />}></Route>
          </Routes>
          </Container>
        </main>
        <footer>
          <div className='text-center'>© 2023 Copyright:dhruvkakadiya🙂</div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
