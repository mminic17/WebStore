const express = require("express");
const cors = require("cors");
const products = require("./data/products.js");
const categories = require("./data/categories.js");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/products", (req, res) => {
  res.status(200); //res.status(200).json(products);
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(products));
});

app.get("/api/categories", (req, res) => {
  res.status(200); //res.status(200).json(products);
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(categories));
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((x) => x._id === req.params.id);
  if (product) {
    res.set("Content-Type", "application/json");
    res.send(JSON.stringify(product));
  } else {
    res.status(404);
    res.send({ message: "Product is not found!" });
  }
});

app.listen(3000, () => {
  console.log("Server je pokrenut na http://localhost:3000");
});
