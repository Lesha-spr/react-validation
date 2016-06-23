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
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            type: 'text'
        }
    },

    // TODO: refactor this method
    getInitialState: function() {
        var value = this.props.value || '';
        this.isCheckbox = this.props.type === 'checkbox';

        if (this.isCheckbox && !this.props.checked) {
            value = '';
        }

        return {
            value: value,
            className: this.props.className || '',
            checked: this.props.checked || false,
            isValid: true,
            isUsed: this.isCheckbox,
            isChanged: this.isCheckbox,
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

        if (this.isCheckbox) {
            value = !this.state.checked ? this.props.value : '';
        }

        if (isEventPassed) {
            // Persist the event since we will need this event outside this event loop.
            event.persist();
        }

        isChanged = (value !== this.state.value) || (value && value !== this.state.lastValue);

        this.setState({
            isChanged: isChanged,
            isUsed: this.state.isUsed || !event,
            value: value,
            checked: this.isCheckbox ? !this.state.checked : isEventPassed || !event
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
        var input;
        var props;
        var hint = this.state.errorMessage ? <span className={errors.defaultHintClassName}>{this.state.errorMessage}</span> : null;

        if (this.props.wrapper) {
            try {
                props = Object.assign({}, this.props.wrapper.props, this.props);

                input = <this.props.wrapper.component ref='element' {...props} className={this.state.className} checked={this.state.checked} onChange={this._handleChange} onBlur={this._handleBlur}/>;
            } catch(e) {
                console.log(e);
            }
        } else {
            input = <input ref='element' {...this.props} className={this.state.className} checked={this.state.checked} value={this.state.value} onChange={this._handleChange} onBlur={this._handleBlur}/>;
        }
        // TODO: rework hint appearance

        return <div className={this.props.containerClassName || errors.defaultContainerClassName}>
            {input}
            {hint}
        </div>;
    }
});