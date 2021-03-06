import { createSelector } from 'reselect'

const selectShop = state => state.shop

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
)

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => collections 
  ? 
    Object.keys(collections).map(key => collections[key])
  :
    []    // empty array if no collections found in initial state
)

// bring up shop.collections using [selectCollections],
// find the collection whose id number in the array matches
// the one as value of the key we mapped in COLLECTION_ID_MAP,
// using the string of the name of the collection we pass in URL.
// Lastly, NOTE THIS ONE IS AN ARROW FUNCTION (see the one above,
// it is different!). Which means the return it gives is ANOTHER
// function whose triggering will be createSelector again, this
// time to match the number ID.
export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => collections 
    ?
      collections[collectionUrlParam]
    :
      null    // return null if no collections exist at init state,
              // which renders an empty state
    )

// a selector to return if the shop collection is fetching info
export const selectIsCollectionFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
)

// a selector to checj if the get request to Firebase finished
// loading. We use !! to convert the returned shop.collections
// to its boolean value. If the return is null, it will be false.
// If the return is the object with the collections, it is true
export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  shop => !!shop.collections
)