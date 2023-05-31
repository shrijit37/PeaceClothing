import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import "./style/Login.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMessage] = useState("");
  const [successMsg, setSuccessMessage] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogin = (e) =>{
    e.preventDefault();
    signInWithEmailAndPassword(auth,email,password).then(() => {
      setSuccessMessage("Logged  in successfully")
      setEmail("");
      setPassword("");
      setErrorMessage("");
      setTimeout(()=>{
        setSuccessMessage("");
        navigate("/")
      },3000)
    }).catch((error)=>{
      if(error.message == 'Firebae: Error (auth/invalid-email).'){
        setErrorMessage("Invalid Email");
      }
      if(error.message == 'Firebae: Error (auth/user-not-found).'){
        setErrorMessage("Email not found");
      }
      if(error.message == 'Firebae: Error (auth/wrong-password).'){
        setErrorMessage("Wrong Password");
      }
    })
  }


  return (
    <>
      <Navbar />
      <div class="login-container">
        <form action="" className="signup-form">
          <p className="create">Create Account</p>
          {successMsg && (
            <>
              <div className="successmsg">{successMsg}</div>
            </>
          )}

          {errorMsg && (
            <>
              <div className="errormsg">{errorMsg}</div>
            </>
          )}

          <label>E-mail</label>
          <br />
          <input
            type="email"
            placeholder="E-mail Address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />

          <label>Password</label>
          <br />
          <input
            type="text"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <button type="submit" onClick={handleLogin}>Login</button>
          <br />
          <h1>Don't have an account?</h1>
          <Link to='/signup'>Sign Up</Link>
        </form>
      </div>
    </>
  );
};

export default Login;
