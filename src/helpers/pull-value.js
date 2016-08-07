module.exports = props => {
    let value = props.value;

    if (props.states.hasOwnProperty(props.name)) {
        value = props.states[props.name].value;
    }

    return value;
};