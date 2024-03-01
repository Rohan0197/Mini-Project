import { useNavigate } from "react-router-dom"

function SignIn() {

    const navigate = useNavigate();
    return (
        <div className="login" >
            <div className="sign">
                <div id="heading">
                    Sign In
                </div>
                <div className="inner">
                    <div className="labels">
                        <div><label>Username: </label><input type="text" autoFocus ></input></div>

                    </div>
                    <div className="labels">
                        <div><label>Email Id: </label><input type="text" ></input></div>

                    </div>
                    <div className="labels">
                        <div><label>Phone No:</label><input type="number" ></input></div>

                    </div>
                    <div className="labels">
                        <div><label>Password: </label><input type="password" id="pass" ></input></div>

                    </div>
                    <div className="labels">
                        <button onClick={() => navigate(-1)}>Sign In</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SignIn