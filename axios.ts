import axios from "axios";



export const axiosInstance = axios.create({
    baseURL: "https://diploma-production.up.railway.app/api",
    headers: {
        "Content-Type": "application/json",
        Authorization: typeof localStorage !== 'undefined' ? localStorage.getItem('token') : 'null'
      }
})