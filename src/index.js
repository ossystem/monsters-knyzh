import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './app/App';
import constants from './constants';

const initialState = {
    token: localStorage.getItem('token'),
    answers: {
        2: {
            1: '',
            2:''},
        3: {},
        4: {}}
};

const reducer = (state = initialState, action) => {
    const newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case 'SET_TOKEN':
            if (!action.token) {
                localStorage.removeItem('token');
            }

            newState.token = action.token;
            break;
        case 'CHANGE_ANSWERS':
            newState.answers = action.value;
            break;
    }

    return newState;
};

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
