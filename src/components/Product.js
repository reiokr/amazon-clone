import React from 'react'
import './product.css'
import { useGlobal } from '../context'

const Product = ({ id, title, image, price, rating, url, bestSeller }) => {
  const { addToCart } = useGlobal()

  return (
    <div className='product'>
      <div className='product__info'>
        <div className='product__title'>
          {bestSeller && (
            <p style={{ color: 'orange', textAlign: 'right' }}>BestSeller</p>
          )}
          <p>{title}</p>
        </div>
        <div className='product__price'>
          <small>$</small>
          <strong>{price}</strong>
        </div>
        <div className='product__rating'>{rating}</div>
      </div>
      <div className='product__body'>
        <img src={image} alt='product' />
      </div>

      <button
        data-id={id}
        onClick={(e) => {
          addToCart(e.target.dataset.id)
        }}
      >
        Add to Basket
      </button>
      <a
        style={{ marginTop: '10px', textDecoration: 'none', color: 'black' }}
        href={url}
        target='_blank'
        rel='noreferrer'
      >
        Go to amazon page
      </a>
    </div>
  )
}

export default Product
