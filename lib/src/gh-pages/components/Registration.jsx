import React, {Component, PropTypes} from 'react';
import Validation from './../../validation';

export default class Registration extends Component {
    render() {
        return <Validation.components.Form>
            <div className='row'>
                <div className='small-12 columns'>
                    <h3>Registration</h3>
                </div>
                <div className='small-12 medium-6 columns'>
                    <label>
                        Firstname*
                        <Validation.components.Input errorClassName='is-invalid-input' type="text" containerClassName='' value='' name='firstname' validations={['required', 'alpha']}/>
                    </label>
                </div>
                <div className='small-12 medium-6 columns'>
                    <label>
                        Lastname*
                        <Validation.components.Input errorClassName='is-invalid-input' type="text" containerClassName='' value='' name='lastname' validations={['required', 'alpha']}/>
                    </label>
                </div>
            </div>
            <div className='row'>
                <div className='small-12 medium-6 columns'>
                    <label>
                        Email*
                        <Validation.components.Input errorClassName='is-invalid-input' type="text" containerClassName='' value='email@email.com' name='email' validations={['required', 'email']}/>
                    </label>
                </div>
                <div className='small-12 medium-6 columns'>
                    <label>
                        City*
                        <Validation.components.Select errorClassName='is-invalid-input' name='city' value='' validations={['required']}>
                            <option value=''>Choose your city</option>
                            <option value='1'>London</option>
                            <option value='2'>Kyiv</option>
                            <option value='3'>New York</option>
                        </Validation.components.Select>
                    </label>
                </div>
            </div>
            <div className='row'>
                <div className='small-12 medium-6 columns'>
                    <label>
                        Password*
                        <Validation.components.Input type='password' errorClassName='is-invalid-input' containerClassName='' value='' name='password' validations={['required', 'password']}/>
                    </label>
                </div>
                <div className='small-12 medium-6 columns'>
                    <label>
                        Confirm password*
                        <Validation.components.Input type='password' errorClassName='is-invalid-input' containerClassName='' value='' name='passwordConfirm' validations={['required', 'password']}/>
                    </label>
                </div>
            </div>
            <div className='row'>
                <fieldset className='small-12 medium-6 columns'>
                    <label htmlFor='policy'>I accept policy*</label>
                    <Validation.components.Input id='policy' type='checkbox' errorClassName='is-invalid-input' name='policy' value='1' validations={['required']}/>
                </fieldset>
            </div>
            <div className='row'>
                <div className='small-12 medium-6 columns'>
                    <Validation.components.Button className='button' errorClassName='asd'>Submit</Validation.components.Button>
                </div>
            </div>
        </Validation.components.Form>;
    }
}
