import { useState } from 'react';
import axios from 'axios';
import './BuyProduct.css';

const API_URL = 'http://api.fthurtado-entrega-0.tk/';

function BuyProduct(props) {
  const {
    user,
    product,
    setActualProduct,
    setProductBuy,
  } = props;
  const [quantity, setQuantity] = useState(0);
  const [invalid, setInvalid] = useState(false);

  async function handleSubmit() {
    if (quantity <= 0) {
      setInvalid(true);
    }
    const url = `${API_URL}users/api/new-purchase/`;
    const data = {
      "product": {
        id: product.id,
        quantity: parseInt(quantity),
      }
    }
    await axios({
      method: 'POST',
      url,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
      data,
    })
      .then((res) => res.data)
      .then(() => {
        setProductBuy(true);
        setActualProduct({});
      });
  }

  return (
    <div className="modal-view">
      <div className="modal-content">
        <p className="product">
          {product.name}
        </p>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Cantidad del producto"
        />
        <button
          type="button"
          onClick={() => handleSubmit()}
        >
          Comprar
        </button>
        <button
          type="button"
          className="red"
          onClick={() => setActualProduct({})}
        >
          Cerrar
        </button>
        {(invalid) && (
          <p>
            Debes completar todos los campos correctamente
          </p>
        )}
      </div>
    </div>
  );
}

export default BuyProduct;
