import {useState} from "react";

function Item(props) {

    const [add, setAdd] = useState(false)
    const [count, setCount] = useState(0)

    function added() {
        setAdd(true);
        setCount(count + 1)
    }

    return (
        <div className="item_box">
            <div className="elements">
                <img alt="item"/>
            </div>
            <div className="elements">
                Name:{props.name}
            </div>
            <div className="elements">
                Cost: {props.cost}
            </div>
            <div className="elements" id="add">
                <button onClick={added} id="add">

                    {
                        add ? `${count}+` : "Add"
                    }

                </button>
            </div>
        </div>
    );
}

export default Item;