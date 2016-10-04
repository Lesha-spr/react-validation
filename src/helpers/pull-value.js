module.exports = (props, context) => {
    let value = props.value;

    if (context.states.hasOwnProperty(props.name)) {
        value = context.states[props.name].value;
    }

    return value;
};