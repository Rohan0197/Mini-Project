import React, { useState, useEffect } from 'react';
import axios from "axios";
import OrderList from "./OrderList";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (!username) {
            setError('Username not found in localStorage');
            return;
        }

        axios.get(`http://localhost/api/orders.php?username=${username}`)
            .then(response => {
                console.log('Response data:', response.data); 
                const promises = response.data.map(order => {
                    return axios.get(`http://localhost/api/order_items.php?order_number=${order.order_number}`);
                });
                Promise.all(promises)
                    .then(detailsResponses => {
                        const ordersWithDetails = response.data.map((order, index) => {
                            return { ...order, details: detailsResponses[index].data };
                        });
                        setOrders(ordersWithDetails);
                    })
                    .catch(error => {
                        setError('Error fetching order details: ' + error.message);
                        console.error('Error fetching order details:', error);
                    });
            })
            .catch(error => {
                setError('Error fetching orders data: ' + error.message);
                console.error('Error fetching orders data:', error);
            });
    }, []);

    return (
        <div>
            <OrderList orders={orders} />
        </div>
    );
}

export default Orders;