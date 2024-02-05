// registerService.js

import axios from "axios";
import { API_URL } from "constants";
import { useAuth } from "context/AuthProvider";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to set Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/auth/register`,
      userData
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/auth/login`,
      userData
    );

    return {
      data: response.data.data,
      token: response.headers?.authorization.split(" ")[1],
    };
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};

const getShops = async () => {
  try {

    const response = await axiosInstance.get(`${API_URL}/shop/`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

const createShop = async (shopData) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/shop/create`,
      shopData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};
const addProduct = async (productData) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/product`,
      productData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};
const editShop = async (shopData, shopId) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/shop/${shopId}`,
      shopData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};
const editProduct = async (productData, productId) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/product/${productId}`,
      productData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};
export {
  registerUser,
  loginUser,
  getShops,
  createShop,
  addProduct,
  editShop,
  editProduct,
};
