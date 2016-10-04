import React, {Component, PropTypes} from 'react';
import getViewData from './../helpers/get-view-data.js';

class Textarea extends Component {
    constructor(props, context) {
        super(props, context);

        context._register(this);
    }

    componentDidMount() {
        this.context._validate(this);
    }

    handleChange(event) {
        this.context._update(this, event);

        event.persist();

        this.props.onChange && this.props.onChange(event);
    }

    handleBlur(event) {
        this.context._update(this, event);

        event.persist();

        this.props.onBlur && this.props.onBlur(event);
    }

    render() {
        let data = getViewData(this.props, this.context);

        return <div className={this.props.containerClassName || null}>
            <textarea
                ref='node'
                {...data.props}
                checked={data.props.checked}
                className={data.className || null}
                value={data.value}
                onChange={this.handleChange.bind(this)}
                onBlur={this.handleBlur.bind(this)}/>
            {data.hint}
        </div>
    }
}

Textarea.propTypes = {
    onChange: PropTypes.func,
    onBlur: PropTypes.func
};

Textarea.contextTypes = {
    _register: PropTypes.func,
    _update: PropTypes.func,
    _validate: PropTypes.func,
    validate: PropTypes.func,
    states: PropTypes.object,
    errors: PropTypes.object
};

module.exports = Textarea;