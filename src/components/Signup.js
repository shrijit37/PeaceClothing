import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfigs/firebaseConfigs";
import { collection, addDoc } from "firebase/firestore";
import "./style/Signup.css"

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setcPassword] = useState("");

  const navigate = useNavigate();

  const [errmsg,seterrmsg] = useState("");
  const [successmsg,setsuccessmsg] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(firstName, lastName, email, phone, password, cPassword);
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
    const user = userCredentials.user;
    const initialcartvalue = 0;
    console.log(user);
    addDoc(collection(db, "users"), {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      cart: initialcartvalue,
      uid: user.uid,
      password: password,
    })
      .then(() => {
        console.log("user added");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setcPassword("");
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      })
      .catch((error) => {
        seterrmsg(error.message);
      });
  }).catch((error)=>{
    if(error.message === 'Firebase: Error (auth/invalid-email).'){
      seterrmsg("please fill all the required fields");
    }
    if(error.message === 'Firebase: Error (auth/email-already-in-use).'){
      seterrmsg("User already exists");
    }
  })
}; 
  
  return (
    <>
      <Navbar />
      <div class="signup-container">
        <form action="" className="signup-form" onSubmit={handleSubmit}>
          <p className = "create">Create Account</p>
          {successmsg && <>
          <div className="successmsg">
            {successmsg}
          </div>
          </>}

          {errmsg && <>
          <div className="errormsg">
            {errmsg}
          </div>
          </>}
          <label htmlFor="">First Name</label>
          <br />
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
       <br />
          <label>Last Name</label>
          <br />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
           <br />
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
          <label>Phone Number</label>
          <br />
          <input
            type="number"
            placeholder="Phone"
            onChange={(e) => {
              setPhone(e.target.value);
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
          <label>Confirm Password</label>
          <br />
          <input
            type="text"
            onChange={(e) => {
              setcPassword(e.target.value);
            }}
          />
           <br />
          <button type="submit">Create Account</button>
          <br />
          <div>
            <span>Already have an account?</span>
            <Link to="login">Sign in</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
