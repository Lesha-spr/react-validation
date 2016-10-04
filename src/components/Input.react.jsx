import React, {Component, PropTypes} from 'react';
import getViewData from './../helpers/get-view-data.js';

class Input extends Component {
    constructor(props, context) {
        super(props, context);

        context._register(this);
    }

    componentDidMount() {
        this.context._validate(this);
    }

    componentWillUnmount() {
        this.context._unregister(this);
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
            <input
                ref='node'
                type='text'
                {...data.props}
                className={data.className || null}
                checked={data.props.checked}
                value={data.value}
                onChange={this.handleChange.bind(this)}
                onBlur={this.handleBlur.bind(this)}/>
            {data.hint}
        </div>
    }
}

Input.propTypes = {
    onChange: PropTypes.func,
    onBlur: PropTypes.func
};

Input.contextTypes = {
    _register: PropTypes.func,
    _unregister: PropTypes.func,
    _update: PropTypes.func,
    _validate: PropTypes.func,
    states: PropTypes.object,
    errors: PropTypes.object
};

module.exports = Input;