import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },                                  //field
    image: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    category: { type: String, required: true },
    countInStock: { type: Number, default: 0, required: true },
    description: { type: String, required: true },
    rating: { type: Number, default: 0, required: true },
    numReviews: { type: Number, default: 0, required: true },
});

const productModel = mongoose.model("Product", productSchema);                              // 'Product'-Name of the collection/model that would be saved in the 
                                                                                   // mongo.db based on this product schema
export default productModel;
