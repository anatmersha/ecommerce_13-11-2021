const express = require("express");
// const mongo = require('mongodb');
// require("dotenv").config()
const path = require("path");
const utils = require("./utils");
// const products = require("./products");

const app = express();
const PORT = 8000;
const publicPath = path.join(__dirname, "..", "public");

// const MongoClient = mongo.MongoClient;
// const URL = process.env.MONGODB_URL || "mongodb://localhost:27017";
// const ObjectId = mongo.ObjectId;
// const dbName = "ecommerce";

app.use(express.static(publicPath));
app.use(express.json());

// MongoClient.connect(URL, function(err, db) {
//     if (err) { console.log(err); }
//     const dbo = db.db(dbName);
//     const collections = ["products", "carts", "contact"];
//     collections.forEach((collectionName) => dbo.createCollection(collectionName, function(err, res) {
//         if (err) { console.log(err); }
//         console.log("Collection created!");
//     }))
//     dbo.collection("products").countDocuments((err, result) => {
//         if (result === 0) {
//             dbo.collection("products").insertMany(products, function(err, res) {
//                 if (err) { console.log(err); }
//                 console.log(res);
//             })
//         }
//     });
// })

app.get('/', (req, res) => {
    res.send("index");
})

// GET ALL PRODUCTS
app.get("/products", (req, res) => {
    utils.getAllProducts(req, res);
})

// ADD A PRODUCT
app.post('/products', (req, res) => {
    utils.addProduct(req, res);
})

// GET PRODUCTS BY CATEGORY
app.get("/categories/:category", (req, res) => {
    utils.getProductsByCategorey(req, res);
})

// DELETE FROM CART
app.delete("/product/:id", (req, res) => {
    utils.deleteProduct(req, res);
})

// ADD TO CART
app.patch("/cartPush/:id", (req, res) => {
    utils.pushProductToCart(req, res);
})

// UPDATE PRODUCT
app.patch("/product/:id", (req, res) => {
    utils.updateProduct(req, res);
})

// GET ALL MESSAGES
app.get("/contact", (req, res) => {
    utils.getAllMessages(req, res);
})

// ADD A MESSAGE
app.post("/contact", (req, res) => {
    utils.addNewMessage(req, res);
})

// GET MY CART
app.get("/cartDATA/:id", (req, res) => {
    utils.getCartByID(req, res);
})

// GET CART BY ID
app.get("/findCarts/:id", (req, res) => {
    utils.getCartByID(req, res);
})

// ADD A NEW CART
app.post("/carts", (req, res) => {
    utils.addNewCart(req, res);
})

// DELETE FROM CART
app.patch("/deleteProduct/:id", (req, res) => {
    utils.deleteCartProducts(req, res);
})

app.get("*", (req, res) => {
    res.send("Error.. There is not such page!");
})

app.listen(PORT, () => {
    console.log(`server listen to port ${PORT}`);
});