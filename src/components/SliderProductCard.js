import React from "react";
import { Link } from "react-router-dom";
import "./style/SliderProduct.css";

const SliderProductCard = (product) => {
  return (
    <div className="slider-card">
      <div className="slider-image-container">
        <img src={product.product.productimage} alt="" />
      </div>
      <div className="details">
        <p className="product-title">{product.product.producttitle}</p>
        <p className="selling price">{product.product.productprice}</p>
        <Link
          to={`/product/${product.product.id}/${product.product.producttitle}`}
        >
          <button className="show-more-button">Show More</button>
        </Link>
      </div>
    </div>
  );
};

export default SliderProductCard;
