var React = require('react');
var ReactDOM = require('react-dom');
require('./src/extend-validation')();
var Login = require('./src/Login');
var Registration = require('./src/Registration');

ReactDOM.render(<Login/>, document.getElementById('login'));
ReactDOM.render(<Registration/>, document.getElementById('registration'));