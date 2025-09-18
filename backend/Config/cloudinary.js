// /Config/cloudinary.js
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET_KEY,
});
console.log("Cloud Name:", process.env.CLOUD_NAME);
console.log("API Key:", process.env.API_KEY);

module.exports = cloudinary;
