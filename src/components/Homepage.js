import React, {useEffect, useState} from "react";
import Item from "./Item";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Homepage(props) {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [username, setUsername] = useState('');
    const [filter, setFilter] = useState(null);
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

    let filteredItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

    if (filter) {
        filteredItems = filteredItems.filter(item => {
            switch (filter) {
                case "All":
                    return true;
                case "less 1000":
                    return item.cost < 1000;
                case "bet 1000-5000":
                    return item.cost >= 1000 && item.cost < 5000;
                case "bet 5000-10000":
                    return item.cost >= 5000 && item.cost < 10000;
                case "greater 10000":
                    return item.cost > 10000;
                default:
                    return true;
            }
        });
    }

    return (
        <div className="main-container">
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
            <hr/>
            <div className="below-header">
                <div className="sidebar">
                    <label id="price">Price</label>
                    <div className="radio-btn">
                        <div>
                            <input type="radio" name="options" id="2" value="All"
                                   onChange={(e) => setFilter(e.target.value)}/><label htmlFor="option1">All</label>
                        </div>
                        <div>
                            <input type="radio" name="options" value="less 1000" id="1"
                                   onChange={(e) => setFilter(e.target.value)}/><label htmlFor="option1"
                        >less
                            than 1000</label>
                        </div>
                        <div>
                            <input type="radio" name="options" id="2" value="bet 1000-5000"
                                   onChange={(e) => setFilter(e.target.value)}/><label
                            htmlFor="option1">1000-5000</label>
                        </div>
                        <div>
                            <input type="radio" name="options" id="3" value="bet 5000-10000"
                                   onChange={(e) => setFilter(e.target.value)}/><label
                            htmlFor="option1">5000-10000</label>
                        </div>
                        <div>
                            <input type="radio" name="options" id="3" value="greater 10000"
                                   onChange={(e) => setFilter(e.target.value)}/><label htmlFor="option1">greater than
                            10000</label>
                        </div>
                    </div>

                </div>
                <div className="content">
                    {filteredItems.map(item => (
                        <div key={item.id} className="sub_items">
                            <Item name={item.name} cost={item.cost} stock={item.stock} image={item.img}
                                  addToCart={props.addToCart} cartItems={props.cartItems}
                                  setCartItems={props.setCartItems}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="homepage-bottom">
                <div>
                    <label id="contact">Contact Us</label>
                </div>
                <div>
                    <a href="https://www.amazon.in" target="_blank">Instagram</a>
                </div>
            </div>
        </div>
    );
}

export default Homepage;