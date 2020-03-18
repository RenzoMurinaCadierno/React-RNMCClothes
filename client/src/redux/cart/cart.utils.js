export const addItemToCart = (cartItems, cartItemToAdd) => {

  // does the item to add exist in all added items in cartItem's []?
  const existingCartItem = cartItems.find( 
    cartItem => cartItem.id === cartItemToAdd.id
  )

  // if it already exists, we are adding a duplicate item
  if (existingCartItem) {

    // return a NEW array (updating the state), where the item whose
    // id matches the one we are to add gets its quantity + 1.
    // Items in cart that do not match are returned as the same
    return cartItems.map( cartItem => 
    
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }

  // if the cart item is not found in the array, then return a
  // new array copy of cartItems, with this new item with
  // quantity == 1
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}

// decrease the items from the checkout
export const removeItemFromCart = (cartItems, cartItemToRemove) => {

  // get the item being decreased from the state array of cartItems
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToRemove.id
  )

  // are we decreasing the last item to 0?
  if (existingCartItem.quantity === 1) {

    // then filter the array and remove that item by its id
    return cartItems.filter( cartItem => cartItem.id !== cartItemToRemove.id)
  }

  return cartItems.map( cartItem =>
    cartItem.id === cartItemToRemove.id 
    ?
      { ...cartItem, quantity: cartItem.quantity - 1 }
    :
      cartItem
  )
}