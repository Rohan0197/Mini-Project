import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyCart(props) {
    const navigate = useNavigate();
    const { cartItems, setCartItems } = props;

    let total_quantity = find_total_quantity();
    let total_cost = find_total_cost();

    function find_total_quantity() {    
        let total_quantity = 0;
        cartItems.forEach((item) => {
            total_quantity += item.quantity;
        })
        return total_quantity;
    }

    function find_total_cost() {
        let total_cost = 0;
        cartItems.forEach((item) => {
            total_cost += item.cost;
        })
        return total_cost;
    }

    function deletion(current_item) {
        const updatedCartItems = cartItems.filter(item => item.name !== current_item);
        setCartItems(updatedCartItems);
    }

    function incrementQuantity(index) {
        const updatedCartItems = [...cartItems];
        if (updatedCartItems[index].quantity < updatedCartItems[index].stock) {
            updatedCartItems[index].quantity += 1;
            updatedCartItems[index].cost = updatedCartItems[index].cost * (updatedCartItems[index].quantity / (updatedCartItems[index].quantity - 1));
            setCartItems(updatedCartItems);
        } else {
            alert("Not enough stock");
        }
    }

    function decrementQuantity(index) {
        const updatedCartItems = [...cartItems];
        if (updatedCartItems[index].quantity === 1) {
            updatedCartItems.splice(index, 1);
        } else {
            updatedCartItems[index].quantity -= 1;
            updatedCartItems[index].cost = updatedCartItems[index].cost - (updatedCartItems[index].cost / (updatedCartItems[index].quantity + 1));
        }
        setCartItems(updatedCartItems);
    }

    function placeOrder() {
        const invalidItem = cartItems.find(item => !item.product_id || !item.quantity);
        if (invalidItem) {
            alert("Invalid item data. Product ID or quantity is missing.");
            return;
        }
    
        const orderData = {
            action: "placeOrder",
            username: localStorage.getItem('username'),
            total_cost: total_cost,
            cartItems: cartItems.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity,
                cost: item.cost
            }))
        };
        axios.post("http://localhost/api/orders.php", orderData)
            .then(response => {
                console.log(response.data);
                if (response.data.success) {    
                    alert("Success");
                    setCartItems([]);
                    //navigate('/');
                } else {
                    alert("Failed to place order");
                }
            })
            .catch(error => {
                console.error("Error placing order:", error);
                alert("Error placing order");
            });
    }

    return (
        <div className="my-cart">
            <div className="cart-header">Your Cart</div>
            <hr/>
            <div className="attributes">
                <label>Product</label>
                <label>Title</label>
                <label>Cost</label>
                <label>Quantity</label>
                <label>Remove</label>
            </div>
            <hr/>

            {cartItems.map((item, index) => (
                <div key={index} className="cart_items">
                    <img src={item.image} alt="item" className="cart_item_image"/>
                    <label className="individual">{item.name}</label>
                    <label className="individual">{item.cost}</label>
                    <label className="individual" id="quantity-vary">
                        <button onClick={() => decrementQuantity(index)} className="cart-buttons"><img src='sub.png'
                            className="add-sub-img"
                            alt="delete"/>
                        </button>
                        <label>{item.quantity}</label>
                        <button onClick={() => incrementQuantity(index)} className="cart-buttons"><img src='add.png'
                            className="add-sub-img"
                            alt="add"/>
                        </button>
                    </label>
                    <button className='delete-btn' onClick={() => deletion(item.name)}>
                        <img src='delete.png' className="delete-btn-img" alt="delete"/>
                    </button>
                </div>
            ))}
            <>
                {
                    cartItems.length === 0 ? null : (<hr/>)
                }
            </>
            <>
                {
                    cartItems.length === 0 ? (<label id="empty-cart">CART IS EMPTY !!</label>) : (
                        <div className="final-cost">
                            <div>
                                <label className="total-cost">Total Cost: {total_cost}  ({total_quantity} items)</label>
                            </div>
                            <div>
                                <button onClick={placeOrder} id="proceed">Proceed to Pay</button>
                            </div>
                            

                        </div>)
                }
            </>
            <div>
                <button onClick={() => navigate('/home')} id="back">Continue Shopping</button>
            </div>
        </div>
    )
}

export default MyCart;