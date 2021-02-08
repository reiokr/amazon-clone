import React from 'react'
import { useGlobal } from '../context'
import AddBoxIcon from '@material-ui/icons/AddBox'
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox'

import '../pages/cart.css'

const CartItem = ({ id, title, image, price, amount }) => {
  const { changeAmount } = useGlobal()

  return (
    <div className='cart-item'>
      <img src={image} alt={title} />
      <div className='cart-info'>
        <p>{title}</p>
        <div className='cart-item-footer'>
          <div className='cart-item-price'>
            <small>$</small>
            <strong>{Number(price).toFixed(2)}</strong>
          </div>

          <div className='cart-items-buttons'>
            <button
              className='change-btn'
              onClick={() => changeAmount(id, 'dec')}
            >
              <IndeterminateCheckBoxIcon />
            </button>
            <span>{amount}</span>
            <button
              className='change-btn'
              onClick={() => changeAmount(id, 'inc')}
            >
              <AddBoxIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
