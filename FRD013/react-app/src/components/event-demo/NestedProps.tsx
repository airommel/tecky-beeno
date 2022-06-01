import React, { useEffect, useMemo, useState } from 'react'

const TopBar = (props: { totalPrice: number }) => {
  return (
    <fieldset>
      <legend>Top Bar</legend>
      number of product: {props.totalPrice}
    </fieldset>
  )
}

const Page = (props: { addToCart: (price: number) => void }) => {
  return (
    <fieldset>
      <legend>Page Level</legend>
      <ProductList addToCart={props.addToCart} />
    </fieldset>
  )
}

const ProductOverview = (props: {
  id: number
  price: number
  addToCart: (price: number) => void
}) => {
  return (
    <fieldset>
      <legend>Product Overview</legend>
      <p>
        product {props.id}, ${props.price}
      </p>
      <button onClick={() => props.addToCart(props.price)}>Add to cart</button>
    </fieldset>
  )
}

const ProductList = (props: { addToCart: (price: number) => void }) => {
  return (
    <fieldset>
      <legend>Product List</legend>
      <ProductOverview id={1} price={12} addToCart={props.addToCart} />
      <ProductOverview id={2} price={43} addToCart={props.addToCart} />
    </fieldset>
  )
}

const App = () => {
  const [totalPrice, setTotalPrice] = useState(0)
  const addToCart = (price: number) => {
    setTotalPrice(totalPrice + price)
  }
  return (
    <div className="App">
      <fieldset>
        <legend>Top Level</legend>
        <TopBar totalPrice={totalPrice} />
        <Page addToCart={addToCart} />
      </fieldset>
    </div>
  )
}

export default App
