const express = require("express");
const mongo = require('mongodb');
const path = require("path");
const utilies = require("./utilies");
const products = require("./products");

const URL = "mongodb://localhost:27017";
const PORT = 2000;
const publicPath = path.join(__dirname, "..", "public");

const app = express();
const ObjectId = mongo.ObjectId;
const dbName = "ecommerce";
const MongoClient = mongo.MongoClient;
app.use(express.json());
app.use(express.static(publicPath));

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
    utilies.getAllProducts(req, res);
})

// ADD A PRODUCT
app.post('/products', (req, res) => {
    utilies.addProduct(req, res);
})




//*********/ PRODUCTS
// GET PRODUCTS BY CATEGORY
app.get("/tops", (req, res) => {
    utilies.getTopsCategorey(req, res);
})

app.get("/shoes", (req, res) => {
    utilies.getShoesCategorey(req, res);
})

app.get("/dresses", (req, res) => {
    utilies.getDressesCategorey(req, res);
})

app.get("/buttom", (req, res) => {
    utilies.getButtomsCategorey(req, res);
})




//*********/ PRODUCTS
// 
// DELETE FROM CART
app.patch("/product/:id", (req, res) => {
    utilies.deleteProduct(req, res);
})

// ADD TO CART
app.patch("/cartPush/:id", (req, res) => {
    utilies.pushProductToCart(req, res);
})

// UPDATE PRODUCT
app.patch("/product/:id", (req, res) => {
    utilies.updateProduct(req, res);
})




//*******/ /CONTACT/ 
// 
// GET ALL MESSAGES
app.get("/contact", (req, res) => {
    utilies.getAllMessages(req, res);
})

// ADD A MESSAGE
app.post("/contact", (req, res) => {
    utilies.addNewMessage(req, res);
})





// *******/ CART
// 
// GET MY CART
app.get("/cartDATA/:id", (req, res) => {
    utilies.getCartByID(req, res);
})

// GET CART BY ID
app.get("/findCarts/:id", (req, res) => {
    utilies.getCartByID(req, res);
})

// ADD A NEW CART
app.post("/carts", (req, res) => {
    utilies.addNewCart(req, res);
})

// DELETE FROM CART
app.patch("/deleteProduct/:id", (req, res) => {
    utilies.deleteCartProducts(req, res);
})



app.get("*", (req, res) => {
    res.send("Error.. There is not such page!");
})

app.listen(PORT, () => {
    console.log(`server listen to port ${PORT}`);
});