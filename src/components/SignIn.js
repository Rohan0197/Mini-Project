import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

function SignIn() {

    const navigate = useNavigate();
    const [formvalue, setFormvalue] = useState({username: '', email: '', phone: '', password: ''});
    const handleInput = (e) => {
        setFormvalue({...formvalue, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(formvalue);
        const formData = {
            username: formvalue.username,
            email: formvalue.email,
            phone: formvalue.phone,
            password: formvalue.password
        };
        const res = await axios.post("http://localhost/api/user.php", formData);
        //let jsonres= res.data.json();        
        if (res.data.success) {
            alert("User created")
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        }
    }
    return (
        <div className="login">
            <div className="sign">
                <div id="heading">
                    Sign Up
                </div>
                <div className="inner">
                    <form onSubmit={handleSubmit}>

                        <div><label className="labels">Username: </label><input type="text" name="username"
                                                                                value={formvalue.username}
                                                                                onChange={handleInput} className="inp"
                                                                                autoFocus></input>

                        </div>

                        <div><label className="labels">Email Id: </label><input type="text" name="email"
                                                                                value={formvalue.email} className="inp"
                                                                                onChange={handleInput}></input>

                        </div>

                        <div><label className="labels">Phone No:</label><input type="number" name="phone"
                                                                               value={formvalue.phone} className="inp"
                                                                               onChange={handleInput}></input>

                        </div>

                        <div><label className="labels">Password: </label><input type="password" id="pass"
                                                                                name="password"
                                                                                value={formvalue.password}
                                                                                className="inp"
                                                                                onChange={handleInput}></input>

                        </div>
                        <div>
                            <button name="submit" className="btn btn-success">Sign Up</button>
                        </div>


                    </form>
                </div>
            </div>
        </div>

    )
}

export default SignIn