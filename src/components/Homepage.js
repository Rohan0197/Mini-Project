import React, {useEffect, useState} from "react";
import Item from "./Item";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Homepage(props) {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Retrieve username from local storage
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername);

        axios.get('http://localhost/api/products.php')
            .then(response => {
                console.log('Response data:', response.data); // Add this line to log data
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching item data:', error);
            });
    }, []);

    function changeSearch(e) {
        setSearch(e.target.value);
    }

    return (
        <div>
            <div className="footer">
                <img src='web_icon.png' alt='icon' id="web_icon"/>
                <label id="username">Welcome<br/>{username}</label>
                <div className="items">
                    <input type="text" placeholder="Search" onChange={changeSearch} id="search"></input>
                </div>
                <div className="corner">
                    <div className="corner_items">
                        <button onClick={() => navigate('/login')} id='logout'>LogOut</button>
                    </div>
                    <div className="corner_items">
                        <button onClick={() => navigate('/cart')} id="cart">My Cart</button>
                    </div>
                </div>
            </div>
            <div>
                <hr/>
            </div>
            <div className="content">
                {items.map(item => (
                    <div key={item.id} className="sub_items">
                        <Item name={item.name} cost={item.cost} stock={item.stock} image={item.img}
                              addToCart={props.addToCart}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Homepage;