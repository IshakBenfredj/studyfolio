import axios from "axios";

const Axios = axios.create({
  // baseURL: "http://192.168.148.211:5000",
  baseURL: "http://localhost:5000",
  // baseURL: "http://192.168.95.36:5000",
});

export default Axios;