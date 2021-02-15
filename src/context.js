import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useReducer,
} from 'react'
import dataJson from './data.json'
import { reducer } from './reducer'
import { auth } from './firebase'

const AmazonContext = React.createContext()
const initialState = {
  loading: false,
  products: [],
  user: null,
  keyword: localStorage.getItem('kw') || 'iphone7',
  cart: [],
}

const ContextAPI = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState('')
  const [cartItemsCount, setCartItemsCount] = useState(0)

  const getProducts = useCallback(async () => {
    await dispatch({ type: 'GET_PRODUCTS', payload: dataJson })
    setTotalPages(dataJson.totalPages)
  }, [])

  const changePage = useCallback((pageNr = 1) => setPage(pageNr), [])

  const searchKeyword = (searchTerm) => {
    if (searchTerm === '' || searchTerm === state.keyword) {
      return
    }
    dispatch({ type: 'KEYWORD', payload: searchTerm })
  }

  const addToCart = (_id) => {
    if (state.cart.find((item) => item.id === _id)) {
      changeAmount(_id, 'asc')
    } else {
      dispatch({
        type: 'ADD_TO_CART',
        payload: state.products.find((item) => item.id === _id),
      })
    }
  }

  const changeAmount = (id, type) => {
    dispatch({ type: 'CHANGE_AMOUNT', payload: { id, type } })
  }

  useEffect(() => {
    let count = 0
    state.cart.map((item) => {
      count += item.amount
      return count
    })
    setCartItemsCount(count)
  }, [state.cart])

  useEffect(() => {
    changePage()
  }, [changePage])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      authUser
        ? dispatch({ type: 'LOG_IN_USER', payload: authUser })
        : dispatch({ type: 'LOG_IN_USER', payload: null })
    })
  }, [])

  return (
    <AmazonContext.Provider
      value={{
        ...state,
        totalPages,
        page,
        cartItemsCount,
        searchKeyword,
        changePage,
        addToCart,
        changeAmount,
      }}
    >
      {children}
    </AmazonContext.Provider>
  )
}
export const useGlobal = () => {
  return useContext(AmazonContext)
}

export { ContextAPI, AmazonContext }
