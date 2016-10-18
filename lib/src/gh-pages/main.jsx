import React, {Component, PropTypes} from 'react';
import { render } from 'react-dom';
import './extend.js';
import Registration from './components/Registration';
import Comment from './components/Comment';

let App = () => {
    return <div>
        <Registration/>
        <Comment/>
    </div>;
};

render(
    <App/>,
    document.getElementById('react-root')
);
