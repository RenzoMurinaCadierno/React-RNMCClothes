import React, { useEffect, lazy, Suspense } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCollectionsStart } from '../../redux/shop/shop.actions'

const CollectionsOverviewContainer = lazy( () => 
  import('../../components/collections-overview/collections-overview.container')
) 

const CollectionPageContainer = lazy( () => 
  import('../../pages/collection/collection.container')
) 

const ShopPage = ({ fetchCollectionsStart, match }) => {

  useEffect( () => {

    fetchCollectionsStart()
  
  }, [fetchCollectionsStart])

  return (
    <div className='shop-page'>
      <Suspense>
        <Route 
          exact 
          path={ `${ match.path }` }
          component={ CollectionsOverviewContainer }
        />
        <Route 
          path={ `${match.path}/:collectionId`} 
          component={ CollectionPageContainer }
        />
      </Suspense>
    </div>
  )
}

// we now only need fetchCollectionsStartAsync from actions 
const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage)




// BEFORE REDUX SAGAS
//
// class ShopPage extends React.Component {
//
//   componentDidMount() {
//
//     // destructure the async redux action from props
//     const { fetchCollectionsStartAsync } = this.props

//     // call for it
//     fetchCollectionsStartAsync()
//   }

//   render() {

//     // get the match from the received props, and loading from state
//     const { match } = this.props

//     return (
//       <div className='shop-page'>
//         <Route 
//           exact 
//           path={ `${ match.path }` }
//           component={ CollectionsOverviewContainer }
//         />
//         <Route 
//           path={ `${match.path}/:collectionId`} 
//           component={ CollectionPageContainer }
//         />
//       </div>
//     )
//   }
// } 

// // we now only need fetchCollectionsStartAsync from actions 
// const mapDispatchToProps = dispatch => ({
//   fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
// })

// export default connect(null, mapDispatchToProps)(ShopPage)



// BEFORE REDUX THUNK

// class ShopPage extends React.Component {

//   // // NO LONGER NEEDED FOR REDUX THUNK
//   // state = {         // this is the same as doing constructor()
//   //   loading: true   // super() and this.state = { loading: true }
//   // }
//   //
//   // set the unsubscribe variable we will use when unmounting
//   // unsubscribeFromSnapshot = null
//   // // NO LONGER NEEDED FOR REDUX THUNK

//   componentDidMount() {

     // destructure the async redux action from props
    //  const { fetchCollectionsStartAsync } = this.props

     // call for it
    //  fetchCollectionsStartAsync()

    // NO LONGER NEEDED FOR REDUX THUNK
    //
    // // destructure updateCollections action from props coming 
    // // from redux below
    // const { updateCollections } = this.props 

    // // bring the 'collections' collection reference from firestore
    // const collectionRef = firestore.collection('collections')
  

    // // // ** OBSERVER PATTERN TO HANDLE FIREBASE CALLS ** 

    // // // whenever the reference updates or when the component mounts,
    // // // onSnapshot() will send us a snapshot from it. Since the object
    // // // we need to use is inside this snapshot, then we need to await
    // // // for the answer before proceeding.
    // // collectionRef.onSnapshot( async snapshot => {

    // //   // from the snapshot, convert each QuerySnapshot in the array
    // //   // in docs to the objects we need to render. Explanation in
    // //   // firebase.utils.js
    // //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot)

    // //   // dispatch the action on the returned collectionMap (collKey:
    // //   // coll obj), to update it with new values
    // //   updateCollections(collectionsMap)

    // //   // collections retrieved, set loading to false, which re-renders 
    // //   // the WithSpinner components above, which in place render the 
    // //   // correct components (not the spinner)
    // //   this.setState({ loading: false })
    // // })


    // //   // ** NATIVE FETCH TO HANDLE FIREBASE CALLS **
    // //   //
    // //   fetch('https://firestore.googleapis.com/v1/projects/rnmc-clothing/databases/(default)/documents')
    // //     .then( res => res.json() )
    // //     .then( collections => console.log(collections) ) 
    // // }


    // // ** PROMISES PATTERN TO HANDLE FIREBASE CALLS **

    // collectionRef.get().then( snapshot => {
    
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
    //   updateCollections(collectionsMap)
    //   this.setState({ loading: false })
    // })
  // }