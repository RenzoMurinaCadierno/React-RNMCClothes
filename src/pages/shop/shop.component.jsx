import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateCollections } from '../../redux/shop/shop.actions'
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component'
import WithSpinner from '../../components/with-spinner/with-spinner.component'

// Make two new component which will sent to withSpinner.
// If data from FB was not received yet, withspinner will render the
// spinner. Otherwise, it will render the respective wrapped components
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {

  state = {         // this is the same as doing constructor()
    loading: true   // super() and this.state = { loading: true }
  }

  // set the unsubscribe variable we will use when unmounting
  unsubscribeFromSnapshot = null

  componentDidMount() {

    // destructure updateCollections action from props coming 
    // from redux below
    const { updateCollections } = this.props 

    // bring the 'collections' collection reference from firestore
    const collectionRef = firestore.collection('collections')
  
    // whenever the reference updates or when the component mounts,
    // onSnapshot() will send us a snapshot from it. Since the object
    // we need to use is inside this snapshot, then we need to await
    // for the answer before proceeding.
    collectionRef.onSnapshot( async snapshot => {

      // from the snapshot, convert each QuerySnapshot in the array
      // in docs to the objects we need to render. Explanation in
      // firebase.utils.js
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)

      // dispatch the action on the returned collectionMap (collKey:
      // coll obj), to update it with new values
      updateCollections(collectionsMap)

      // collections retrieved, set loading to false, which re-renders 
      // the WithSpinner components above, which in place render the 
      // correct components (not the spinner)
      this.setState({ loading: false })
    })
  }

  render() {

    // get the match from the received props, and loading from state
    const { match } = this.props
    const { loading } = this.state

    return (
      <div className='shop-page'>
        <Route 
          exact path={ `${ match.path }` }
          render={ (props) => 
            <CollectionsOverviewWithSpinner 
              isLoading={ loading } { ...props }
            /> 
          } 
        />
        <Route 
          path={ `${match.path}/:collectionId`} 
          render={ (props) => 
            <CollectionPageWithSpinner 
              isLoading={ loading } { ...props }
            />
          }
        />
      </div>
    )
  }
} 

const mapDispatchToProps = dispatch => ({

  updateCollections: collectionsMap => 
    dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage)