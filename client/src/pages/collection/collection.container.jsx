import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors'
import WithSpinner from '../../components/with-spinner/with-spinner.component'
import CollectionPage from './collection.component'

// we pass it as an arrow function since we need to invert
// the result (this is the only way too do so)
const mapStateToProps = createStructuredSelector({
  isLoading: state => !selectIsCollectionsLoaded(state)
})

const CollectionPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage)

export default CollectionPageContainer