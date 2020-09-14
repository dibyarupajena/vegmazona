import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';


dotenv.config();                                   //calling

const mongodbUrl = config.MONGODB_URL;             // get access to mongodb url      
mongoose.connect(mongoUrl, {
    useNewUrlParser: true
}). catch(error => console.log(error.reason));          // connected to mongodb          

const app = express();

app.get("/api/products/:id", (req, res) => {

    const productId = req.params.id;
    const product = data.products.find(x=>x._id === productId);
    if(product)
        res.send(product);
    else
        res.status(404).send({msg: "Product Not Found."}) //enriching endpoint api
});

app.get("/api/products", (req, res) => {

    res.send(data.products);
});

app.listen(5000, () => {console.log("Server started at http://localhost:5000") })