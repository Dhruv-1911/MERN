import './App.css';
import data from './data';

function App() {
  return (
    <>
      <header></header>
      <main>
        <h1>Featured Product</h1>
        <div className="products">
          {data.product.map((product) => (
            <div className="product" key={product.slug}>
              <a href={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </a>
              <div className="productInfo">
                <a href={`/product/${product.slug}`}>
                  <h5>{product.name}</h5>
                </a>
                <h5><b>${product.price}</b></h5>
                <button>Add To Cart</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
