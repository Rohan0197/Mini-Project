import {useState} from "react";

function Item(props) {

    const [add, setAdd] = useState(false)
    const [quantity, setQuantity] = useState(1);
    const [quantityClicked, setQuantityClicked] = useState(false);

    function showQuantity() {
        setQuantityClicked(!quantityClicked)
    }

    function increment() {
        if (quantity < props.stock) {
            setQuantity(quantity + 1);
        }
    }

    function decrement() {
        if (quantity === 1) {
            setQuantity(1);
            setQuantityClicked(!quantityClicked);

        } else {
            setQuantity(quantity - 1);
        }
    }

    function handleAddToCart() {
        const new_item = {
            image: props.image,
            name: props.name,
            cost: props.cost * quantity,
            quantity: quantity
        };
        const index = props.cartItems.findIndex(item => item.name === new_item.name);
        if (index !== -1) {
            const updatedCartItems = [...props.cartItems];
            updatedCartItems[index].quantity += quantity;
            updatedCartItems[index].cost = props.cost * updatedCartItems[index].quantity;
            props.setCartItems(updatedCartItems);
        } else
            props.addToCart(new_item);
        setAdd(true);
    }

    return (
        <div className="item_box">
            <div className="elements">
                <img src={props.image} alt="item" id="apple"/>
            </div>
            <div className="elements">
                Name:{props.name}
            </div>
            <div className="elements">
                Cost: {props.cost}
            </div>
            <div className="elements">
                <button onClick={handleAddToCart} id="add">Add</button>
                <div className="quantity-btn">
                    {
                        quantityClicked ? null : (<button id="add" onClick={showQuantity}>Quantity</button>)
                    }
                    {
                        quantityClicked ? (
                            <div className="btn-inc-dec">
                                <button onClick={decrement} className="increment-decrement">-</button>
                                <label id="quantity">{quantity}</label>
                                <button onClick={increment} className="increment-decrement">+</button>
                            </div>
                        ) : null
                    }

                </div>

            </div>
        </div>
    );
}

export default Item;