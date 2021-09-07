import { useState } from 'react';
import axios from 'axios';
import './AddProduct.css';

const API_URL = 'https://api.fthurtado-entrega-0.tk/';

function AddProduct(props) {
  const {
    user,
    setShowAddProduct,
    setProductAdded,
  } = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [invalid, setInvalid] = useState(false);

  async function handleSubmit() {
    if (!name || !description || price <= 0 || quantity <= 0) {
      setInvalid(true);
    }
    const url = `${API_URL}users/api/new-product/`;
    const data = {
      "product": {
        name,
        description,
        price,
        quantity,
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
      .then((res) => {
        setProductAdded(true);
        setShowAddProduct(false);
      });
  }

  return (
    <div className="modal-product-view">
      <div className="modal-product-content">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del producto"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción del producto"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Precio del producto"
        />
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
          Confirmar
        </button>
        <button
          type="button"
          className="red"
          onClick={() => setShowAddProduct(false)}
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

export default AddProduct;
