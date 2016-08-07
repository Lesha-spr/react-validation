import React, {Component, PropTypes} from 'react';
import getViewData from './../helpers/get-view-data.js';
import rules from './../rules.js';

class Select extends Component {
    constructor(props) {
        super(props);

        this.props._register(this);
    }

    handleChange(event) {
        this.props._update(this, event, true, true);

        event.persist();

        this.props.onChange && this.props.onChange(event);
    }

    render() {
        let data = getViewData(this.props);

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

module.exports = Select;