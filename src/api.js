import axios from "axios";

const Axios = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "http://192.168.86.211:5000",
});

export default Axios;
// baseURL: "https://server-ejgf.onrender.com",
