import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './root.saga'
import rootReducer from './root.reducer'

// invoke saga middleware
const sagaMiddleware = createSagaMiddleware()

// set middleware arr. Add sagas to it
const middlewares = [sagaMiddleware]

// development mode? Add middlewares.
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

// create the store from the root reducer, adding all mid-wares
const store = createStore(
  rootReducer, 
  applyMiddleware(...middlewares)
)

// launch saga middleware
sagaMiddleware.run(rootSaga)

const persistor = persistStore(store)

export { store, persistor }