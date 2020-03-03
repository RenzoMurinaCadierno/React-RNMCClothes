import CartActionTypes from './cart.types'

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
})

// Note: payload is optional if in reducer it is not used

export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
})