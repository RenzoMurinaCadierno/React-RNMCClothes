import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors'
import WithSpinner from '../with-spinner/with-spinner.component'
import CollectionsOverview from './collections-overview.component'

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching
})

// instead of the hard to read code below (explained), we can
// use redux compose function. It does the same: Takes collOverview,
// evaluates it to withspinner and returns the HOC, which in place
// is exaluated to connect and finally returned.
const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview)

// withSpinner will wrap CollectionsOverview, returning the
// spinner loading version of the component. Then, it will 
// be passed to connect with the respective mapStateToProps
//
// const CollectionsOverviewContainer = 
//   connect(mapStateToProps)(WithSpinner(CollectionsOverview))

export default CollectionsOverviewContainer