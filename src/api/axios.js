import axios from "axios"

const instance = axios.create({
  //baseURL: "http://localhost:5000/api",
    baseURL: "http://blog-backend-sandy.vercel.app/",
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default instance

