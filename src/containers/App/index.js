import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/css/font-awesome.min.css';
import './app.scss';

import React, { Component, PropTypes } from 'react';
import { BrowserRouter, Match, Link, Miss } from 'react-router';
import { connect } from 'react-redux';

import { authUser } from '../../actions';

import LoginContainer from './../Login';
import RegisterContainer from './../Register';

import Home from '../../components/Home';
import NotFound from '../../components/NotFound';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

class App extends React.Component {
  componentDidMount() {
    if(localStorage.getItem('token')){
      this.props.authUser();
    }
  }

  render() {
    return (
      <BrowserRouter>
          <app>
            <Header
              userInfo={this.props.userInfo}
              isAuthenticated={this.props.isAuthenticated}
             />
            <Match exactly pattern="/" component={Home}/>
            <Match exactly pattern="/login" component={LoginContainer}/>
            <Match exactly pattern="/register" component={RegisterContainer}/>
            <Miss component={NotFound}/>
            <Footer />
          </app>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.Auth.userInfo,
  isAuthenticated: state.Auth.isAuthenticated,
})


export default connect(mapStateToProps,
  {
    authUser,
  }
)(App)
