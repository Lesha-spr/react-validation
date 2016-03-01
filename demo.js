var React = require('react');
var ReactDOM = require('react-dom');
require('./src/extend-validation')();
var Login = require('./src/Login');
var Registration = require('./src/Registration');
var Subscribe = require('./src/Subscribe');

ReactDOM.render(<Login/>, document.getElementById('login'));
ReactDOM.render(<Registration/>, document.getElementById('registration'));
ReactDOM.render(<Subscribe/>, document.getElementById('subscribe'));