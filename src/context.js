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
  cartItemsCount: 0,
  keyword: localStorage.getItem('kw') || 'iphone7',
  cart: [],
}

const ContextAPI = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState('')
  const [cartItems, setCartItems] = useState([])

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
    console.log(_id)
  }

  const changeAmount = (id, type) => {
    dispatch({ type: 'CHANGE_AMOUNT', payload: { id, type } })
  }

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
        cartItems,
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
