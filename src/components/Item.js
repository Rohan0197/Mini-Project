import {useState} from "react";
import Add from "./Add";

function Item(props) {

    const [add, setAdd] = useState(false)


    function handleAddToCart() {
        props.addToCart({
            image: props.image,
            name: props.name,
            cost: props.cost,
            quantity: 1
        });
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
                <button onClick={handleAddToCart} id="add">
                    {add ? <Add stock={props.stock}/> : 'Add'}
                </button>
            </div>
        </div>
    );
}

export default Item;