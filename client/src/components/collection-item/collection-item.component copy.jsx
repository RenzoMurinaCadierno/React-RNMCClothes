import React from 'react'
import { connect } from 'react-redux'
// import CustomButton from '../custom-button/custom-button.component'
import { CustomButtonContainer } from '../custom-button/custom-button.styles'
import { addItem } from '../../redux/cart/cart.actions'
import './collection-item.styles.scss'

// we no longer destructure props here, we get the whole item
const CollectionItem = ({ item, addItem }) => {

  const { name, price, imageUrl } = item  // destructure here

  return (
    <div className='collection-item'>
      <div
        className='image'
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className='collection-footer'>
        <span className='name'> {name} </span>
        <span className='price'> {price} </span>
      </div>
      <CustomButtonContainer
        className='custom-button'
        onClick={() => addItem(item)}   // here we need item
        inverted
      > 
        Add to cart 
      </CustomButtonContainer>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem)