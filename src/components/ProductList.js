import React from 'react'
import '../styles/ProductList.css'
import ProductItemsList from './ProductItemsList'
import ProductListFilter from './ProductListFilter'

function ProductList() {
  return (
    <section className="product-list flex">
      <ProductListFilter />
      <ProductItemsList />
    </section>
  )
}

export default ProductList
