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

import NavigationDrawer from '../../components/Navigation';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

class App extends Component {
  state = {
    navOpen: false,
    fixedDrawer: false
  };

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));

    if(localStorage.getItem('token')){
      this.props.authUser();
    }
  }

  componentWillReceiveProps(nextProps){
    console.log('component will recieve props', nextProps);
  }

  updateDimensions(){
    if(window.innerWidth > 767){
      this.setState({fixedDrawer: true});
    }else{
      this.setState({fixedDrawer: false});
    }
  }

  toggleDrawer(){
    const navOpen = !this.state.navOpen;
    this.setState({navOpen});
  }

  render() {
    return (
      <BrowserRouter>
          <app>
            <NavigationDrawer
              fixed={this.state.fixedDrawer}
              open={this.state.navOpen}
              onClose={this.toggleDrawer.bind(this)}
            />
            <div className={this.state.fixedDrawer ? 'wrapper pad-left' : 'wrapper'}>
              <Header
                userInfo={this.props.userInfo}
                isAuthenticated={this.props.isAuthenticated}
                onHamburgerClick={this.toggleDrawer.bind(this)}
               />
              <Match exactly pattern="/" component={Home}/>
              <Match exactly pattern="/login" component={LoginContainer}/>
              <Match exactly pattern="/register" component={RegisterContainer}/>
              <Miss component={NotFound}/>
              <Footer />
            </div>
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
