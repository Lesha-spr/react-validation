import {render} from 'react-dom';
import './extend.js';
import Validation from './validation.jsx';
import React, {Component, PropTypes} from 'react';

export default class Comment extends Component {
    handleSubmit(event) {
        event.preventDefault();

        // Emulate async API call
        setTimeout(() => {
            this.refs.form.showError('username', <span onClick={this.removeApiError.bind(this)} className='form-error is-visible'>API Error. Click to hide out.</span>);
        }, 1000);
    }

    removeApiError() {
        this.refs.form.hideError('username');
    }

    render() {
        return <Validation.components.Form ref='form' onSubmit={this.handleSubmit.bind(this)}>
            <div className='row'>
                <div className='small-12 columns'>
                    <h3>Leave a comment</h3>
                </div>
            </div>
            <div className='row'>
                <div className='small-12 medium-4 columns'>
                    <label>
                        <Validation.components.Input placeholder='username' errorClassName='is-invalid-input' containerClassName='' value='Username' name='username' validations={['required', 'alpha']}/>
                    </label>
                </div>
                <div className='small-12 medium-8 columns'>
                    <label>
                        <Validation.components.Textarea placeholder='Leave your comment...' errorClassName='is-invalid-input' containerClassName='' value='Comment' name='comment' validations={['required']}/>
                    </label>
                </div>
            </div>
            <div className='row'>
                <div className='small-12 medium-6 columns'>
                    <Validation.components.Button className='button'>Submit</Validation.components.Button>
                </div>
            </div>
        </Validation.components.Form>
    }
}