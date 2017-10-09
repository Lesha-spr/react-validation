import React, { Component } from 'react';
import Form from './components/form';
import Input from './components/input';
import Button from './components/button';
import Textarea from './components/textarea';
import Select from './components/select';

import { isEmail } from 'validator';

const required = (value, props) => {
  if (!value || (props.isCheckable && !props.checked)) {
    return <span className="form-error is-visible">Required</span>;
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return <span className="form-error is-visible">${value} is not a valid email.</span>;
  }
};

const isEqual = (value, props, components) => {
  const bothUsed = components.password[0].isUsed && components.confirm[0].isUsed;
  const bothChanged = components.password[0].isChanged && components.confirm[0].isChanged;

  if (bothChanged && bothUsed && components.password[0].value !== components.confirm[0].value) {
    return <span className="form-error is-visible">Passwords are not equal.</span>;
  }
};

class Registration extends Component {
  handleClick = () => {
    this.form.validateAll();
  };

  handleSubmit = (event) => {
    event.preventDefault();

    console.log(event);
  };

  render() {
    return (
      <Form ref={c => { this.form = c }} onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="small-12 columns">
            <h3>Registration</h3>
            <button className="button" type="button" onClick={this.handleClick}>Validate all</button>
          </div>
        </div>
        <div className="row">
          <div className="small-12 medium-6 columns">
            <label>
              Firstname*
              <Input
                placeholder="Firstname"
                type="text"
                name="firstname"
                validations={[required]}
              />
            </label>
          </div>
          <div className="small-12 medium-6 columns">
            <label>
              Lastname*
              <Input
                placeholder="Lastname"
                type="text"
                name="lastname"
                validations={[required]}
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="small-12 medium-6 columns">
            <label>
              Email*
              <Input
                placeholder="Email"
                type="email"
                name="email"
                validations={[required, email]}
              />
            </label>
          </div>
          <div className="small-12 medium-6 columns">
            <label>
              City*
              <Select
                name="city"
                validations={[required]}
              >
                <option value="">Choose your city</option>
                <option value={1}>London</option>
                <option value={2}>Kyiv</option>
                <option value={3}>New York</option>
              </Select>
            </label>
          </div>
        </div>
        <div className="row">
          <div className="small-12 medium-6 columns">
            <label>
              Password*
              <Input
                placeholder="Password"
                type="password"
                name="password"
                validations={[required, isEqual]}
              />
            </label>
          </div>
          <div className="small-12 medium-6 columns">
            <label>
              Confirm password*
              <Input
                placeholder="Confirm password"
                type="password"
                name="confirm"
                validations={[required, isEqual]}
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="small-12 medium-6 columns">
            <label>
              I accept policy*
              <Input
                type="checkbox"
                name="policy"
                value="1"
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
    )
  }
}

class Comment extends Component {
  handleSubmit = (event) => {
    event.preventDefault();

    // Emulate async API call
    setTimeout(() => {
      this.form.showError(this.userInput, <span className="form-error is-visible">API error</span>);
    }, 1000);
  };

  removeApiError = () => {
    this.form.hideError(this.userInput);
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit} ref={c => this.form = c}>
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
    )
  }
}

export default function App() {
  return (
    <div>
      <Registration/>
      <Comment/>
    </div>
  )
}
