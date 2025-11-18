import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from "../../context/StoreContext.jsx";

const Cart = () => {

    const { cartItems, food_list, removeFromCart } = useContext(StoreContext);

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item of food_list) {
            if (cartItems[item._id] > 0) { 
                totalAmount += item.price * cartItems[item._id];
            }
        }
        return totalAmount;
    }

    const cartSubtotal = getTotalCartAmount();
    const deliveryFee = 2;

    return (
        <div className='cart'>
            <div className="cart-item">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={item._id}>
                                <div className='cart-items-title cart-items-item'>
                                    <img src={item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>${item.price * cartItems[item._id]}</p>
                                    <p onClick={() => removeFromCart(item._id)} className='cross' >x</p>
                                </div>
                                <hr />
                            </div>
                        )
                    }
                    return null;
                })}
            </div>
            
            <div className="cart-bottom">
                
                <div className="cart-total"> 
                    <h2>Cart Totals</h2>
                    
                    <div className="cart-total-details">
                        <p>Subtotal</p>
                        <p>${cartSubtotal}</p> 
                    </div>
                    <hr />
                    
                    <div className="cart-total-details">
                        <p>Delivery Fee</p>
                        <p>${deliveryFee}</p> 
                    </div>
                    <hr />
                    
                    <div className="cart-total-details">
                        <b>Total</b>
                        <b>${cartSubtotal > 0 ? cartSubtotal + deliveryFee : 0}</b> 
                    </div>
                    
                    <button>PROCESS TO CHECKOUT</button>
                </div> 
                
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promo code, Enter it here</p>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder='promocode'/>
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart