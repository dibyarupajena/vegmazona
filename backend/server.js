import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import config from './config.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute.js';



dotenv.config();                                   //calling

const mongodbUrl = config.MONGODB_URL;             // get access to mongodb url   

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,                        //warning deprecation
}).catch(error => console.log(error.reason));          // connected to mongodb          

const app = express();

app.use(bodyParser.json());                         //by having this I m able to read data
app.use("/api/users", userRoute);

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