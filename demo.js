var React = require('react');
require('./src/extend-validation')();
var Login = require('./src/Login');
var Registration = require('./src/Registration');

React.render(<Login/>, document.getElementById('login'));
React.render(<Registration/>, document.getElementById('registration'));