var errors = require('./../errors');
var noop = require('lodash.noop');
var classNames = require('classnames');

module.exports = {
    componentWillMount: function() {
        (this.props._registerControl || noop)(this);
    },

    componentWillUnmount: function() {
        (this.props._unregisterControl || noop)(this);
    },

    componentWillReceiveProps: function(nextProps) {
        if (typeof nextProps.value !== 'undefined') {
            this.setValue(nextProps.value, null);
        }
    },

    /**
     * Change handler
     * We need this method to avoid async problem with React's setState
     * @param event {Event} event object
     * @private
     */
    _handleChange: function(event) {
        var value = event.target.value;

        this.setValue(value, event);
    },

    /**
     * Public method to show errors
     * Useful with async validation
     * @param message {String} message to show
     * @param additionalClassName {String} className to add
     */
    showError: function(message, additionalClassName) {
        var className = {};

        if (additionalClassName) {
            className[additionalClassName] = true;
        }

        className[this.props.className] = true;
        className[this.props.invalidClassName || errors.defaultInvalidClassName] = true;

        this.setState({
            isValid: false,
            isUsed: true,
            isChanged: true,
            className: classNames(className),
            errorMessage: message || null
        });
    },

    /**
     * Public method to hide errors
     */
    hideError: function() {
        var className = {};

        className[this.props.className] = true;

        this.setState({
            className: classNames(className),
            errorMessage: null
        });
    }
};