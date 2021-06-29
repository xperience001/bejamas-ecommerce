/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import '../styles/ProductListHeader.css'
import SortIcon from '../ico/sort.svg'
import SettingsIcon from '../ico/setting-lines.svg'
import { useDataLayerValue } from '../context-api/DataLayer'
import { actionTypes } from '../context-api/reducer'

function ProductListHeader() {
	const [{productsCurrent, mobileFilterBag}, dispatch] = useDataLayerValue()
	
	const handleMobileFilterView = () => {
		if (Math.max(window.innerWidth || document.documentElement.clientWidth) < 999) {
			(mobileFilterBag === false) ? dispatch({
				type: actionTypes.MOBILE_FILTER_BAG,
				mobileFilterBag: true
			}) : dispatch({
				type: actionTypes.MOBILE_FILTER_BAG,
				mobileFilterBag: false
			})
		}
	}

	useEffect(() => {
		if (Math.max(window.innerWidth || document.documentElement.clientWidth) < 999) {
			dispatch({
				type: actionTypes.MOBILE_FILTER_BAG,
				mobileFilterBag: false
			})
		}
	}, [])

	window.addEventListener('resize', () => {
    if (Math.max(window.innerWidth || document.documentElement.clientWidth) < 999) {
			dispatch({
				type: actionTypes.MOBILE_FILTER_BAG,
				mobileFilterBag: false
			})
		} else {
			dispatch({
				type: actionTypes.MOBILE_FILTER_BAG,
				mobileFilterBag: true
			})
		}
  })

	const [isAscending, setIsAscending] = useState(false)
	const sortAlphabetically = () => {
		if (isAscending === false) {
			productsCurrent.sort((a, b) => a.name.localeCompare(b.name))
			setIsAscending(true)
		}

		if (isAscending === true) {
			productsCurrent.sort((a, b) => b.name.localeCompare(a.name))
			setIsAscending(false)
		}

		dispatch({
			type: actionTypes.GENERATE_PRODUCT_LIST,
			productsCurrent: productsCurrent
		})
	}

	const [isSortByPrice, setIsSortByPrice] = useState(false)
	const sortByPrice = () => {
		if (isSortByPrice === false) {
			productsCurrent.sort((a, b) => a.price - b.price)
			setIsSortByPrice(true)
		}

		if (isSortByPrice === true) {
			productsCurrent.sort((a, b) => b.price - a.price)
			setIsSortByPrice(false)
		}

		dispatch({
			type: actionTypes.GENERATE_PRODUCT_LIST,
			productsCurrent: productsCurrent
		})
	}

  return (
    <header className="product-list-header flex">
      <div className="product-list-type-name">
        <span className="heavy-text">Photography</span>
				<span className="slash-pad"> / </span>
				<span className="light-50">Premium Photos</span>
      </div>

      <div className="product-list-sort-filter flex">
				{/* sort */}
				<div onClick={sortAlphabetically} className="product-list-sort flex">
					<img className="light-50" src={SortIcon} alt="sort"/>
					<div className="light-text">Sort</div>
				</div>
				{/* price */}
				<select onChange={sortByPrice} name="priceOrder" className="priceOrder">
					<option value="">Price</option>
					<option value="Ascending">Ascending</option>
					<option value="Descending">Descending</option>
				</select>
				{/* mobile tap filter */}
				<div onClick={handleMobileFilterView} className="product-list-mobile-sort">
					<img src={SettingsIcon} alt="mobile settings"/>
				</div>
      </div>
    </header>
  )
}

export default ProductListHeader
