import express from 'express';
import Product from '../models/productModel.js';
import { getToken } from '../util.js';

const router = express.Router();

//creating a simple router for getting list of products back for the user

router.get("/", async (req, res) => {
  const products = await Product.find({});                          //getting from Product database without filter
  res.send(products);                                               //sending the lists of products
});

//making an api to create a product

router.post("/", async (req, res) => {
  const product = new Product({                 //fill the fields based on the body that comes from the client
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });
  const newProduct = await product.save();       //now that we have the product oject, time to call save
  if (newProduct) {                               //if exists, means created correctly
    return res.status(201).send({ message: 'New Product Created', data: newProduct });
  }
  return res.status(500).send({ message: ' Error in Creating Product.' });
});

router.delete('/:id', async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: 'Product Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});


export default router;
