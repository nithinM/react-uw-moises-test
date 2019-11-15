import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form'
import user from './userReducer';
import album from './albumReducer';

export default combineReducers({
  currentUser: user,
  album,
  routing: routerReducer,
  form: reduxFormReducer
})
