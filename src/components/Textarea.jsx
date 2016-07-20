var React = require('react');
var noop = require('lodash.noop');
var getElement = require('./getElement');
var shared = require('./shared');
var errors = require('./../errors/index');

/**
 * Describe Input component
 * It is a common component and contains inputs, checkboxes and radios
 */
module.exports = React.createClass({
    mixins: [shared, getElement],

    propTypes: {
        name: React.PropTypes.string.isRequired
    },

    getInitialState: function() {
        var value = this.props.value || '';

        return {
            value: value,
            className: this.props.className || '',
            isValid: true,
            isUsed: false,
            isChanged: false,
            errorMessage: null
        }
    },

    /**
     * Public value setter
     * @param value {String|Number} value to be setted
     * @param event {Event|Boolean} event object or flag to prevent errors to show
     */
    setValue: function(value, event) {
        var isEventPassed = (event && event.nativeEvent instanceof Event);
        var isChanged;

        if (isEventPassed) {
            // Persist the event since we will need this event outside this event loop.
            event.persist();
        }

        isChanged = (value !== this.state.value) || (value && value !== this.state.lastValue);

        this.setState({
            isChanged: isChanged,
            isUsed: this.state.isUsed || !event,
            value: value
        }, function() {
            (this.props._blocking || noop)(this);
            (this.props._validate || noop)(this);
            (this.props.onChange || noop)(isEventPassed ? event : undefined);
        });
    },

    /**
     * Blur handler
     * @param event {Event} event object
     * @private
     */
    _handleBlur: function(event) {
        this.setState({
            isUsed: true,
            lastValue: event.currentTarget.value
        }, function() {
            (this.props._validate || noop)(this);
            (this.props.onBlur || noop)(event);
        });
    },

    render: function() {
        var props = Object.assign({}, this.props);
        var hint = this.state.errorMessage ? <span className={errors.defaultHintClassName} {...errors.defaultHintProps}>{this.state.errorMessage}</span> : null;

        delete props._validate;
        delete props.validations;
        delete props._registerControl;
        delete props._unregisterControl;

        return <div className={this.props.containerClassName || errors.defaultContainerClassName}>
            <textarea ref='element' {...props} className={this.state.className} value={this.state.value} onChange={this._handleChange} onBlur={this._handleBlur}/>
            {hint}
        </div>;
    }
});