import React from 'react'
import { connect } from 'react-redux'
import { toggleCartHidden } from '../../redux/cart/cart.actions'
import { selectCartItemsCount } from '../../redux/cart/cart.selectors'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className="cart-icon" onClick={ toggleCartHidden }>
    <ShoppingIcon className='shopping-icon' />
    <span className="item-count"> { itemCount } </span>
  </div>
)

// define itemCount here and bring it to the component by mapStateToProps,
// it will use the selector to return the processed piece of state needed
const mapStateToProps = state => ({
  itemCount: selectCartItemsCount(state)
})

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch( toggleCartHidden() )
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)