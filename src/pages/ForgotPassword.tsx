import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const resetPassword = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      alert("Your password reset has been sent to your email, please check your Spam folder!");
      navigate('/login');
    })
    .catch((error) => {
      // Error occurred while sending password reset email
      const errorMessage = error.message;
        alert(errorMessage);
        window.location.reload();
    });
    

};
    
  return (
    <div>
        <div className="limiter-1">
            <div className="container-login100">
                <div className="wrap-login100 p-l-55 p-r-55 p-t-40 p-b-80">
                    <form className="login100-form validate-form">
                        <span className="login100-form-title p-b-49">
                            Reset Password
                        </span>
                        <div className="wrap-input100 validate-input m-b-60" data-validate = "Username is reauired">
                            <span className="label-input100">Email</span>
                            <input className="input100" type="text" name="email" placeholder="Type your Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                            <span className="focus-input100" data-symbol="&#xf206;"></span>
                        </div>
                        
                        <div className="container-login100-form-btn">
                            <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                                <button className="login100-form-btn"
                                  onClick={resetPassword}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div id="dropDownSelect1"></div>
    </div>
  )
}

