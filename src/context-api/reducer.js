import JsonData from  '../sample-data.json'


export const initialState = {
	products: Object.entries(JsonData)[0][1],
	productsCurrent: Object.entries(JsonData)[0][1],
	mobileFilterBag: true,
	filterCategoryList: [],
	filterPriceList: [],
	productCart: [],
	pagination: [],
}

export const actionTypes = {
	SET_PRODUCT_LIST: 'SET_PRODUCT_LIST',
	MOBILE_FILTER_BAG: 'MOBILE_FILTER_BAG',
	GENERATE_PRODUCT_LIST: 'GENERATE_PRODUCT_LIST',
	SET_FILTER_CATEGORY_LIST: 'SET_FILTER_CATEGORY_LIST',
	SET_FILTER_PRICE_LIST: 'SET_FILTER_PRICE_LIST',
	UPDATE_CART: 'UPDATE_CART', 
	READ_PAGINATION: 'READ_PAGINATION'
}

const reducer = (state, action) => {
	// console.log(action)

	switch (action.type) {
		case actionTypes.SET_PRODUCT_LIST:
			return {
				...state,
				products: action.products,
			}
		case actionTypes.MOBILE_FILTER_BAG:
			return {
				...state,
				mobileFilterBag: action.mobileFilterBag,
			}
		case actionTypes.GENERATE_PRODUCT_LIST:
			return {
				...state,
				productsCurrent: action.productsCurrent,
			}
		case actionTypes.SET_FILTER_CATEGORY_LIST:
			return {
				...state,
				filterCategoryList: action.filterCategoryList,
			}
		case actionTypes.SET_FILTER_PRICE_LIST:
			return {
				...state,
				filterPriceList: action.filterPriceList,
			}
		case actionTypes.UPDATE_CART:
			return {
				...state,
				productCart: action.productCart,
			}
		case actionTypes.READ_PAGINATION:
			return {
				...state,
				pagination: action.pagination,
			}
		default:
			return state
	}
}

export default reducer 