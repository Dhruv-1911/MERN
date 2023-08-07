import './App.css';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';

function App() {
  return (
    <Router>
      <div>
        <header>
          <div className='headers'>
          <Link to='/'>Store</Link>
          </div>
        </header> 
        <main>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/product/:slug' element={<Product />}></Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
