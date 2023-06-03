import React from 'react'
import "./style/SliderProduct.css"


const SliderProductCard = (product) => {
  return (
    <div className='slider-card'>
        <div className="slider-image-container">
            <img src={product.product.productimage} alt="" />
        </div>
        <div className="details">
            <p className='product-title'>{product.product.producttitle}</p>
            <p className='selling price'>{product.product.productprice}</p>
            <button className='show-more-button'>Show More</button>
        </div>
    
 
    </div>
  )
}

export default SliderProductCard