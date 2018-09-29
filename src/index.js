import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux' //← Bridge React and Redux
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import rootReducer from './reducers' // ← List of Reducers we created
import registerServiceWorker from './registerServiceWorker';


const store = createStore(rootReducer,applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
