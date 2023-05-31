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
      <div className="navtop">
        <img src={logo} alt="" className="logo" />

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
            <Link to="/profile"><span className="username">{loggeduser[0].firstName}</span></Link>
            <FontAwesomeIcon icon={faHeart} />
            <h3>Favourite</h3>
            <FontAwesomeIcon icon={faBagShopping} />
            <a href="/cart">
              <h3>Cart</h3>
            </a>
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
                <li class="navbar-item">Home</li>
              </a>
              <li class="navbar-item">Mens</li>
              <li class="navbar-item">Women</li>
              <li class="navbar-item">Sports</li>
            </ul>
          </div>
          <div class="search-container">
            <FontAwesomeIcon icon={faSearch} />
            <input type="text" class="search-input" placeholder="Search..." />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
