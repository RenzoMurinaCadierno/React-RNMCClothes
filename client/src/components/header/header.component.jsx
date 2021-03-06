import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selector'
import { signoutStart } from '../../redux/user/user.actions'
import { ReactComponent as Logo } from '../../assets/crown.svg'
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'


const Header = ({ currentUser, hidden, signoutStart }) => (
  <HeaderContainer>
    <LogoContainer to='/'>
      <Logo className='logo' />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to='/shop'> SHOP </OptionLink>
      <OptionLink to='/'> CONTACT </OptionLink>
      {
        currentUser ?
        <OptionLink as='div' onClick={ signoutStart }>
          SIGN OUT
        </OptionLink>
        :
        <OptionLink to='/signin'> SIGN IN </OptionLink>
      }
      <CartIcon />
    </OptionsContainer>
    {
      // hidden from redux state below is false? Render.
      hidden ? null : <CartDropdown />
    }
  </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
  
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
  signoutStart: () => dispatch(signoutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)