import axios from "axios";
import React from "react";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});
const userAxios = () => {
  return axiosInstance;
};

export default userAxios;
