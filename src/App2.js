import { useEffect, useState } from 'react';
import axios from 'axios';
import './App2.css';
import AddProduct from './AddProduct';
import BuyProduct from './BuyProduct';

const API_URL = 'https://api.fthurtado-entrega-0.tk/';

function App2(props) {
  const {
    user,
  } = props;

  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(true);
  const [userProducts, setUserProducts] = useState([]);
  const [showUserProducts, setShowUserProducts] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const [showPurchases, setShowPurchases] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [actualProduct, setActualProduct] = useState({});
  const [productAdded, setProductAdded] = useState(false);
  const [productBuy, setProductBuy] = useState(false);

  async function getProducts() {
    const url = `${API_URL}users/api/get-products/`;
    await axios({
      method: 'GET',
      url,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    })
      .then((res) => res.data)
      .then((res) => setProducts(res))
  }

  async function getUserProducts() {
    const url = `${API_URL}users/api/get-user-products/`;
    await axios({
      method: 'GET',
      url,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    })
      .then((res) => res.data)
      .then((res) => setUserProducts(res))
  }

  async function getPurchases() {
    const url = `${API_URL}users/api/get-purchases/`;
    await axios({
      method: 'GET',
      url,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    })
      .then((res) => res.data)
      .then((res) => setPurchases(res))
  }

  function toUserProducts() {
    setShowProducts(false);
    setShowUserProducts(true);
    setShowPurchases(false);
    setUserProducts([]);
    getUserProducts();
  }
  
  function toProducts() {
    setShowProducts(true);
    setShowUserProducts(false);
    setShowPurchases(false);
    setProducts([]);
    getProducts();
  }

  function toPurchases() {
    setShowProducts(false);
    setShowUserProducts(false);
    setShowPurchases(true);
    setPurchases([]);
    getPurchases();
  }

  useEffect(() => {
    getProducts();
  }, [])

  useEffect(() => {
    if (productAdded) {
      setProductAdded(false);
      if (showProducts) {
        toProducts();
      } else if (showUserProducts) {
        toUserProducts();
      }
    }
  }, [productAdded])

  useEffect(() => {
    if (productBuy) {
      setProductBuy(false);
      if (showProducts) {
        toProducts();
      } else if (showUserProducts) {
        toUserProducts();
      }
    }
  }, [productBuy])

  return (
    <div className="App2">
      {(showAddProduct) && (
        <AddProduct
          user={user}
          setShowAddProduct={setShowAddProduct}
          setProductAdded={setProductAdded}
        />
      )}
      {(Object.keys(actualProduct).length > 0) && (
        <BuyProduct
          user={user}
          product={actualProduct}
          setActualProduct={setActualProduct}
          setProductBuy={setProductBuy}
        />
      )}
      <div className="user-info">
        <p>
          {`${user.nickName} - ${user.email}`}
        </p>
      </div>
      <div className="buttons-container">
        <button
          type="button"
          onClick={() => toProducts()}
        >
          Ver productos
        </button>
        <button
          type="button"
          onClick={() => toUserProducts()}
        >
          Ver mis productos
        </button>
        <button
          type="button"
          onClick={() => setShowAddProduct(true)}
        >
          Agregar producto
        </button>
        <button
          type="button"
          onClick={() => toPurchases()}
        >
          Ver mis compras
        </button>
      </div>
      {(showProducts) && (
        <div className="products-container">
          <div className="product-container">
            <p className="bold">Nombre</p>
            <p className="bold">Precio</p>
            <p className="bold">Cantidad disponible</p>
            <button
              type="button"
            >
              Opciones
            </button>
          </div>
          {products.map((product) => (
            <div className="product-container">
              <p>{product.name}</p>
              <p>{product.price}</p>
              <p>{product.quantity}</p>
              <button
                type="button"
                onClick={() => setActualProduct(product)}
              >
                Comprar
              </button>
            </div>
          ))}
        </div>
      )}
      {(showUserProducts) && (
        <div className="products-container">
          <div className="product-container">
            <p className="bold">Nombre</p>
            <p className="bold">Precio</p>
            <p className="bold">Cantidad inicial</p>
            <p className="bold">Cantidad disponible</p>
          </div>
          {userProducts.map((product) => (
            <div className="product-container">
              <p>{product.name}</p>
              <p>{product.price}</p>
              <p>{product.firstQuantity}</p>
              <p>{product.quantity}</p>
            </div>
          ))}
        </div>
      )}
      {(showPurchases) && (
        <div className="products-container">
          <div className="product-container">
            <p className="bold">Código</p>
            <p className="bold">Nombre</p>
            <p className="bold">Precio</p>
            <p className="bold">Cantidad</p>
          </div>
          {purchases.map((purchase) => (
            <div className="product-container">
              <p>{purchase.verificationCode}</p>
              <p>{purchase.product.name}</p>
              <p>{purchase.product.price}</p>
              <p>{purchase.product.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App2;
