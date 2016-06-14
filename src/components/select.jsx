var React = require('react');
var noop = require('lodash.noop');
var getElement = require('./getElement');
var shared = require('./shared');
var errors = require('./../errors/index');

/**
 * Describe Select component
 * It's familiar with Input component
 * But have some specific such isUsed and isChanged flags are true with init
 */
module.exports = React.createClass({
    mixins: [shared, getElement],

    propTypes: {
        name: React.PropTypes.string.isRequired
    },

    getInitialState: function() {
        return {
            value: this.props.value || '',
            className: this.props.className || '',
            isUsed: true,
            isChanged: true
        };
    },

    /**
     * Public value setter
     * Familiar with Input setter
     * @param value {String|Number} value to be setted
     * @param event {Event|Boolean} event object or flag to prevent errors to show
     */
    setValue: function(value, event) {
        var isEventPassed = (event && event.nativeEvent instanceof Event);

        if (isEventPassed) {
            // Persist the event since we will need this event outside this event loop.
            event.persist();
        }

        this.setState({
            value: value
        }, function() {
            (this.props._blocking || noop)(this);
            (this.props._validate || noop)(this);
            (this.props.onChange || noop)(isEventPassed ? event : undefined);
        });
    },

    render: function() {
        var hint = this.state.errorMessage ? <span className={errors.defaultHintClassName}>{this.state.errorMessage}</span> : null;

        return <div className={this.props.containerClassName || errors.defaultContainerClassName}>
            <select ref='element' {...this.props} className={this.state.className} onChange={this._handleChange} value={this.state.value}>
                {this.props.children}
            </select>
            {hint}
        </div>;
    }
});