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