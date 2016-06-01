var React = require('react');
var classNames = require('classnames');
var errors = require('./../errors/index');

/**
 * Describe Button component
 */
module.exports = React.createClass({
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

    render: function() {
        var className = {};
        var disabled = this.state.isDisabled || this.props.forceDisabled;

        if (this.props.className) {
            className[this.props.className] = true;
        }

        className[this.props.disabledClassName || errors.defaultDisabledClassName] = disabled;
        className = classNames(className);

        // NOTE: Disabled state would be override by passing 'disabled' prop
        return <input disabled={disabled} {...this.props} className={className}/>;
    }
});