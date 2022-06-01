import React, { useEffect, useMemo, useState } from 'react'
import { dispatch, useEvent } from 'react-use-event'

type AddToCartEvent = {
  type: 'AddToCart'
  price: number
}
type RemoveFromCartEvent = {
  type: 'RemoveFromCart'
  price: number
}

const TopBar = () => {
  const [totalPrice, setTotalPrice] = useState(0)
  useEvent<AddToCartEvent>('AddToCart', event =>
    setTotalPrice(totalPrice + event.price),
  )
  useEvent<RemoveFromCartEvent>('RemoveFromCart', event =>
    setTotalPrice(Math.max(0, totalPrice - event.price)),
  )
  return (
    <fieldset>
      <legend>Top Bar</legend>
      number of product: {totalPrice}
    </fieldset>
  )
}

const Page = () => {
  return (
    <fieldset>
      <legend>Page Level</legend>
      <ProductList />
    </fieldset>
  )
}

const ProductOverview = (props: { id: number; price: number }) => {
  // const dispatch = useEvent<AddToCartEvent>('AddToCart')
  // const addToCart = () => {
  //   dispatch(props)
  // }
  return (
    <fieldset>
      <legend>Product Overview</legend>
      <p>
        product {props.id}, ${props.price}
      </p>
      <button onClick={() => dispatch<AddToCartEvent>('AddToCart', props)}>
        Add to cart
      </button>
      <button
        onClick={() => dispatch<RemoveFromCartEvent>('RemoveFromCart', props)}
      >
        Remove from cart
      </button>
    </fieldset>
  )
}

const ProductList = () => {
  return (
    <fieldset>
      <legend>Product List</legend>
      <ProductOverview id={1} price={12} />
      <ProductOverview id={2} price={43} />
    </fieldset>
  )
}

const App = () => {
  return (
    <div className="App">
      <fieldset>
        <legend>Top Level</legend>
        <TopBar />
        <Page />
      </fieldset>
    </div>
  )
}

export default App
