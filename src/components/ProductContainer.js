import React from "react";
import "./style/productcontainer.css";
import "./style/AllProductPage.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
faCartShopping,
faBagShopping
} from "@fortawesome/free-solid-svg-icons";

const ProductContainer = (product) => {
  let overalltex = 10 / 100;
  let overallcommission = 10 / 100;
  let extraforfun = 10 / 100;

  let mrp = parseInt(product.product.productprice);
  mrp = Math.round(
    mrp + overalltex * mrp + overallcommission * mrp + extraforfun
  );
  const saleprice = product.product.productprice;
  return (
    <div className="product-container">
      <img src={product.product.productimage} className="productimage" />
      <Link to="`/product/${product.product.id}/${product.product.producttitle}">
      <h3>{product.product.producttitle}</h3>
      </Link>
      {/*product prices*/}
      <h6 className="fake">₹ {mrp}</h6>
      <h4 className="actual">₹ {product.product.productprice}</h4>
      <p className="saving">You save : {mrp - product.product.productprice}</p>
      <p className="size">Size : {product.product.productsize}</p>
      <button className="product-button-green"><FontAwesomeIcon icon={faCartShopping} />     Add to Cart</button>
      <button className="product-button"><FontAwesomeIcon icon={faBagShopping} />   Buy Now</button>
    </div>
  );
};

export default ProductContainer;
