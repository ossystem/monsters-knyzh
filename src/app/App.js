import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';
import StartPage from '../components/pages/StartPage/StartPage';
import LoginPage from '../components/pages/LoginPage/LoginPage';
import Questions from '../components/pages/Questions';
import ResultsPage from '../components/pages/ResultsPage/ResultsPage';
import constants from '../constants';
import './App.css';

const history = createBrowserHistory();

class App extends Component {
  async componentWillMount () {
    const {token} = this.props;

    if (!token) {
      return;
    }

    let responseData = (token === constants.token) ?{success: '200'} : {};

    if (!responseData || !responseData.success) {
      this.props.dispatch({
        type: 'SET_TOKEN',
        token: null
      });
    }
  }

  render () {
    return (
      <div className="main-container">
        <Router history={history}>
          <Route path="/" exact component={StartPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/questions" component={Questions}/>
          <Route path="/results" component={ResultsPage}/>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token
});

export default connect(mapStateToProps)(App);
