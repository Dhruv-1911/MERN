import './App.css';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import {
  Navbar,
  Container,
  Nav,
  Badge,
  NavDropdown,
} from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from './Store';
import Cart from './pages/Cart';
import Signin from './pages/Signin';
import Shipping from './pages/Shipping';
import Payment from './pages/payment';
import Signup from './pages/Signup';

function App() {
  const { state, dispatch: newDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    newDispatch({ type: 'USER_SIGN_OUT' });
    localStorage.removeItem('userData');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('CartItem');
  };
  return (
    <Router>
      <div className="d-flex flex-column main">
        <ToastContainer position="top-right" limit={1} />
        <header>
          <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">Store</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/cart">
                    Cart
                    {cart.CartItems.length > 0 && (
                      <Badge bg="danger">
                        {cart.CartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Nav.Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <NavDropdown.Item
                        className="signout-link"
                        href="/signout" 
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <Nav.Link href="/signin" className="signin-link">
                      Sigin in
                    </Nav.Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-4">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/signin" element={<Signin />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/shipping" element={<Shipping />}></Route>
              <Route path="/payment" element={<Payment />}></Route>
              <Route path="/product/:slug" element={<Product />}></Route>
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">© 2023 Copyright:dhruvkakadiya🙂</div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
