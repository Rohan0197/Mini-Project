import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();


    const [formvalue, setFormvalue] = useState({username: '', password: ''});
    const [submitted, setSubmitted] = useState(false);
    const [formValid, setFormValid] = useState(false); // State for form validity

    const handleInput = (e) => {
        const {name, value} = e.target;
        setFormvalue({...formvalue, [name]: value});
        setFormValid(formvalue.username.trim() !== '' && formvalue.password.trim() !== '');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true); // Mark the form as submitted
        if (!formValid) {
            return; // If form is invalid, do not proceed with login
        }
        const formData = {
            username: formvalue.username,
            password: formvalue.password,
            req: true // Specify that this is a login request
        };
        try {
            const res = await axios.post("http://localhost/api/user.php", formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = res.data;
            if (responseData === true) {
                localStorage.setItem('username', formvalue.username);
                alert("Login successful")
                console.log("Success message received: Login successful");
                setTimeout(() => {
                    console.log("Redirecting now...");
                    navigate('/home');
                }, 1500);
            } else {
                alert("Invalid credentials")
                console.log("Error message received: Invalid credentials");
                setFormvalue({username: '', password: ''});
                setSubmitted(false); // Reset submitted state
                setFormValid(false);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className="login">
            <div className="container">
                <div id="heading">Login</div>
                <div className="inner">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="labels">Username: </label>
                            <input type="text" autoFocus className="inp" name="username" id="user_name"
                                   value={formvalue.username}
                                   onChange={handleInput}/>
                        </div>
                        <div>
                            <label className="labels">Password: </label>
                            <input type="password" id="pass" className="inp" name="password" value={formvalue.password}
                                   onChange={handleInput}/>
                        </div>
                        <div>
                            <button type="submit" disabled={submitted || !formValid} id="login-btn">Login
                            </button>

                        </div>
                    </form>
                    <div id="text">New User?</div>
                    <div>
                        <button onClick={() => navigate('/sign')} className="btn-sign">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;