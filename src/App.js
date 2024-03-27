import './App.css';
import './hompage.css';
import './item.css';
import './Cart.css';
import {Route, Routes} from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import SignIn from "./components/SignIn";
import MyCart from "./components/MyCart";
import {useState} from "react";

function App() {
    const [cartItems, setCartItems] = useState([])

    function addToCart(newItem) {
        setCartItems([...cartItems, newItem])
    }

    return (
        <>
            <nav>
                <Routes>
                    <Route path='/' element={<Login/>}/>
                    <Route path='/sign' element={<SignIn/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/home' element={<Homepage addToCart={addToCart} cartItems={cartItems}
                                                           setCartItems={setCartItems}/>}/>
                    <Route path='/cart' element={<MyCart cartItems={cartItems}/>}/>
                </Routes>
            </nav>

        </>
    );
}

export default App;
