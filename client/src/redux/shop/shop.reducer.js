// import SHOP_DATA from './shop.data'
import ShopActionTypes from './shop.types'

const INITIAL_STATE = {
  collections: null,
  isFetching: false,  // are we fetching the data for collections?
  errorMessage: undefined    // state to store the fetch errors
}

const shopReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    // when async fetch begins, set fetching to true
    case ShopActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true
      }

    // on success, fetching to false and set the incoming
    // fetched data payload to 'collections' state
    case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        collections: action.payload
      }

    // on error, fetch is also false, and the fetched error
    // data will be set to errorMessage
    case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      }
      
    default:
      return state
  }
} 

export default shopReducer