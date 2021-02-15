import React, { useState, useEffect } from 'react'
import './header.css'
import SearchIcon from '@material-ui/icons/Search'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../firebase'
import { useGlobal } from '../context'

const Header = () => {
  const { searchKeyword, changePage, cartItemsCount, ...state } = useGlobal()
  const [keyword, setKeyword] = useState('')
  const [value, setValue] = useState('')
  const history = useHistory()

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
          <Link className='header__link' to={`${!state.user && '/login'}`}>
            <span className='header__optionLineOne'>
              Hi {!state.user ? 'Quest' : state.user.email}
            </span>
            <span className='header__optionLineTwo'>
              {state.user === null ? (
                'Sign in'
              ) : (
                <span
                  onClick={() => {
                    auth
                      .signOut()
                      .then(() => {
                        history.push('/')

                        console.log('signed out')
                      })
                      .catch((error) => console.log(error))
                  }}
                >
                  Log Out
                </span>
              )}
            </span>
          </Link>
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
