const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true,
      }

    case 'GET_PRODUCTS':
      return {
        ...state,
        products: action.payload.docs.map((product) => {
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
            amount: 0,
          }
        }),
      }

    case 'ADD_TO_CART':
      action.payload.amount = 1
      return { ...state, cart: [...state.cart, action.payload] }

    case 'LOG_IN_USER':
      return { ...state, user: action.payload }

    case 'KEYWORD':
      return { ...state, keyword: action.payload }

    case 'CHANGE_AMOUNT':
      return {
        ...state,
        cart: state.cart
          .map((product) => {
            if (product.id === action.payload.id) {
              if (action.payload.type === 'dec') {
                return { ...product, amount: product.amount - 1 }
              } else {
                return { ...product, amount: product.amount + 1 }
              }
            }
            return product
          })
          .filter((product) => product.amount !== 0),
      }

    default:
      // throw new Error()
      return state
  }
}

export { reducer }
