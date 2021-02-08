import React, { useState, useEffect } from 'react'
import './header.css'
import SearchIcon from '@material-ui/icons/Search'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import { useGlobal } from '../context'
import { Link } from 'react-router-dom'

const Header = () => {
  const { searchKeyword, changePage, cartItemsCount } = useGlobal()
  const [keyword, setKeyword] = useState('')
  const [value, setValue] = useState('')

  const handleForm = (e) => {
    e.preventDefault()
    setKeyword(value)
    changePage(1)
    setValue('')
  }

  useEffect(() => {
    searchKeyword(keyword)
  }, [keyword, searchKeyword])

  return (
    <div className='header'>
      <Link to='/'>
        <img
          src='http://pngimg.com/uploads/amazon/amazon_PNG25.png'
          alt=''
          className='header__logo'
        />
      </Link>

      <form className='header__search' onSubmit={handleForm}>
        <input
          type='text'
          className='header__searchInput'
          value={value}
          onChange={(e) => {
            setValue(e.target.value)

            localStorage.setItem('kw', e.target.value)
          }}
        />
        <SearchIcon className='search__icon' onClick={handleForm} />
      </form>

      <div className='header__nav'>
        <div className='header__option'>
          <span className='header__optionLineOne'>Hello user</span>
          <span className='header__optionLineTwo'>Sign in</span>
        </div>
        <div className='header__option'>
          <span className='header__optionLineOne'>Returns</span>
          <span className='header__optionLineTwo'>& orders</span>
        </div>
        <div className='header__option'>
          <span className='header__optionLineOne'>Your</span>
          <span className='header__optionLineTwo'>Prime</span>
        </div>
        <Link to='/cart'>
          <div className='header__optionBasket'>
            <ShoppingBasketIcon />
            <span className='header__optionLineTwo header__basketCount'>
              {cartItemsCount}
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Header
