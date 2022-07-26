import Input from './Input'
import { useState } from 'react'
import Navbar from './Navbar'
import PropTypes from 'prop-types';

//TODO DELETE THIS
async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

export default function LoginForm({ setToken }) {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        setToken(token);
      }

    return (
        <div>
            <Navbar></Navbar>
            <Input label="Usuário" type="text"
            value={username}
            onChange={setUsername}
        />
        <Input label="Senha" type="password"
            value={password}
            onChange={setPassword}
        />
        <button onClick={handleSubmit}>Entrar</button>        
        </div>
    )
}

LoginForm.propTypes = {
    setToken: PropTypes.func.isRequired
  };