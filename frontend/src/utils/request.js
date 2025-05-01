import axios from "axios";

const request = axios.create({
  baseURL: "https://mern-stack-blog-app-37wy.onrender.com",
});

export default request;