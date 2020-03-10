import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateCollections } from '../../redux/shop/shop.actions'
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component'

class ShopPage extends React.Component {

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
    })
  }

  render() {

    // get the match from the received props
    const { match } = this.props

    return (
      <div className='shop-page'>
        <Route 
          exact path={ `${ match.path }` }  // shop/ wherever it is
          component={ CollectionsOverview } // which makes comp reusable! 
        />
        <Route 
          path={ `${match.path}/:collectionId`} 
          component={ CollectionPage }
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