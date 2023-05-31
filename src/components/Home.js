import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Banner from "./Banner";
import { auth, db } from "../firebaseConfigs/firebaseConfigs";
import { collection, query, getDocs, where } from "firebase/firestore";
const Home = () => {
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
  if (loggeduser) {
    console.log(loggeduser[0]);
  }
  return (
    <>
      <Navbar />
      <Banner />
      <p>{loggeduser?loggeduser[0].email:"no data"}</p>
    </>
  );
};

export default Home;
