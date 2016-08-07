import React, {Component, PropTypes} from 'react';
import getViewData from './../helpers/get-view-data.js';
import rules from './../rules.js';

class Input extends Component {
    constructor(props) {
        super(props);

        this.props._register(this);
    }

    componentDidMount() {
        this.props._validate(this);
    }

    handleChange(event) {
        this.props._update(this, event);

        event.persist();

        this.props.onChange && this.props.onChange(event);
    }

    handleBlur(event) {
        this.props._update(this, event);

        event.persist();

        this.props.onBlur && this.props.onBlur(event);
    }

    render() {
        let data = getViewData(this.props);

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

module.exports = Input;