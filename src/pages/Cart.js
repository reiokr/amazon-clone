import './cart.css'
import React, { useEffect, useState } from 'react'
import CartItem from '../components/CartItem'
import { Link } from 'react-router-dom'
import { useGlobal } from '../context'

const Cart = () => {
  const { cartItems, ...state } = useGlobal()
  const [subtotal, setSubTotal] = useState(0)

  useEffect(() => {
    let total = 0

    cartItems.map((item) => {
      total += item.price * item.amount
      return total
    })
    setSubTotal(total)
  }, [cartItems])

  // console.log(state.cart)
  return (
    <div className='wrapper'>
      <div className='cart-header'>
        <h3>Hello, {state.user?.email}</h3>
        <h1>Your Basket</h1>
      </div>
      <div className='cart'>
        <div className='cart__left'>
          {cartItems.map((item) => {
            return <CartItem key={item.id} {...item} amount={item.amount} />
          })}
        </div>
        <div className='cart__right'>
          <h2>Subtotal</h2>
          <div className='total-items'>
            Total items in cart:{' '}
            <span className='cart-items-count'>{state.cartItemsCount}</span>
          </div>
          <hr />
          <div className='cart-items'>
            {cartItems.map((item) => {
              return (
                <div className='cart-items-row'>
                  <p className='cart-items-title'>
                    {item.title.slice(0, 50)}...
                  </p>
                  <p className='cart-items-amount'>{item.amount}</p>
                  <p className='cart-items-prices'>
                    {(item.price * item.amount).toFixed(2)}
                  </p>
                  <div className='line'></div>
                </div>
              )
            })}
          </div>
          <div className='total-price'>
            Total price: <strong>${subtotal.toFixed(2)}</strong>
          </div>
        </div>
      </div>
      <Link to='/'>
        <button className='back-home'>Back to HomePage</button>
      </Link>
    </div>
  )
}

export default Cart
