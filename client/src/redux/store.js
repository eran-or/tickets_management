
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import tickets from './reducers/tickets'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  //Store cretion
  const store = createStore(
    tickets,
    composeEnhancers(applyMiddleware(thunk))
  )
  return store
}