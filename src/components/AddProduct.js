import React, { useState, useEffect } from "react";
import { storage, auth, db } from "../firebaseConfigs/firebaseConfigs";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import Navbar from "./Navbar";
import "./style/AddProduct.css";

const AddProduct = () => {
  const [producttitle, setProductTitle] = useState("");
  const [producttype, setProductType] = useState("");
  const [productprice, setProductPrice] = useState("");
  const [productimage, setProductImage] = useState("");
  const [productquantity, setProductQuantity] = useState("");
  const [productsize, setProductSize] = useState("");

  const [imageerror, setImageError] = useState("");
  const [successmsg, setSuccessmsg] = useState("");
  const [uploaderror, setUploaderror] = useState("");

  const type = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  const handleProductImage = (e) => {
    e.preventDefault();
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile && type.includes(selectedFile.type)) {
        setProductImage(selectedFile);
        setImageError(" ");
        console.log("no error")
      } else {
        setProductImage(null);
        setImageError("Please select a valid image");

      }
    } else {
      setImageError("Please select a file");
  
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const storageRef = ref(
      storage,
      `product-images${producttype.toUpperCase()}/${Date.now()}`
    );
    uploadBytes(storageRef, productimage).then(() => {
      getDownloadURL(storageRef).then((url) => {
        console.log(productimage);
        addDoc(collection(db, `products-${producttype.toUpperCase()}`), {
          producttitle,
          producttype,
          productprice,
          productimage: url,
          productquantity,
          productsize,
        });
      });
    });
  };
  return (
    <>
      <Navbar />
      <form action="" className="product-form" onSubmit={handleAddProduct}>
  <p>Add product</p>
  {successmsg && <div className="success-msg">{successmsg}</div>}
  {uploaderror && <div className="error-msg">{uploaderror}</div>}
  <label>Product Title</label>
  <input
    type="text"
    placeholder="Product Title"
    onChange={(e) => {
      setProductTitle(e.target.value);
    }}
  />

  <label>Product Type</label>
  <select

    onChange={(e) => {
      setProductType(e.target.value);
    }}
  >
    <option value="">Select Type</option>
    <option value="Men">Men</option>
    <option value="Women">Women</option>
    <option value="sport">Sport</option>
  </select>

  <label>Product Price</label>
  <input
    type="text"
    placeholder="Product Price"
    onChange={(e) => {
      setProductPrice(e.target.value);
    }}
  />
  <label>Product Image</label>
  <input onChange={handleProductImage} type="file" />
  {imageerror && <div className="error-msg">{imageerror}</div>}
  <label>Product Quantity</label>
  <input
    type="text"
    placeholder="Product Quantity"
    onChange={(e) => {
      setProductQuantity(e.target.value);
    }}
  />

  <label>Product Size</label>
  <select

    onChange={(e) => {
      setProductSize(e.target.value);
    }}
  >
    <option value="">Select Size</option>
    <option value="S">S</option>
    <option value="M">M</option>
    <option value="L">L</option>
    <option value="XL">XL</option>
  </select>

  <button type="submit">Add Product</button>
</form>

    </>
  );
};

export default AddProduct;
