const express = require("express");
const cors = require("cors");
//const bodyParser = require("body-parser");
const products = require("./data/products.js");
const categories = require("./data/categories.js");
const mongoose = require("mongoose");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");

mongoose
  .connect("mongodb://localhost/webStoredb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!!!");
  })
  .catch((error) => {
    console.log(error.reason);
  });

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

//users
app.get(
  "/api/users/createadmin",
  expressAsyncHandler(async (req, res) => {
    try {
      const user = new User({
        name: "milos",
        email: "milos@gmail.com",
        username: "mminic",
        password: "Milos.Minic123",
        isAdmin: true,
      });
      const createdUser = await user.save();
      res.send(createdUser);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);

app.post(
  "/api/users/login",
  expressAsyncHandler(async (req, res) => {
    const loginUser = await User.findOne({
      username: req.body.data.username,
      password: req.body.data.password,
    });
    if (!loginUser) {
      res.status(401).send({ message: "Invalid username or password!" });
    } else {
      res.send({
        _id: loginUser._id,
        name: loginUser.name,
        email: loginUser.email,
        username: loginUser.username,
        isAdmin: loginUser.isAdmin,
        token: generateJWToken(loginUser),
      });
    }
  })
);

app.post(
  "/api/users/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.data.name,
      email: req.body.data.email,
      username: req.body.data.username,
      password: req.body.data.password,
    });
    const createdUser = await user.save();
    if (!createdUser) {
      res.status(401).send({ message: "User is not created!" });
    } else {
      res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        username: createdUser.username,
        isAdmin: createdUser.isAdmin,
        token: generateJWToken(createdUser),
      });
    }
  })
);

app.use((err, req, res, next) => {
  const status = err.name && err.name === "ValidationError" ? 400 : 500;
  res.status(status).send({ message: err.message });
});

app.listen(3000, () => {
  console.log("Server je pokrenut na http://localhost:3000");
});

/*Help functions*/
function generateJWToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
    },
    "somethingsecret"
  );
}
