import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useReducer,
} from 'react'
// import { useFetch } from './components/fetchData'
// import dataJson from './data.json'
import { reducer } from './reducer'

const url = 'https://amazon24.p.rapidapi.com/api/product?'
const AmazonContext = React.createContext()
const initialState = {}

const ContextAPI = ({ children }) => {
  const [keyword, setKeyword] = useState(
    localStorage.getItem('kw') || 'iphone7'
  )
  // const [country, setCountry] = useState('US')
  // const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [products, setProducts] = useState(data)
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState('')
  const [cartItemsCount, setCartItemsCount] = useState(0)
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || []
  )

  const getData = useCallback(
    async (fallback) => {
      try {
        setLoading(true)
        const res = await fetch(
          `${url}country=US&keyword=${keyword}&page=${page}`,
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key':
                'e773b95eddmsh42dc3a5e97faf70p18ed16jsnc858ed5e7a68',
              'x-rapidapi-host': 'amazon24.p.rapidapi.com',
            },
          }
        )
        const data = await res.json()
        console.log(data)
        setData(data)
        if (!data.docs || data.docs.length === 0) {
          return fallback
        } else {
          const newProducts = data.docs.map((product) => {
            const {
              product_id,
              product_title,
              app_sale_price,
              product_main_image_url,
              evaluate_rate,
              product_detail_url,
              isBestSeller,
            } = product
            return {
              id: product_id,
              title: product_title,
              price: app_sale_price,
              image: product_main_image_url,
              rating: evaluate_rate,
              url: product_detail_url,
              bestSeller: isBestSeller,
            }
          })

          setLoading(false)
          setTotalPages(data.totalPages)
          setProducts(newProducts)
        }
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    },
    [keyword, page]
  )

  const changePage = useCallback((pageNr = 1) => {
    setPage(pageNr)
  }, [])
  console.log(products)
  const searchKeyword = (searchTerm) => {
    if (searchTerm === '' || searchTerm === keyword) {
      return
    }
    setKeyword(searchTerm)
  }

  const addToCart = (_id) => {
    const currentItem = cartItems.find((item) => item.id === _id)
    if (currentItem) {
      const newItems = cartItems.map((item) => {
        const { id, title, image } = item
        if (item.id === _id) {
          item.amount = item.amount + 1
        }
        item.price = Number(item.price)
        return { id, title, image, price: item.price, amount: item.amount }
      })
      setCartItems(newItems)
    } else {
      const item = products.find((item) => item.id === _id)
      const newitem = { ...item, amount: 1 }
      setCartItems([...cartItems, newitem])
    }
  }

  const changeAmount = (id, type) => {
    if (type === 'dec') {
      const newItem = cartItems
        .map((item) => {
          if (item.id === id) {
            item.amount = item.amount - 1
          }
          return item
        })
        .filter((item) => item.amount !== 0)
      setCartItems(newItem)
    }
    if (type === 'inc') {
      const newItem = cartItems.map((item) => {
        if (item.id === id) {
          item.amount = item.amount + 1
        }
        return item
      })
      setCartItems(newItem)
    }
  }

  useEffect(() => {
    let amount = 0
    cartItems.map((item) => {
      return (amount += item.amount)
    })
    setCartItemsCount(amount)
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    changePage()
  }, [changePage])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <AmazonContext.Provider
      value={{
        products,
        totalPages,
        loading,
        page,
        cartItemsCount,
        cartItems,
        searchKeyword,
        changePage,
        addToCart,
        setCartItemsCount,
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
