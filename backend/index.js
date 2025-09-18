const express = require("express");
require("dotenv").config()
const MongooseConnect = require("./connect");
const jwt = require("jsonwebtoken");
const user = require("./Routes/user");
const itemRoutes = require("./Routes/items");
const checkAuth = require("./Middlewares/checkAuth");
const cartRoutes = require("./Routes/cart")
const orderRoutes = require("./Routes/order");
const salesRoutes = require("./Routes/sales")
const app = express();

const cors = require("cors");
app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/cred", user);
app.use("/admin/items", checkAuth, itemRoutes);
app.use("/user/items",checkAuth,itemRoutes);
app.use("/user/cart",checkAuth,cartRoutes);
app.use("/user/orders",checkAuth,orderRoutes);
app.use("/admin/orders",checkAuth,orderRoutes);
app.use("/admin/",checkAuth,salesRoutes);
MongooseConnect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connection Success!!"))
  .catch((error) => console.log(error));

app.listen(process.env.PORT, () =>
  console.log(`SERVER is listening at port ${process.env.PORT}`)
);
