import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <App />
    
  
)

// http.js code
// import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:3000/api",
//   // timeout: 1000
// });

// export default instance;

//setAuthttoken.js code
// import instance from "./http";

// const setAuthToken = (token) => {
//   if (token) {
//     instance.defaults.headers.common.Authorization = `Bearer ${token}`;
//   } else {
//     delete instance.defaults.headers.common.Authorization;
//   }
// };

// export default setAuthToken;