import {useState} from "react";
import Add from "./Add";
import CartItems from "./CartItems";

function Item(props) {

    const [add, setAdd] = useState(false);

    function added() {
        setAdd(true);
        <CartItems image='apple.jpg' name={props.name} cost={props.cost} quantity={props.quantity}/>
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
                <button onClick={added} id="add">
                    {add ? <Add props={props.cost} stock={props.stock}/> : 'Add'}
                </button>
            </div>
        </div>
    );
}

export default Item;