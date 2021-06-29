import React from 'react'
import './styles/App.css'
import ProductHeader from './components/ProductHeader'
import ProductList from './components/ProductList'
import ProductNavBar from './components/ProductNavBar'
import ProductListHeader from './components/ProductListHeader'

function App() {
  return (
    <div className="App centroid pad-x-20">
      <ProductNavBar />
      <ProductHeader />
      <ProductListHeader />
      <ProductList />
    </div>
  )
}

export default App
