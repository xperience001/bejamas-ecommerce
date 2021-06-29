/* eslint-disable array-callback-return */
import React, { useState } from 'react'
import '../styles/ProductListFilter.css'
import CloseIcon from '../ico/close.svg'
import CheckBox from './form-elements/CheckBox'
import { useDataLayerValue } from '../context-api/DataLayer'
import { actionTypes } from '../context-api/reducer'
import RadioCheckBox from './form-elements/RadioCheckBox'

function ProductListFilter() {
	const [{ products }, dispatch] = useDataLayerValue()

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

	const [categoryFilter, setCategoryFilter] = useState([])
	const [priceFilter, setPriceFilter] = useState([])

	const handleFilterForm = (e) => {
		e.preventDefault()

		let firstFilterPhase = updateCategoryFilter(categoryFilter[0])
		let secondFilterPhase = updatePriceFilter(priceFilter, firstFilterPhase)
		return secondFilterPhase
	}

	const updateCategoryFilter = (filterArr) => {
		let filterCategoryList = products
		let filteredArray = []
		filterArr.map((filter) => {
			const response = filterCategoryList.filter((product) => product.category === filter)
			response.map((product) => {
				filteredArray = [...filteredArray, product]
			})
		})

		return filteredArray
	}

	const updatePriceFilter = (filterString, prevFilteredProducts) => {
		if (filterString.length > 0) {
			const stringArray = filterString[0].split(" ")
			let lowerRange = stringArray[0]
			if (lowerRange === "") lowerRange = 0
			lowerRange = parseInt(lowerRange)
	
			let upperRange = stringArray[2]
			if (upperRange === "") upperRange = 0
			if (upperRange === "") upperRange = 0
			upperRange = parseInt(upperRange)

			let priceArrFilter = prevFilteredProducts.filter((product) => product.price >= lowerRange && product.price <= upperRange)
			if (upperRange === 0) priceArrFilter = prevFilteredProducts.filter((product) => product.price >= lowerRange)
			
			dispatch({
				type: actionTypes.GENERATE_PRODUCT_LIST,
				productsCurrent: priceArrFilter
			})

			return priceArrFilter
		} else {
			dispatch({
				type: actionTypes.GENERATE_PRODUCT_LIST,
				productsCurrent: prevFilteredProducts
			})
			return prevFilteredProducts
		}
	}

	const resetFilter = () => {
		setCategoryFilter([])
		setPriceFilter([])
		let fullProductsList = products
		dispatch({
			type: actionTypes.GENERATE_PRODUCT_LIST,
			productsCurrent: fullProductsList
		})
	}

	const [{mobileFilterBag}] = useDataLayerValue()

	return (
		<aside className={(mobileFilterBag === false) ? `product-list-category hidebx` : `product-list-category`}> 
			<div className="product-list-category-title flex">
				<div className="heavy-text">Category</div>
				<img onClick={handleMobileFilterView} src={CloseIcon} alt="close"/>
			</div>

			<form id="filterForm" onSubmit={handleFilterForm}>
				<div className="product-list-category-group">
					<CheckBox func={setCategoryFilter} name="category" value="people" count="c1" />
					<CheckBox func={setCategoryFilter} name="category" value="premium" count="c2" />
					<CheckBox func={setCategoryFilter} name="category" value="pets" count="c3" />
					<CheckBox func={setCategoryFilter} name="category" value="food" count="c4" />
					<CheckBox func={setCategoryFilter} name="category" value="landmarks" count="c5" />
					<CheckBox func={setCategoryFilter} name="category" value="cities" count="c6" />
					<CheckBox func={setCategoryFilter} name="category" value="nature" count="c7" />
				</div>
			

				<div className="product-list-category-title flex">
					<div className="heavy-text">Price range</div>
				</div>

				<div className="product-list-category-group">
					<RadioCheckBox func={setPriceFilter} name="price" value=" - 20" text="Lower than $20" count="p1" />
					<RadioCheckBox func={setPriceFilter} name="price" value="20 - 100" text="$20 - $100" count="p2" />
					<RadioCheckBox func={setPriceFilter} name="price" value="100 - 200" text="$100 - $200" count="p3" />
					<RadioCheckBox func={setPriceFilter} name="price" value="200 - " text="More than $200" count="p4" />
				</div>

				<div className="flex product-filter-btns">
					<input onClick={resetFilter} type="reset" className="btn btn-transparent uppercase" value="Clear" />
					<input type="submit" className="btn" value="Save" />
				</div>
			</form>
		</aside>
	)
}

export default ProductListFilter
