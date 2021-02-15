import './cart.css'
import React, { useEffect, useState } from 'react'
import CartItem from '../components/CartItem'
import { Link } from 'react-router-dom'
import { useGlobal } from '../context'

const Cart = () => {
  const { ...state } = useGlobal()
  const [subtotal, setSubTotal] = useState(0)

  useEffect(() => {
    let total = 0

    state.cart.map((item) => {
      total += item.price * item.amount
      return total
    })
    setSubTotal(total)
  }, [state.cart])

  // console.log(state.cart)
  return (
    <div className='wrapper'>
      <div className='cart-header'>
        <h3>Hello, {state.user?.email}</h3>
        <h1>Your Basket</h1>
      </div>
      <div className='cart'>
        <div className='cart__left'>
          {state.cart.map((item) => {
            return <CartItem key={item.id} {...item} amount={item.amount} />
          })}
        </div>
        <div className='cart__right'>
          <h2>Subtotal</h2>
          <div className='total-items'>
            <p>Items in cart:</p>
            <div className='grid-2'>
              <p className='cart-items-amount'>amount</p>
            </div>
            <p className='cart-items-count'></p>
          </div>
          <hr />
          <div className='cart-items'>
            {state.cart.map((item) => {
              return (
                <div key={item.id} className='cart-items-row'>
                  <p className='cart-items-title'>
                    {item.title.slice(0, 50)}...
                  </p>
                  <div className='grid-2'>
                    <p className='cart-items-amount'>{item.amount}</p>
                  </div>
                  <p className='cart-items-prices'>
                    {(item.price * item.amount).toFixed(2)}
                  </p>
                  <div className='line'></div>
                </div>
              )
            })}
          </div>
          <div className='total-price'>
            <p>Total price:</p>
            <div className='grid-2'>
              <p className='cart-items-amount'>{state.cartItemsCount}</p>
            </div>
            <p className='cart-items-total-price'>{subtotal.toFixed(2)}</p>
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
