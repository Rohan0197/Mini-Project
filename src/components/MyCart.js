function MyCart(props) {

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

            {props.cartItems.map((item, index) => (
                <div key={index} className="cart_items">
                    <img src={item.image} alt="item" className="cart_item_image"/>
                    <label className="individual">{item.name}</label>
                    <label className="individual">{item.cost}</label>
                    <label className="individual">{item.quantity}</label>
                    <button className='delete-btn'><img src='delete.png' className="delete-btn-img"/></button>
                </div>
            ))}


        </div>
    )
}

export default MyCart;