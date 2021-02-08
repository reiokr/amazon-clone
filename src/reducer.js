const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        if(loading) {
          loading = false
        },
      }
    default:
      return state
  }
}

export { reducer }
