import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import { store } from './redux/store';
import App from './containers/app';
import 'antd/dist/antd.css';

ReactDOM.render(<App store={store} />, document.getElementById('root'));
