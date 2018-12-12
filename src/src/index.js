import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import  reducerIndex from './reducers/reducerIndex'
import thunk from  'redux-thunk'
import { createStore,compose,applyMiddleware } from 'redux'
import './index.css';
import './util/httpUtil'
import Home from './container/home/Home'


// const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : ()=>{}
const store = createStore(reducerIndex,compose(
    applyMiddleware(thunk),
    // reduxDevtools
))

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route path='/' component={Home}></Route>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

