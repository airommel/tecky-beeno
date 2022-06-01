import React, { useEffect, useMemo, useState } from 'react'

const TopBar = (props: { totalPrice: number }) => {
  return (
    <fieldset>
      <legend>Top Bar</legend>
      number of product: {props.totalPrice}
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

class AddToCartEvent extends Event {
  constructor(public price: number) {
    super('AddToCart', {
      bubbles: true,
      cancelable: true,
    })
  }
}

const ProductOverview = (props: { id: number; price: number }) => {
  const addToCart = (currentTarget: HTMLElement) => {
    let event = new AddToCartEvent(props.price)
    currentTarget.dispatchEvent(event)
  }
  return (
    <fieldset>
      <legend>Product Overview</legend>
      <p>
        product {props.id}, ${props.price}
      </p>
      <button onClick={e => addToCart(e.currentTarget)}>Add to cart</button>
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
  const [totalPrice, setTotalPrice] = useState(0)
  const addToCart = (price: number) => {
    setTotalPrice(totalPrice + price)
  }
  const [element, setElement] = useState<null | HTMLElement>(null)
  useEffect(() => {
    if (!element) return
    const e = element
    const onAddToCart = (_event: Event) => {
      let event = _event as AddToCartEvent
      console.log('add to cart event:', event)
      addToCart(event.price)
    }
    e.addEventListener('AddToCart', onAddToCart)
    return () => e.removeEventListener('AddToCart', onAddToCart)
  }, [element])
  return (
    <div
      className="App"
      onClick={e => console.log('click event:', e)}
      ref={e => {
        if (e !== element) {
          setElement(e)
        }
      }}
    >
      <fieldset>
        <legend>Top Level</legend>
        <TopBar totalPrice={totalPrice} />
        <Page />
      </fieldset>
    </div>
  )
}

export default App
