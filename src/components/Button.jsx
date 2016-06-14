var React = require('react');
var noop = require('lodash.noop');
var getElement = require('./getElement');
var classNames = require('classnames');
var errors = require('./../errors/index');

/**
 * Describe Button component
 */
module.exports = React.createClass({
    mixins: [getElement],
    propTypes: {
        type: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            type: 'submit'
        }
    },

    getInitialState: function() {
        return {
            isDisabled: true
        }
    },

    componentWillMount: function() {
        (this.props._registerSubmit || noop)(this);
        (this.props._registerBlocking || noop)(this);
    },

    componentWillUnmount: function() {
        (this.props._unregisterSubmit || noop)(this);
        (this.props._unregisterBlocking || noop)(this);
    },

    render: function() {
        var className = {};

        if (this.props.className) {
            className[this.props.className] = true;
        }

        className[this.props.disabledClassName || errors.defaultDisabledClassName] = this.state.isDisabled;
        className = classNames(className);

        // NOTE: Disabled state would be override by passing 'disabled' prop
        return <input ref='element' disabled={this.state.isDisabled} {...this.props} className={className}/>;
    }
});