import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from './components/Layout';
import Landing from './components/Landing';
import AlbumsList from './components/AlbumsList';
import AlbumEdit from './components/AlbumEdit';
import { getCurrentUser } from './actions/user.actions';

import requireAuth from './lib/requireAuth';
// import waitingForAuth from './lib/waitingForAuth';
import store from './store';

export default (
  <Route path="/" component={Layout} onEnter={store.dispatch(getCurrentUser())}>
    <IndexRoute component={requireAuth(Landing)} />
    <Route path="test" component={AlbumsList}/>
    <Route path="test/:id" component={requireAuth(AlbumEdit)}/>
  </Route>
);
