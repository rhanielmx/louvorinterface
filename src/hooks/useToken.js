// import { useState, useEffect } from 'react';

// export default function useToken() {
//   const getToken = () => {
//     if (typeof window !== 'undefined') {
//         console.log('You are on the browser')
//         const tokenString = localStorage.getItem('token');
//         const userToken = JSON.parse(tokenString);
//         return userToken?.token
//         // 👉️ can use localStorage here
//       } else {
//         console.log('You are on the server')
//         // 👉️ can't use localStorage
//       }

//   };

//   const [token, setToken] = useState(getToken());

//   const saveToken = userToken => {
//     localStorage.setItem('token', JSON.stringify(userToken));
//     setToken(userToken.token);
//   };

//   return {
//     setToken: saveToken,
//     token
//   }
// }
import axios from 'axios';
import { useState } from 'react';

function useToken() {

  function getToken() {
    if (typeof window !== 'undefined') {
      const userToken = localStorage.getItem('token');
      return userToken && userToken
    }
  }

  function getUser(userToken){
    const response = axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/user`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    }).then(
      res => { setUser(res.data) }
    )
  }

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser(token));

  function saveToken(userToken) {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };
  function removeToken() {
    localStorage.removeItem("token");
    setToken(null);
  }

  async function saveUser(userToken) {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/user`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
    setUser(response.data)
    // .then(
    //   res => { setUser(res.data) }
    // )
  }

function removeUser() {
  setUser(null)
}

return {
  token,
  setToken: saveToken,
  removeToken,
  user,
  setUser: saveUser,
  removeUser
}
}

export default useToken;