const ShopActionTypes = {

  // tell redux to start getting data asynchronously.
  // This is the first API call. The start
  FETCH_COLLECTIONS_START: 'FETCH_COLLECTIONS_START',

  // What comes back when the request is successful
  FETCH_COLLECTIONS_SUCCESS: 'FETCH_COLLECTIONS_SUCCESS',

  // When there was an error (server down, no credentials)
  FETCH_COLLECTIONS_FAILURE: 'FETCH_COLLECTIONS_FAILURE',
}

export default ShopActionTypes