/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import '../styles/ProductHeader.css'
import { useDataLayerValue } from '../context-api/DataLayer'
import { actionTypes } from '../context-api/reducer'

function ProductHeader() {
  const [{ products }] = useDataLayerValue()
  let productHeader = {}
  if (typeof products != 'undefined'){
    products.map((product) => {
      return (product?.details?.recommendations) ? (
        productHeader = product
      ) : ('')
    })
  }
  
  const [{productCart}, dispatch] = useDataLayerValue()
  const updateCart = () => {
    let cartList = productCart
    cartList.push(productHeader)

    dispatch({
      type: actionTypes.UPDATE_CART,
      productCart: cartList
    })
  }
  

  return (
    <header className="product-header">
      {/* product title */}
      <div className="product-title flex">
        <div className="app-title">
          {productHeader?.name}
        </div>
        <button onClick={updateCart} className="btn product-title-btn hide-on-mobile">Add to Cart</button>
      </div>

      {/* image holder */}
      <div className="product-image-box">
        <img src={productHeader?.image?.src} alt={productHeader?.image?.alt} />
        {(productHeader?.featured) ? (
          <div className="product-tag abs-bottom-left">
            Photo of The Day
          </div>
        ) : ('')}
      </div>
      <button onClick={updateCart} className="btn product-title-btn show-on-mobile">Add to Cart</button>

      {/* description */}
      <div className="product-summary-box flex">
        <div className="product-description-box">
          <div className="app-title pad-y-15">
            About The {productHeader?.name}
          </div>
          <div className="product-category pad-y-7">{productHeader?.category}</div>
          <p className="centroid-500">
            {productHeader?.details?.description}
          </p>
        </div>

        <div className="product-recommend-box text-right">
          <div className="app-title pad-y-15">
            People also buy
          </div>
					<div className="product-recommend-pics">
						{
              productHeader?.details?.recommendations.map((recommended, keyId) => {
                return <div key={keyId} className="recommended-pic-box"><img src={recommended?.src} alt={recommended?.alt} title={recommended?.alt} /></div>
              })
            }
					</div>
					<div className="clr-fix"></div>
          <p>
						Size: {`${productHeader?.details?.dimensions?.width} x ${productHeader?.details?.dimensions?.height}`} pixel
          </p>
          <p>
						Size: {(productHeader?.details?.size) / 1024} MB
          </p>
        </div>
      </div>
    </header>
  )
}

export default ProductHeader
