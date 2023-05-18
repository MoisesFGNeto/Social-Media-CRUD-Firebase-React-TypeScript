import {provider} from '../config/firebase';
import {signInWithPopup, getAuth, signInWithEmailAndPassword, FacebookAuthProvider, TwitterAuthProvider} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();

    const signIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    navigate('/');
    })
    .catch((error) => {
    // const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
    });
    };

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        navigate('/');
       }

    const signInWithFacebook = () => {
        const providerFb = new FacebookAuthProvider();
        const resultFb = signInWithPopup(auth, providerFb)
        .then(() => {
            console.log(resultFb);
            navigate('/');
        })
        .catch((err) => {
            alert(err.message);
        });
    };

    const signInWithTwitter = () => {
        const providerTwitter = new TwitterAuthProvider();
        signInWithPopup(auth, providerTwitter)
          .then((re) => {
            console.log(re);
            navigate('/');
          })
          .catch((err) => {
            console.log(err)
          });
      };

    return (
    <>
    <div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                <form className="login100-form validate-form" onSubmit={signIn}>
                    <span className="login100-form-title p-b-49">
                        Login
                    </span>
                    <div className="wrap-input100 validate-input m-b-23" data-validate = "Username is required">
                        <span className="label-input100">Email</span>
                        <input className="input100" type="text" name="username" placeholder="Type your Email" onChange={(e) => setEmail(e.target.value)}/>
                        <span className="focus-input100" data-symbol="&#xf206;"></span>
                    </div>

                    <div className="wrap-input100 validate-input" data-validate="Password is required">
                        <span className="label-input100">Password</span>
                        <input className="input100" type="password" name="pass" placeholder="Type your password" onChange={(e) => setPassword(e.target.value)}/>
                        <span className="focus-input100" data-symbol="&#xf190;"></span>
                    </div>
                    
                    <div className="text-right p-t-8 p-b-31">
                        <a href="/forgotpassword">
                            Forgot password?
                        </a>
                    </div>
                    
                    <div className="container-login100-form-btn">
                        <div className="wrap-login100-form-btn">
                            <div className="login100-form-bgbtn"></div>
                            <button className="login100-form-btn">
                                Login
                            </button>
                        </div>
                    </div>

                    <div className="txt1 text-center p-t-54 p-b-20">
                        <span>
                            Or Sign In Using
                        </span>
                    </div>

                    <div className="flex-c-m">
                        <a href="#" onClick={signInWithFacebook} className="login100-social-item bg1">
                            <i className="fa fa-facebook"></i>
                        </a>

                        <a href="#" onClick={signInWithTwitter} className="login100-social-item bg2">
                            <i className="fa fa-twitter"></i>
                        </a>

                        <a href="#" onClick={signInWithGoogle} className="login100-social-item bg3">
                            <i className="fa fa-google"></i>
                        </a>
                    </div>

                    <div className="flex-col-c p-t-30">
                        <span className="txt1 p-b-15">
                            Or Sign Up Using
                        </span>

                        <a href="/signup" className="txt2">
                            Sign Up
                        </a>
                    </div>
                </form>
			</div>
		</div>
	</div>
    <div id="dropDownSelect1"></div>
   
    </>   
)
}
