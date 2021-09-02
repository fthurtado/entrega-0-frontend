import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import App2 from './App2';

const API_URL = 'http://api.fthurtado-entrega-0.tk/';
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

function App() {
  const [inLogin, setInLogin] = useState(true);
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [invalidSignup, setInvalidSignup] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({ token: '' })

  async function handleSubmit() {
    setInvalid(false);
    if (inLogin) {
      if (!email || !password) {
        setInvalid(true);
        return;
      }
      const url = `${API_URL}users/api/log-in/`;
      let data = {};
      if (emailRegex.test(email)) {
        data = {
          "email": email,
          "password": password,
        };
      } else {
        data = {
          "nick_name": email,
          "password": password,
        };
      }
      await axios({
        method: 'POST',
        url,
        data,
      })
        .then((res) => res.data)
        .then((res) => setUser(res))
        .catch((err) => {
          if (err.response?.status === 404) {
            setInvalidLogin(true);
          }
        });
    } else {
      if (!nickName || !password || !email) {
        setInvalid(true);
        return;
      }
      const url = `${API_URL}users/api/sign-up/`;
      const data = {
        "email": email,
        "password": password,
        "nick_name": nickName,
      };
      await axios({
        method: 'POST',
        url,
        data,
      })
        .then((res) => res.data)
        .then((res) => setUser(res))
        .catch((err) => {
          console.log(err.response.data);
          if (err.response?.status === 400) {
            setInvalidSignup(true);
            setMessage(
              (err.response.data.message.includes('Nickname'))
              ? 'Username ocupado, debe escoger otro'
              : 'Email ocupado, debe escoger otro'
            );
          }
        });
    }
  }

  useEffect(() => {
    setInvalid(false);
    setInvalidLogin(false);
    setInvalidSignup(false);
    setMessage('');
    setNickName('');
    setEmail('');
    setPassword('');
  }, [inLogin])

  if (user.token.length > 0) {
    return (
      <App2
        user={user}
      />
    );
  }

  return (
    <div className="App">
      {(inLogin)
        ? (
          <div className="container">
            <p className="title">
              Log In
            </p>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email o username"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="contraseña"
            />
            <button
              type="button"
              className="confirm-button"
              onClick={() => handleSubmit()}
            >
              Confirmar
            </button>
            <button
              type="button"
              className="none-account"
              onClick={() => setInLogin(false)}
            >
              Crear cuenta
            </button>
            {(invalid) && (
              <p className="invalid">
                Request incorrecto. Debe llenar todos los campos.
              </p>
            )}
            {(invalidLogin) && (
              <p className="invalid">
                Request incorrecto. El email o nickname no coincide con la contraseña.
              </p>
            )}
          </div>
        ) : (
          <div className="container">
            <p className="title">
              Sign Up
            </p>
            <input
              type="text"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              placeholder="username"
            />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="contraseña"
            />
            <button
              type="button"
              className="confirm-button"
              onClick={() => handleSubmit()}
            >
              Confirmar
            </button>
            <button
              type="button"
              className="none-account"
              onClick={() => setInLogin(true)}
            >
              Log in
            </button>
            {(invalid) && (
              <p className="invalid">
                Request incorrecto. Debe llenar todos los campos.
              </p>
            )}
            {(invalidSignup) && (
              <p className="invalid">
                Request incorrecto. {message}
              </p>
            )}
          </div>
        )}
    </div>
  );
}

export default App;
