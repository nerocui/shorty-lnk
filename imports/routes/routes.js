import React from 'react';
import {Meteor} from 'meteor/meteor';
import { Router, Route, Switch } from 'react-router-dom';
import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory
} from 'history';

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/Notfound';
import Login from '../ui/Login';

const history = createBrowserHistory();
window.browserHistory=history;
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];


const onEnterPublicPages=()=>{
  if(Meteor.userId()){
    history.replace('/links');
  }
};

const onEnterPrivatePages=()=>{
  if(!Meteor.userId()){
    history.replace('/');
  }
};

export const onAuthChange = (isAuthenticated)=>{
    const pathname = history.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);
    if(isUnauthenticatedPage && isAuthenticated){
      history.push('/links');
      console.log('logged in and unahth page');
    }else if(isAuthenticatedPage && !isAuthenticated){
      history.push('/');
      console.log('logged out and auth page');
    }
    console.log('isAuthenticated', isAuthenticated);
}

 export const routes = (
  <Router history={history}>
    <Switch>
      <Route path="/signup" exact component={Signup} onEnter={onEnterPublicPages}/>
      <Route path="/links" exact component={Link} onEnter={onEnterPrivatePages} />
      <Route path="/" exact component={Login} onEnter={onEnterPublicPages} />
      
      <Route component={NotFound}/>
    </Switch>
  </Router>
);