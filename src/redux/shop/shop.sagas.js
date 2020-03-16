import { takeLatest, call, put, all } from 'redux-saga/effects'
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions'

import ShopActionTypes from './shop.types'

export function* fetchCollectionsAsync() {

  try {
    const collectionRef = firestore.collection('collections')
    
    // similar to async/await: call for the snapshot, wait for it
    // and yield it once it returns
    const snapshot = yield collectionRef.get()
  
    // instead of calling convertCollectionsSnapshotToMap() like 
    // we did in Thunks, we leverage in 'call'.
    // call is the effect inside the generator function that calls
    // for the function. In other words, the first param is the
    // function it calls, and the subsequent, the args.
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)
    
    // Put is the saga effect for creating functions ( dispatch() )
    yield put(fetchCollectionsSuccess(collectionsMap))

  } catch (error) {
    
    yield put(fetchCollectionsFailure(error.message))
  }
}

export function* fetchCollectionsStart() {

  // takeEvery runs an action as the first parameter, and
  // an action that runs after the first one, as a second.
  // this is how we trigger more code to run depending on
  // the action.
  // Take every does supports concurrency. It does NOT block 
  // the even thread, so the program does not freeze.
  // Async Actions can be called here without affecting the flow.
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START, 
    fetchCollectionsAsync
  )
}

export function* shopSagas() {
  yield all([ call(fetchCollectionsStart) ])
}