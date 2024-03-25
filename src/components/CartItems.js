function CartItems(props) {

    return (
        <div className="cart_items">
            <img src={props.image} alt="item"/>
            <p>{props.name}</p>
            <p>{props.cost}</p>
            <p>{props.quantity}</p>
            <button>Remove</button>
        </div>
    )
}

export default CartItems;