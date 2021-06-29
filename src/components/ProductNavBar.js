/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react'
import AppLogo from '../ico/bejamas-logo.svg'
import CartImage from '../ico/shopping-cart.svg'
import { useDataLayerValue } from '../context-api/DataLayer'
import { actionTypes } from '../context-api/reducer'
import CartItem from './CartItem'


function ProductNavBar() {
	const [isCartVisisble, setIsCartVisisble] = useState(false)
	const toggleCartBag = () => {
		return(isCartVisisble === false) ? setIsCartVisisble(true) : setIsCartVisisble(false)
	}

	const setCartBag = (value) => {
		return (value === false) ? 'hidebx' : ''
	}

  const [{productCart}, dispatch] = useDataLayerValue()

  const clearCart = () => {
    dispatch({
      type: actionTypes.UPDATE_CART,
      productCart: []
    })
    setTimeout(() => toggleCartBag(), 300)
  }

  return (
    <div className="product-nav flex">
      <img src={AppLogo} alt="Bejamas Logo"/>
      {/* cart */}
      <div className="product-cart">
        <img onClick={() => toggleCartBag()} className="nav-cart-icon" src={CartImage} alt="Cart"/>
        <div onClick={() => toggleCartBag()} className="nav-cart-counter">
          {productCart.length}
        </div>
      </div>

			{/* product cart bag */}
      <aside className={`product-cart-bag ${setCartBag(isCartVisisble)}`}>
        <div onClick={() => toggleCartBag()} className="close-btn" title="Close"></div>
        <div className="clr-fix"></div>
        {productCart.map((cartItem, keyId) => {
          return <CartItem key={keyId} data={cartItem} />
        })}
        {/* clear button */}
        <button onClick={clearCart} className="btn btn-transp-back">
          Clear
        </button>
      </aside>
    </div>
  )
}

export default ProductNavBar
