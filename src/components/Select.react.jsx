import React, {Component, PropTypes} from 'react';
import getViewData from './../helpers/get-view-data.js';

class Select extends Component {
    constructor(props, context) {
        super(props, context);

        context._register(this);
    }

    componentWillUnmount() {
        this.context._unregister(this);
    }

    handleChange(event) {
        this.context._update(this, event, true, true);

        event.persist();

        this.props.onChange && this.props.onChange(event);
    }

    render() {
        let data = getViewData(this.props, this.context);

        return <div className={this.props.containerClassName || null}>
            <select
                ref='node'
                {...data.props}
                value={data.value}
                className={data.className || null}
                onChange={this.handleChange.bind(this)}>
                {this.props.children}
            </select>
            {data.hint}
        </div>
    }
}

Select.propTypes = {
    onChange: PropTypes.func
};

Select.contextTypes = {
    _register: PropTypes.func,
    _unregister: PropTypes.func,
    _update: PropTypes.func,
    _validate: PropTypes.func,
    states: PropTypes.object,
    errors: PropTypes.object
};

module.exports = Select;