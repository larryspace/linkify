require('bootstrap/dist/css/bootstrap.min.css');
require('font-awesome/css/font-awesome.min.css');
require('../styles/app.css');

import React, { Component, PropTypes } from 'react';
import { BrowserRouter, Match, Link, Miss } from 'react-router';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import { loginUser } from '../actions';

import FontAwesome from 'react-fontawesome';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import LoginContainer from './LoginContainer';

import Home from '../components/Home/home';
import NotFound from '../components/NotFound';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <app>
          <Header />
          <Match exactly pattern="/" component={Home}/>
          <Match exactly pattern="/login" component={LoginContainer}/>
          <Miss component={NotFound}/>
          <Footer />
        </app>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticating: state.isAuthenticating,
})


export default connect(mapStateToProps,
  {
    loginUser
  }
)(App)
