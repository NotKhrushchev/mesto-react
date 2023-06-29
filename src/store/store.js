import { combineReducers, legacy_createStore as createStore } from 'redux';
import loaderReducer from './reducers/loaderReducer.js';
import currentUserReducer from './reducers/currentUserReducer.js';

const rootReducer = combineReducers({
    loader: loaderReducer,
    currentUser: currentUserReducer
})

const store = createStore(rootReducer)

export default store