import { useRef } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
    const homepage = useNavigate();
    const navi = useNavigate();
    return (
        <div className="login" >
            <div className="container">
                <div id="heading">
                    Login
                </div>
                <div className="inner">
                    <div>
                        <div><label className="labels">Username: </label><input type="text" autoFocus className="inp"></input></div>
                    </div>
                    <div>
                        <div><label className="labels">Password: </label><input type="password" id="pass" className="inp"></input></div>
                    </div>

                    <div>
                        <button onClick={() => homepage('home')}>Login</button>
                    </div>
                    <div>
                        Not Signed in?
                    </div>
                    <div>
                        <button onClick={() => navi('sign')}>Sign In</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login;