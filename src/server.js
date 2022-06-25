const express = require("express");
const path = require("path");
const utils = require("./utils");

const app = express();
const publicPath = path.join(__dirname, "..", "public");

app.use(express.static(publicPath));
app.use(express.json());

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

app.listen(process.env.PORT || 8080, () => {
    console.log(`server listen to port ${process.env.PORT}`);
});