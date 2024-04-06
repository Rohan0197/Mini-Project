import React from 'react';

function MyCart(props) {
    const {cartItems, setCartItems} = props;

    let total_cost = find_total_cost();

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
                                <label className="total-cost">Total Cost({cartItems.length} items): {total_cost}</label>
                            </div>
                            <div>
                                <button id="proceed">Proceed to Pay</button>
                            </div>

                        </div>)
                }
            </>
        </div>
    )
}

export default MyCart;
