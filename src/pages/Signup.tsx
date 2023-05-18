import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {auth} from "../config/firebase";
import {useNavigate} from 'react-router-dom';


function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUpUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            alert("Successfully created your account");
            navigate("/");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            alert(errorMessage);
            // ..
        });
    };
  
    return (
        <>
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-l-55 p-r-55 p-t-55 p-b-150">
                    <form className="login100-form validate-form" onSubmit={signUpUser}>
                        <span className="login100-form-title p-b-49">
                            Sign up
                        </span>

                        <div className="wrap-input100 validate-input m-b-15" data-validate = "Email is required">
                            <span className="label-input100">Email</span>
                            <input className="input100" type="text" name="username" placeholder="Type your Email" onChange={(e) => setEmail(e.target.value)}/>
                            <span className="focus-input100" data-symbol="&#xf206;"></span>
                        </div>
    
                        <div className="wrap-input100 validate-input m-b-15" data-validate="Password is required">
                            <span className="label-input100">Password</span>
                            <input className="input100" type="password" name="pass" placeholder="Type your password" onChange={(e) => setPassword(e.target.value)}/>
                            <span className="focus-input100" data-symbol="&#xf190;"></span>
                        </div>
                        
                        <div className="container-login100-form-btn">
                            <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                                <button className="login100-form-btn">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div id="dropDownSelect1"></div>
        </>
    )
}

export default SignUp