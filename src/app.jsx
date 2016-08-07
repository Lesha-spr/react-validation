import {render} from 'react-dom';
import './extend.js';
import Registration from './Registration.jsx';
import Comment from './Comment.jsx';
import React, {Component, PropTypes} from 'react';

let App = () => {
    return <div>
        <Registration/>
        <Comment/>
    </div>;
};

render(
    <App/>,
    document.getElementById('app')
);