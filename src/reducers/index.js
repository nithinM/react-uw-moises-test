import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form'
import {reducer as toastrReducer} from 'react-redux-toastr'
import user from './userReducer';
import albumReducer from './albumReducer';

export default combineReducers({
  currentUser: user,
  album: albumReducer,
  routing: routerReducer,
  form: reduxFormReducer,
  toastr: toastrReducer
})
