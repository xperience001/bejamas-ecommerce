/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { useDataLayerValue } from '../context-api/DataLayer'
import { actionTypes } from '../context-api/reducer'

function ProductItem({data}) {
  const [{productCart}, dispatch] = useDataLayerValue()
  const updateCart = () => {
    let cartList = productCart
    cartList.push(data)
    
    dispatch({
      type: actionTypes.UPDATE_CART,
      productCart: cartList
    })
  }

  return (
    <div className="product-item">
      <div className="product-item-image">
        <img src={data?.image?.src} alt={data?.image?.alt} />
				{(data.bestseller) ? (
          <div className="product-tag abs-top-left">Best Seller</div>
        ) : ('')}
				{(data.featured) ? (
          <div className="product-tag abs-top-left">Featured</div>
        ) : ('')}
			  <button onClick={updateCart} className="btn product-cart-btn">Add to Cart</button>
      </div>
			<div className="capitalize light-50 pad-y-10">{data.category}</div>
			<div className="heavy-text pad-y-7">{data.name}</div>
			<div className="light-50">
        ${data.price}
      </div>

    </div>
  )
}

export default ProductItem
