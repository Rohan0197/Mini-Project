import {useState} from "react";
import Item from "./Item";

function Homepage() {

    const [search, setSearch] = useState('');

    function changeSearch(e) {
        setSearch(e.target.value);
    }


    return (
        <div>
            <div className="footer">

                <div className="items">
                    <input type="text" placeholder="Search" onChange={changeSearch} id="search"></input>
                </div>
                <div className="corner">
                    <div className="corner_items">
                        <button id='logout'>LogOut</button>
                    </div>
                    <div className="corner_items">
                        <button id="cart">My Cart</button>
                    </div>
                </div>

            </div>
            <div>
                <hr/>
            </div>
            <div className="content">
                <div className="sub_items">
                    <Item name="item1" cost="100"/>
                    <Item name="item2" cost="200"/>
                    <Item name="item3" cost="300"/>
                </div>

                <div className="sub_items">
                    <Item name="item4" cost="100"/>
                    <Item name="item5" cost="300"/>
                    <Item name="item6" cost="300"/>
                </div>

                <div className="sub_items">
                    <Item name="item7" cost="100"/>
                    <Item name="item8" cost="300"/>
                    <Item name="item9" cost="300"/>
                </div>


            </div>
        </div>
    )
}

export default Homepage;