import './App.css';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import {
  Navbar,
  Container,
  Nav,
  Badge,
  NavDropdown,
  Button,
} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import Cart from './pages/Cart';
import Signin from './pages/Signin';
import Shipping from './pages/Shipping';
import Payment from './pages/payment';
import Signup from './pages/Signup';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import OrderHistory from './pages/OrderHistory';
import Profile from './pages/Profile';
import { FaBars } from 'react-icons/fa';
import utils from './utils';
import axios from 'axios';
import SearchbBox from './Components/SearchbBox';
import SearchPage from './pages/SearchPage';

function App() {
  const { state, dispatch: newDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    newDispatch({ type: 'USER_SIGN_OUT' });
    localStorage.removeItem('userData');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('CartItem');
    localStorage.removeItem('paymentMethod');
    window.location.href="/signin"
  };
  const [SidebarOpen, setSidebarOpen] = useState(false);
  const [Categories, setCategories] = useState([]);
  const Year = new Date().getFullYear();

  const url = "https://mern-rhj0.onrender.com"

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const { data } = await axios.get(url +'/api/product/categories');
        setCategories(data);
      } catch (error) {
        toast.error(utils(error));
      }
    };
    fetchdata();
  }, []);
  return (
    <Router>
      <div
        className={
          SidebarOpen
            ? 'd-flex flex-column main active-container'
            : 'd-flex flex-column main'
        }
      >
        <ToastContainer position="top-right" limit={1} />
        <header>
          <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
              <Button
                variant="dark"
                onClick={() => setSidebarOpen(!SidebarOpen)}
              >
                <FaBars className="icon " />
              </Button>
              <Navbar.Brand href="/">Store</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchbBox />
                <Nav className="me-auto w-100 justify-content-end">
                  <Link className="link" to="/cart">
                    Cart
                    {cart.CartItems.length > 0 && (
                      <Badge bg="danger">
                        {cart.CartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="signout-link"
                        to="/signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link to="/signin" className="link">
                      Sigin in
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div
          className={
            SidebarOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-3">
            <Nav.Item>
              <b>Categories</b>
            </Nav.Item>
            {Categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={{ pathname: '/search', search: `?category=${category}` }}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main>
          <Container className="mt-4">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/search" element={<SearchPage />}></Route>
              <Route path="/signin" element={<Signin />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/shipping" element={<Shipping />}></Route>
              <Route path="/payment" element={<Payment />}></Route>
              <Route path="/placeorder" element={<PlaceOrder />}></Route>
              <Route path="/product/:slug" element={<Product />}></Route>
              <Route path="/orderhistory" element={<OrderHistory />}></Route>
              <Route path="/order/:id" element={<Order />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">© {Year} Copyright:dhruvkakadiya🙂</div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
