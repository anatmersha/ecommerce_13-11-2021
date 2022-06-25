const mongo = require('mongodb');
require("dotenv").config()
const products = require("./products");
const carts = require("./carts");

const MongoClient = mongo.MongoClient;
const URL = process.env.MONGODB_URL || "mongodb://localhost:27017";
const ObjectId = mongo.ObjectId;
const dbName = "ecommerce";

MongoClient.connect(URL, function(err, db) {
    if (err) { console.log(err); }
    const dbo = db.db(dbName);
    const collections = ["products", "carts", "contact"];
    collections.forEach((collectionName) => dbo.createCollection(collectionName, function(err, res) {
        if (err) { console.log(err); }
        console.log("Collection created!");
    }))
    dbo.collection("products").countDocuments((err, result) => {
        if (result === 0) {
            dbo.collection("products").insertMany(products, function(err, res) {
                if (err) { console.log(err); }
                console.log(res);
            })
        }
    });
    dbo.collection("carts").countDocuments((err, result) => {
        if (result === 0) {
            dbo.collection("carts").insertOne(carts, function(err, res) {
                if (err) { console.log(err); }
                console.log(res);
            })
        }
    });
})

// PRODUCTS
function getProductsByCategorey(req, res) {
    MongoClient.connect(URL, function(err, db) {
        if (err) { console.log(err); }
        const dbo = db.db(dbName);
        const categoryName = { Category: req.params.category };
        dbo.collection("products").find(categoryName)
            .toArray((err, tops) => {
                if (err) { console.log(err); }
                res.status(201), res.send(tops)
                db.close();
            })
    })
}
// POST
function addProduct(req, res) {
    MongoClient.connect(URL, function(err, db) {
        if (err) { console.log(err); }
        const dbo = db.db(dbName);

        const Name = req.body.Name;
        const Price = req.body.Price;
        const Description = req.body.Description;
        const isSale = req.body.isSale;
        const Category = req.body.Category;
        const Images = req.body.Images;

        const newProduct = {
            Name: Name,
            Price: Number(Price),
            Description: Description,
            isSale: isSale,
            Category: Category,
            Images: Images
        };

        dbo.collection("products").insertOne(newProduct, (err, result) => {
            if (err) { console.log(err); }
            console.log(result);
            res.status(201), res.send(result)
            db.close()
        })

    })
}
// GET
function getAllProducts(req, res) {
    MongoClient.connect(URL, function(err, db) {
        if (err) { console.log(err); }
        const dbo = db.db(dbName);
        dbo.collection("products").find({})
            .toArray(function(err, products) {
                if (err) { console.log(err); }
                res.status(201), res.send(products)
                db.close();
            })
    })
}
// PATCH
function updateProduct(req, res) {
    MongoClient.connect(URL, function(err, db) {
        if (err) { console.log(err); }
        const dbo = db.db(dbName);

        const updatedProduct = req.body;

        const productId = { _id: ObjectId(req.params.id) };
        dbo.collection("products").updateOne(productId, { $set: updatedProduct }, (err, result) => {
            if (err) { console.log(err); }
            res.status(201), res.send(result);
            db.close();
        })
    })
}
// DELETE
function deleteProduct(req, res) {
    MongoClient.connect(URL, function(err, db) {
        if (err) { console.log(err); }
        const dbo = db.db(dbName);

        const productId = { _id: ObjectId(req.params.id) };

        dbo.collection("products").deleteOne(productId, function(err, result) {
            if (err) { console.log(err); }
            console.log(result);
            res.status(201), res.send(result);
            db.close();
        })
    })
}


// CART
// POST
function addNewCart(req, res) {
    MongoClient.connect(URL, function(err, db) {
        if (err) { console.log(err); }
        const dbo = db.db(dbName);

        const Name = req.body.Name;
        const newCart = { Name, Products: [] };

        dbo.collection("carts").insertOne(newCart, (err, result) => {
            if (err) { console.log(err); }
            res.status(201), res.send(result);
            db.close()
        })

    })

}
// GET
function getCartByID(req, res) {
    MongoClient.connect(URL, function(err, db) {
        if (err) { console.log(err); }
        const dbo = db.db(dbName);
        const cartID = { _id: ObjectId(req.params.id) };

        dbo.collection("carts").findOne(cartID, function(err, cart) {
            if (err) {
                console.log(err);
                throw err
            }
            res.send(cart);
            db.close();
        })
    })
}
// PATCH
function pushProductToCart(req, res) {
    MongoClient.connect(URL, (err, db) => {
        if (err) { console.log(err); }
        const dbo = db.db(dbName);

        const item = req.body;
        const cartID = { _id: ObjectId(req.params.id) };

        dbo.collection("carts").updateOne(cartID, { $push: { Products: item } }, (err, result) => {
            if (err) { console.log(err); }
            res.status(201), res.send(result);
            db.close()
        })
    })
}
// DELETE
function deleteCartProducts(req, res) {
    MongoClient.connect(URL, function(err, db) {
        if (err) { console.log(err); }

        const dbo = db.db(dbName);
        const cartID = { _id: ObjectId(req.params.id) };
        const productId = req.body;

        dbo.collection("carts").updateOne(cartID, { $pull: { Products: productId } }, (err, result) => {
            if (err) { console.log(err); }
            res.status(201).send(result)
            db.close();
        })
    })
}


//CONTACT
// GET
function getAllMessages(req, res) {
    MongoClient.connect(URL, function(err, db) {
        if (err) { console.log(err); }
        const dbo = db.db(dbName);
        dbo.collection("contact").find({})
            .toArray(function(err, msg) {
                if (err) { console.log(err); }
                res.status(201), res.send(msg)
                db.close();
            })
    })
}
// POST
function addNewMessage(req, res) {
    MongoClient.connect(URL, function(err, db) {
        if (err) { console.log(err); }
        const dbo = db.db(dbName);

        const Name = req.body.Name;
        const Email = req.body.Email;
        const Message = req.body.Message;

        const newMsg = { Name: Name, Email: Email, Message: Message };

        dbo.collection("contact").insertOne(newMsg, (err, result) => {
            if (err) { console.log(err); }
            console.log(result);
            res.status(201), res.send(result)
            db.close();
        })

    })
}


module.exports = { 
    getProductsByCategorey, getAllMessages, 
    addNewMessage, deleteCartProducts, 
    pushProductToCart, getCartByID, addNewCart, 
    addProduct, getAllProducts, 
    updateProduct, deleteProduct 
};