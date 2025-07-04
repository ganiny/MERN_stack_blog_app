import axios from "axios";

const request = axios.create({
  baseURL: "https://mern-stack-blog-app-1bhv.vercel.app",
});

export default request;