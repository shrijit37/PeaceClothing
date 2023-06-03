import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ProductContainer from "./ProductContainer";
import { collection, getDocs, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfigs/firebaseConfigs";
// import { QuerySnapshot } from "firebase/firestore-types";
import { DocumentData } from "firebase/firestore";
import './style/AllProductPage.css'

const AllProductPage = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = () => {
      const productsArray = [];
      const path = `products-${props.type.toUpperCase()}`;
      console.log(path);

      getDocs(collection(db, path))
        .then((QuerySnapshot) => {
          QuerySnapshot.forEach((doc) => {
            productsArray.push({ ...doc.data(), id: doc.id });
            // console.log(doc.data());
          });
          setProducts(productsArray);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    getProducts();
  }, []);
  console.log(props.type);
  return (
    <>
      <Navbar />
      <div className="heading">
        <p>Top Results for {props.type}s wear</p>
      </div>
      <div className="allproductcontainer">
        {products.map((product) => {
          return <ProductContainer key={product.id} product={product} />;
        })}
      </div>
    </>
  );
};

export default AllProductPage;
