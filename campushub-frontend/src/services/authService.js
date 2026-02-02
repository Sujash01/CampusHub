import axios from "axios";

const API = "http://127.0.0.1:5000";

export const loginUser = (email, password) => {
  return axios.post(`${API}/auth/login`, { email, password });
};

export const registerUser = (name, email, password) => {
  return axios.post(`${API}/auth/signup`, { name, email, password });
};
