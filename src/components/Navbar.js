import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faHeart,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";

import logo from "./logo.png";
import { auth, db } from "../firebaseConfigs/firebaseConfigs";
import { collection, query, getDocs, where } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import "./style/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  function GetCurrentUser() {
    const [user, setUser] = useState("");
    const userCollectionRef = collection(db, "users");

    useEffect(() => {
      auth.onAuthStateChanged((userlogged) => {
        if (userlogged) {
          const getUser = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", userlogged.uid)
            );

            console.log(q);
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUser();
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }

  const loggeduser = GetCurrentUser();

  const HandleLogout = () => {
    auth.signOut().then(() => {
      navigate("SignUp/login");
    });
  };
  return (
    <>
      <div className="navtop" id="navbar">
        <img src={logo} alt="" className="logo" />
      </div>
      <div className="signin">
        {!loggeduser && (
          <div className="topr">
            <FontAwesomeIcon icon={faUser} size="lg" />
            <Link to="/SignUp">
              <h3>Sign in</h3>
            </Link>
          </div>
        )}
        {loggeduser && (
          <div className="topr">
            <FontAwesomeIcon icon={faUser} />
            <Link to="/profile">
              <h3 className="username">{loggeduser[0].firstName}</h3>
            </Link>
            <FontAwesomeIcon icon={faHeart} />
            <h3>Favourite</h3>
            <FontAwesomeIcon icon={faBagShopping} />
            <a href="/cart">
              <h3>Cart</h3>
            </a>

            {loggeduser && loggeduser[0].email == "shrijit@gmail.com" && (
                <a href="/sellproduct">
                  <h3> Manage site</h3>
                </a>
            )}
            <a href="/SignUp/login" onClick={HandleLogout}>
              Logout
            </a>
          </div>
        )}
      </div>
      <div className="navbottom">
        <nav class="navbar">
          <div class="navbar-center">
            <ul class="navbar-list">
              <a href="/">
                <li class="navbar-item"><h4>Home</h4></li>
              </a>
              <a href="/product-type/men">
                <li class="navbar-item"><h4>Mens</h4></li>
              </a>
              <a href="/product-type/women">
                <li class="navbar-item"><h4>Woman</h4></li>
              </a>
              <a href="/product-type/sports">
                <li class="navbar-item"><h4>Sports</h4></li>
              </a>
            </ul>
          </div>
          <div class="search-container">
            <FontAwesomeIcon icon={faSearch} />
            <input type="text" class="search-input" placeholder="Search..." />
          </div>
        </nav>
      </div>
    </>

    // <div className="navtop row">
    //   <div className="col-sm-5 logo"></div>
    //   <img src={logo} alt="" className="logo d-flex justify-content-center align-items-center" />
    // </div>

    // <div className="row-2 float-right">
    // {!loggeduser && (
    //     <div className="topr">
    //       <FontAwesomeIcon icon={faUser} size="lg" />
    //       <Link to="/SignUp">
    //         <h3>Sign in</h3>
    //       </Link>
    //     </div>
    //   )}
    //   {loggeduser && (
    //     <div className="topr">
    //       <FontAwesomeIcon className="topr-items" icon={faUser} />
    //       <Link to="/profile">
    //         <span className="username topr-items" >{loggeduser[0].firstName}</span>
    //       </Link>
    //       <FontAwesomeIcon icon={faHeart} className="topr-items"/>
    //       <h3 className="topr-items">Favourite</h3>
    //       <FontAwesomeIcon icon={faBagShopping} className="topr-items"/>
    //       <a href="/cart">
    //         <h3 className="topr-items">Cart</h3>
    //       </a>
    //       <a href="/SignUp/login" onClick={HandleLogout} className="topr-items">
    //         Logout
    //       </a>
    //       {loggeduser && loggeduser[0].email === "shrijit@gmail.com" && (
    //     <div className="topr manage">
    //       <Link to="/sellproduct">Manage site</Link>
    //     </div>
    //   )}
    //     </div>
    //   )}

    // </div>
    // <div className="navbottom">
    //   <nav className="navbar">
    //     <div className="navbar-center">
    //       <ul className="navbar-list">
    //         <a href="/">
    //           <li className="navbar-item">Home</li>
    //         </a>
    //         <Link to="/product-type/men">
    //           <li className="navbar-item">Mens</li>
    //         </Link>
    //         <Link to="/product-type/women">
    //           <li className="navbar-item">Woman</li>
    //         </Link>
    //         <Link to="/product-type/sports">
    //           <li className="navbar-item">Sports</li>
    //         </Link>
    //       </ul>
    //     </div>
    //     <div className="search-container">
    //       <FontAwesomeIcon icon={faSearch} />
    //       <input
    //         type="text"
    //         className="search-input"
    //         placeholder="Search..."
    //       />
    //     </div>
    //   </nav>
    // </div>

    // </>
  );
};

export default Navbar;
