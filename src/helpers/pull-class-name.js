module.exports = (error, props) => {
    let className = props.className || '';

    if (error && props.errorClassName) {
        className = `${className} ${props.errorClassName}`;
    }

    return className;
};