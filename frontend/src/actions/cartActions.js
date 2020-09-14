import Axios from "axios";
import Cookie from "js-cookie";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch, getState) => {        //function expression

    try {
        const { data } = await Axios.get("/api/products/" + productId);
        dispatch({
            type: CART_ADD_ITEM, payload: {                                         // for getting the item into the cart
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        });
        const { cart: { cartItems } } = getState();                                  // for getting access to cart items               
        Cookie.set("cartItems", JSON.stringify(cartItems));                          // to gave the cart item to the cookie                       
    } catch (error) {
        
    }
} 
const removeFromCart = (productId) => (dispatch, getState) =>{
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });

    const { cart: { cartItems } } = getState();                                                 
    Cookie.set("cartItems", JSON.stringify(cartItems));                          
}
export { addToCart, removeFromCart };
