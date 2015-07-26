# react-validation

Component to simple form validation using <a href="https://github.com/chriso/validator.js">validator</a> for check rules.

It is not easy to validate forms with React. The reason is one-way data flow style.
In this case we can't affect forms from the inputs in easy way.
React-validation provides several components which are 'connected' to form via input's method attached by Form component.

# Installation

``
npm install react-validation
``

# Example usage

```
var Validation = require('react-validation');

var Form = React.createClass({
  onSubmit: function(event) {
    event.preventDefault();
    console.log(event.currentTarget);
  },

  render: function() {
    return (
      <Validation.Form onSubmit={this.onSubmit}>
        <Validation.Input validations={['isRequired', 'isEmail']} type='text' name='login' className='ui-input' />
        <Validation.Input validations={['isRequired']} type='password' name='password' className='ui-input' />
        <Validation.Button type='submit' className='ui-button' />
      </Validation.Form>
    );
  }
});
```