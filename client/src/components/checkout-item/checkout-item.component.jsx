import React from 'react'
import { connect } from 'react-redux'
import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions'
import './checkout-item.styles.scss'

// we need the whole cartItem object to pass it as dispatch to
// clearItem, so, we destructure the rest inside CheckoutItem.
// Otherwise, we would not have access to the whole object if
// we nested destructured instead.
const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {

  const { name, imageUrl, price, quantity } = cartItem

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={ imageUrl } alt="item"/>
      </div>
      <span className='name'> { name } </span>
      <span className='quantity'> 
        <span 
          className='arrow' 
          onClick={ () => removeItem(cartItem)}
        > 
          &#10094; 
        </span>
        <span className='value'> { quantity } </span> 
        <span 
          className='arrow'
          onClick={ () => addItem(cartItem) }
        > 
          &#10095; 
        </span>
      </span>
      <span className='price'> ${ price } </span>
      <span 
        className='remove' 
        onClick={ () => clearItem(cartItem)}
      > 
        &#10005; 
      </span>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItemFromCart(item)),
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem)