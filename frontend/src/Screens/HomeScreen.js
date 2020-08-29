import React, { useState, useEffect } from './node_modules/react';
import { Link } from './node_modules/react-router-dom';
import axios from './node_modules/axios';


function HomeScreen(props) {

    const [products, setProduct] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("/api/products");
            setProduct(data);
        }
        fetchData();
        return () => {
            //
        };
    }, [])


    return <ul className="products">
    {
        products.map(product =>
        <li key={product._id}>
            <div className="product">
                  <Link to={'/product/' + product._id}>   <img className="product-image" src={product.image} alt="product"/></Link>
                <div className="product-name">
                  <Link to={'/product/' + product._id}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">Rs.{product.price}</div>
                <div className="product-rating">{product.rating} stars ({product.numReviews} reviews)</div>
            </div>
        </li>)
    }
   
    
</ul>
}

export default HomeScreen;