import React from 'react';
import {useNavigate} from "react-router-dom";

function OrderList({orders}) {
    const navigate = useNavigate();
    return (
        <div className="my-cart">
            <div className="cart-header">
                <div>Your Orders</div>
                <div className="final-cost">
                    <button onClick={() => navigate('/home')} id="back">Continue Shopping
                    </button>
                </div>
            </div>

            <hr/>
            <div className="attributes">
                <label>Order Number</label>
                <label>Total Amount</label>
                <label>Details</label>
            </div>
            <hr/>

            {orders.length === 0 ? (
                <label id="empty-cart">NO ORDERS !!</label>
            ) : (
                orders.map((order, index) => (
                    <div key={order.order_number} className="cart_items">
                        <p className="individual">{order.order_number}</p>
                        <p className="individual">{order.total_amount}</p>
                        <ul className="all-items">
                            {order.details.map(detail => {
                                console.log('Detail:', detail);
                                return (
                                    <li key={detail.id} className="corner">
                                        <img src={detail.img_url} alt="item" className="cart_item_image"/>
                                        <p className="individual">{detail.product_name} </p>
                                        <p className="individual">{detail.quantity}*{detail.Cost}</p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))
            )}


        </div>
    );
}

export default OrderList;