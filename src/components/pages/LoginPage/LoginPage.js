import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import BasePage from '../BasePage/BasePage';
import ButtonNext from '../../buttons/ButtonNext/ButtonNext';
import constants from '../../../constants';
import './LoginPage.css';

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
      formHasErrors: false
    };

    this._sendAuthRequest = this.sendAuthRequest.bind(this);
    this._onFieldChangeValue = this.onFieldChangeValue.bind(this);
  }

  async sendAuthRequest () {
    const {email, password} = this.state;

    let responseData = (email && password ) ?{success: '200', token: constants.token} : {};
    const {success, token} = responseData || {};

    if (!success || !token) {
      this.setState({
        formHasErrors: true
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
    this.setState({
      [e.target.name]: e.target.value,
      formHasErrors: false
    }, () => {
      this.setState({
        formIsFilled: !!(this.state.email && this.state.password)
      });
    });
  }

  render () {
    const  { classes } = this.props;

    const questionInput = (
      <div>
        <Input
          placeholder="Your Email"
          type="text"
          name="email"
          error={this.state.formHasErrors}
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
          error={this.state.formHasErrors}
          className="text-field password"
          onChange={this._onFieldChangeValue}
          classes={{
            underline: classes.cssUnderline,
          }}
        />
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
            isDisabled: !this.state.formIsFilled
          }}
        />
        <ButtonNext
          className='mob'
          text='Next'
          onClick={this._sendAuthRequest}
          isDisabled={!this.state.formIsFilled}
        />
      </div>
    );
  }
}

export default connect()(withStyles(styles)(LoginPage));
