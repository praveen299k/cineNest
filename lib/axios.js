require("dotenv").config();
const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`,
  },
});

module.exports = axiosInstance;
