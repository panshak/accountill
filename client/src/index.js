// Copyright: Panshak Solomon
// A.P. Leventis Ornithological Research Institute.
// University of Jos Biological Conservatory
// All right reserved
// ©2022 and beyond

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {  createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducers/'


const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
);