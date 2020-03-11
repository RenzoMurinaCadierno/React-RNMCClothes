import ShopActionTypes from './shop.types'
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

// dispatch the action with no payload. All it does
// is setting isFetching to true
export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
})

// action to call when the fetch is successful. It takes the
// fetched mapped collection as arg and passes it as payload
export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
})

// action to call if the fetch resulted in an error
export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
})

// this is the action we pass to our components to begin
// the process. It will hold all of the code we need to move
// out of the shop component.
// It is just a function that returns a function that gets access
// to dispatch, so we can access it multiple times asynchronously
export const fetchCollectionsStartAsync = () => {

  return dispatch => {

    const collectionRef = firestore.collection('collections')
    
    // dispatch the action to begin the fetch call above
    dispatch(fetchCollectionsStart())

    // begin the fetch promise to firebase
    collectionRef.get().then( snapshot => {
    
      // convert the firebase collection object to a map
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
      
      // only when we got the response and we converted it, 
      // dispatch the action to the reducer using the method above
      dispatch(fetchCollectionsSuccess(collectionsMap))
      
      // there is no longer any need of setState, it is handled
      // by redux in shop.reducer.
      // this.setState({ loading: false })
    
      // dispatch the error action if there was an error with the
      // whole process
    }).catch(error => dispatch(fetchCollectionsFailure(error.message)))
  }
}