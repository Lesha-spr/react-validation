import React, { Component } from 'react';
import Validation from './../../validation';

export default class Comment extends Component {
    handleSubmit = (event) => {
        event.preventDefault();

        // Emulate async API call
        setTimeout(() => {
            this.form.showError('username', (value) => <span>Errors with {value}</span>);
        }, 1000);
    };

    removeApiError = () => {
        this.form.hideError('username');
    };

    render() {
        return <Validation.components.Form ref={c => { this.form = c }} onSubmit={this.handleSubmit}>
            <div className="row">
                <div className="small-12 columns">
                    <h3>Leave a comment</h3>
                </div>
            </div>
            <div className="row">
                <div className="small-12 medium-4 columns">
                    <label>
                        <Validation.components.Input
                          onFocus={this.removeApiError}
                          onChange={event => console.log(event.target.value)}
                          onBlur={event => console.log(event.target.value)}
                          placeholder="username"
                          type="text"
                          errorClassName="is-invalid-input"
                          containerClassName=""
                          value="Username"
                          name="username"
                          validations={['required', 'alpha']}
                        />
                    </label>
                </div>
                <div className="small-12 medium-8 columns">
                    <label>
                        <Validation.components.Textarea
                          placeholder="Leave your comment..."
                          errorClassName="is-invalid-input"
                          containerClassName=""
                          value="Comment"
                          name="comment"
                          validations={['required']}
                        />
                    </label>
                </div>
            </div>
            <div className="row">
                <div className="small-12 medium-6 columns">
                    <Validation.components.Button className="button">Submit</Validation.components.Button>
                </div>
            </div>
        </Validation.components.Form>
    }
}
