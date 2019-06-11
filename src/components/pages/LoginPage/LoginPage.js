import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import BasePage from '../BasePage/BasePage';
import ButtonNext from '../../buttons/ButtonNext/ButtonNext';
import constants from '../../../constants';
import './LoginPage.css';
import {FormErrors} from "./FormErrors";

const styles = {
  cssUnderline: {
    '&:after': {
      borderBottomColor: '#8cbe82',
    }
  }
};

class LoginPage extends Component {
  constructor (props) {
    super(props);

    this.state = {
        email: '',
        password: '',
        formIsFilled: false,
        formErrors: {email: '', password: ''},
        emailValid: true,
        passwordValid: true,
        formValid: false
    };

    this._sendAuthRequest = this.sendAuthRequest.bind(this);
    this._onFieldChangeValue = this.onFieldChangeValue.bind(this);
  }

  async sendAuthRequest () {

    const {email, password, formValid} = this.state;

    if(!formValid){
        return;
    }

    let responseData = (email && password ) ?{success: '200', token: constants.token} : {};
    const {success, token} = responseData || {};

    if (!success || !token) {
      this.setState({
          formValid: false
      });

      return;
    }

    localStorage.setItem('token', token);

    this.props.dispatch({
      type: 'SET_TOKEN',
        token: token
    });

    this.props.history.push('/questions');
  }

  onFieldChangeValue (e) {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value},
          () => { this.validateField(name, value) });
  }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '': ' is too short';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }


  render () {
    const  { classes } = this.props;

    const questionInput = (
      <div>
        <Input
          placeholder="Your Email"
          type="text"
          name="email"
          error={!this.state.emailValid}
          className="text-field email"
          onChange={this._onFieldChangeValue}
          classes={{
            root: classes.root,
            underline: classes.cssUnderline,
          }}
        />
        <Input
          placeholder="Your password"
          type="password"
          name="password"
          error={!this.state.passwordValid}
          className="text-field password"
          onChange={this._onFieldChangeValue}
          classes={{
            underline: classes.cssUnderline,
          }}
        />
          <FormErrors formErrors={this.state.formErrors} />
      </div>
    );

    return (
      <div>
        <BasePage
          titleText="Start by Signup"
          currentPage={1}
          totalPages={4}
          questionInput={questionInput}
          monsterImg="/img/page_2_monster.png"
          buttonOptions={{
            className: 'on-form',
            text: 'Next',
            onClick: this._sendAuthRequest,
            isDisabled: !this.state.formValid
          }}
        />
        <ButtonNext
          className='mob'
          text='Next'
          onClick={this._sendAuthRequest}
          isDisabled={!this.state.formValid}
        />
      </div>
    );
  }
}

export default connect()(withStyles(styles)(LoginPage));
