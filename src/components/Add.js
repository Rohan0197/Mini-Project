import {useState} from "react";

function Add(props) {

    const [quantity, setQuantity] = useState(1);
    
    function increment() {
        setQuantity(quantity + 1);
    }

    function decrement() {
        if (quantity === 0) {
            setQuantity(0);
        } else {
            setQuantity(quantity - 1);
        }
    }

    return (
        <div>
            <button onClick={decrement} className="increment-decrement">-</button>
            <label id="quantity">{quantity}</label>
            <button onClick={increment} className="increment-decrement">+</button>
        </div>


    )

}

export default Add;