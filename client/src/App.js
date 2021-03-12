import React from 'react';
import { Admin, Resource, fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import authProvider from './components/auth/authProvider';
import scratchersList from './components/scratchers/scratchers';
import scratchersCreate from './components/scratchers/scratchersCreate';
import scratchersEdit from './components/scratchers/scratchersEdit';
import usersList from './components/users/users';
import usersCreate from './components/users/usersCreate';
import usersEdit from './components/users/usersEdit';

import customRoutes from './customRoutes';


const httpClient = (url, options = {}) => {
  if(!options.headers) {
    options.headers = new Headers({ Accept: 'application/json'});
  }

  const token = localStorage.getItem('auth');
  options.headers.set('auth', token)
  return fetchUtils.fetchJson(url, options);
}

const dataProvider = jsonServerProvider('http://localhost:4000/api/v1', httpClient);

function App() {
   return (
       <Admin customRoutes={customRoutes} dataProvider={dataProvider} authProvider={authProvider} title="scratch.bling">
           <Resource name="backscratchers" list={scratchersList} create={scratchersCreate} edit={scratchersEdit}/>
           <Resource name="users" list={usersList} create={usersCreate} edit={usersEdit} />
       </Admin>
   );
}

export default App;
