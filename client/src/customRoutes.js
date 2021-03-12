import * as React from "react";
import { Route } from 'react-router-dom';
import List from './components/List';


export default [
    <Route exact path="/list" component={List} noLayout/>,
];