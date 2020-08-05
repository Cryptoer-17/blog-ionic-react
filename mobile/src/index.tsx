import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reducerAuth from './store/reducer/auth';
import reducerArticolo from './store/reducer/articolo';
import reducerProfilo from './store/reducer/profilo';
import {createStore, applyMiddleware,compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';


const composeEnhancers = process.env.NODE_ENV === 'development' ?  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null|| compose;

const rootReducer = combineReducers(
    {
      auth:reducerAuth,
      articolo:reducerArticolo,
      profilo:reducerProfilo
    }
);

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (

    <Provider store = {store}>
        <App />

    </Provider>

);

ReactDOM.render(app, document.getElementById('root'));

