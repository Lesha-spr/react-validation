import React from 'react';
import { render } from 'react-dom';
import './extend.jsx';
import Registration from './components/Registration';
import Comment from './components/Comment';

const App = () => (
    <div>
        <Registration/>
        <Comment/>
    </div>
);

render(
    <App/>,
    document.getElementById('react-root')
);
