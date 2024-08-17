import axios from "axios";
const instance = axios.create({
   // baseURL: "http://localhost:3000/api", 
   baseURL: "https://trip-planner-backend-oa4x.onrender.com/api",  
   // timeout: 1000
});
export default instance;