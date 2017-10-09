import React, { Component } from 'react';
import Form from './components/form';
import Input from './components/input';
import Button from './components/button';
import Textarea from './components/textarea';

const required = (value, props, components) => {
  if (!value || (props.isCheckable && !props.checked)) {
    return <span>Error</span>;
  }
};

const isEqual = (value, props, components) => {
  if (components['password'][0].value !== components['confirm'][0].value) {
    return <span className="error">Passwords aren't equal.</span>
  }
};

class Comment extends Component {
  handleSubmit = (event) => {
    event.preventDefault();

    // Emulate async API call
    setTimeout(() => {
      this.form.showError(this.userInput, <span>API error</span>);
    }, 1000);
  };

  removeApiError = () => {
    this.form.hideError(this.userInput);
  };

  render() {
    return <Form ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)}>
      <div className="row">
        <div className="small-12 columns">
          <h3>Leave a comment</h3>
        </div>
      </div>
      <div className="row">
        <div className="small-12 medium-4 columns">
          <label>
            <Input
              onFocus={this.removeApiError}
              ref={c => { this.userInput = c }}
              placeholder="username"
              type="text"
              value="Username"
              name="username"
              validations={[required]}
            />
          </label>
        </div>
        <div className="small-12 medium-8 columns">
          <label>
                        <Textarea
                          placeholder="Leave your comment..."
                          value="Comment"
                          name="comment"
                          validations={[required]}
                        />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="small-12 medium-6 columns">
          <Button className="button">Submit</Button>
        </div>
      </div>
    </Form>
  }
}

class App extends Component {
  render() {
    return (
      <Comment />
    );
  }
}

export default App;
