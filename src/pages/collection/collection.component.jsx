import React from 'react'
import { connect } from 'react-redux'
import { selectCollection } from '../../redux/shop/shop.selectors'
import CollectionItem from '../../components/collection-item/collection-item.component'
import './collection.styles.scss'

const CollectionPage = ({ collection }) => {

  const { title, items } = collection

  return(
    <div className="collection-page">
      <h2 className='title'> { title } </h2>
      <div className="items">
      {
        items.map( item => 
          <CollectionItem key={ item.id } item={ item } />
        )
      }
      </div>
    </div>
  )
}

// first param is always state, second one are the props that
// are coming from our own component. In this case: match, which
// conveniently has params.collectionId.
// Also, here we are calling createSelector from shop.selector, 
// that returns a function that takes the state and runs it through
// the selector call. This is why we pass the state lastly.
const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage)