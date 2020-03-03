import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { auth } from '../../firebase/firebase.utils'
import { ReactComponent as Logo } from '../../assets/crown.svg'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

import './header.styles.scss'

const Header = ({ currentUser, hidden }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'> SHOP </Link>
      <Link className='option' to='/shop'> CONTACT </Link>
      {
        currentUser ?
        <div className='option' onClick={ () => auth.signOut() }>
          SIGN OUT
        </div>
        :
        <Link className='option' to='/signin'> SIGN IN </Link>
      }
      <CartIcon />
    </div>
    {
      // hidden from redux state below is false? Render.
      hidden ? null : <CartDropdown />
    }
  </div>
)

// the state we are passed here is the root reducer (state)
// we know that state holds user object, and that user object
// has currentUser inside. Same goes for cart: hidden state.
// So we can nest destructure those two properties like this:
const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  
  // and instead of doing currentUser: currentUser, ES6, do one.
  currentUser,
  hidden
})

export default connect(mapStateToProps)(Header)