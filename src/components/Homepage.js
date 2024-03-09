import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

            </div>
        </div >
    )
}

export default Homepage;