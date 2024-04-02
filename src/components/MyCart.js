import React from 'react';

function MyCart(props) {
    const { cartItems, setCartItems } = props;

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
        <div>
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
                    <label className="individual">
                        <button onClick={() => decrementQuantity(index)}>-</button>
                        {item.quantity}
                        <button onClick={() => incrementQuantity(index)}>+</button>
                    </label>
                    <button className='delete-btn' onClick={() => deletion(item.name)}>
                        <img src='delete.png' className="delete-btn-img" alt="delete"/>
                    </button>
                </div>
            ))}
        </div>
    )
}

export default MyCart;
