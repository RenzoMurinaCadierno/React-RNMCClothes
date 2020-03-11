import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './root.reducer'

// set middleware arr. Add redux-thunk to it.
const middlewares = [thunk]

// development? Add middlewares.
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

// create the store from the root reducer, adding all mid-wares
const store = createStore(
  rootReducer, 
  applyMiddleware(...middlewares)
)

const persistor = persistStore(store)

export { store, persistor }