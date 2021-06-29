/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'

function CartItem({data}) {
  return (
    <div className="product-bag-tile flex">
      <div className="product-bag-info">
        <div className="product-bag-name">
          {data?.name}
        </div>
        <div className="product-bag-price">
          {`$${data?.price}`}
        </div>
      </div>
      <div className="product-bag-image-box">
        <img src={data?.image?.src} alt={data?.image?.alt}/>
      </div>
    </div>
  )
}

export default CartItem
