import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router-dom'
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { toggleCartHidden } from '../../redux/cart/cart.actions'
import { CartDropdownContainer, CartItemContainer, EmptyMessageContainer, CustomButtonContainer } from './cart-dropdown.styles'
// import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'
// import './cart-dropdown.styles.scss'

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <CartDropdownContainer>
    <CartItemContainer>
    {
      cartItems.length 
      ?
        cartItems.map( cartItem => 
          <CartItem key={ cartItem.id } item={ cartItem } />
        )
      :
        <EmptyMessageContainer> 
          Your cart is empty 
        </EmptyMessageContainer>
    }
    </CartItemContainer>
    <CustomButtonContainer 
      onClick={ () => {
        history.push('/checkout')
        dispatch(toggleCartHidden())
      } }
    > 
      Checkout 
    </CustomButtonContainer>
  </CartDropdownContainer>
)

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
})

// the evaluation is inside-out: we first get the connected
// CartDropdown component to the reducer, and then it gets
// withRouter 'history'' that comes with /checkout
export default withRouter(connect(mapStateToProps)(CartDropdown))