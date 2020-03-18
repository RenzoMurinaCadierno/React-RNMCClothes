import React from 'react'
import { connect } from 'react-redux'
import { CollectionItemContainer, ImageContainer, CollectionFooterContainer,
  NameContainer, PriceContainer, CustomButtonContainer } from './collection-item.styles'
import { addItem } from '../../redux/cart/cart.actions'
// import './collection-item.styles.scss'

// we no longer destructure props here, we get the whole item
const CollectionItem = ({ item, addItem }) => {

  const { name, price, imageUrl } = item  // destructure here

  return (
    <CollectionItemContainer>
      <ImageContainer
        className='image'
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <CollectionFooterContainer>
        <NameContainer> { name } </NameContainer>
        <PriceContainer> { price } </PriceContainer>
      </CollectionFooterContainer>
      <CustomButtonContainer
        className='custom-button'
        onClick={() => addItem(item)}   // here we need item
        inverted
      > 
        Add to cart 
      </CustomButtonContainer>
    </CollectionItemContainer>
  )
}

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem)