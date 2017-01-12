import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/css/font-awesome.min.css';
import './app.scss';

import React, { Component, PropTypes } from 'react';
import { BrowserRouter, Match, Link, Miss, Redirect } from 'react-router';
import { connect } from 'react-redux';

import { authUser, logoutUser, getDefaultDirectories } from '../../actions';

import LoginContainer from './../Login';
import RegisterContainer from './../Register';
import ProfileContainer from './../Profile';
import AccountContainer from './../Account';
import SubContainer from './../Sub';
import LinkContainer from './../Link';

import Home from '../../components/Home';
import NotFound from '../../components/NotFound';

import NavigationDrawer from '../../components/Navigation';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Spinner from '../../components/Spinner';
import CookieConsent from '../../components/CookieConsent';

const MatchWhenAuthorized = ({ component: Component, ...rest }) => (
  <Match {...rest} render={props => (
    rest.isAuthenticated ? (
      <div><Component {...props}/></div>
    ) : rest.isAuthenticating ? (
      <Spinner />
    ) : (
      <NotFound />
    )
  )}/>
);

class App extends Component {
  state = {
    navOpen: false,
    fixedDrawer: false,
    cookieConsentOpen: !localStorage.getItem('acceptCookies')
  };

  componentWillMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));

    this.props.getDefaultDirectories();

    if(localStorage.getItem('token')){
      this.props.authUser();
    }
  }

  componentWillReceiveProps(nextProps){
    //console.log('component will recieve props', nextProps);
  }

  updateDimensions(){
    if(window.innerWidth > 575){
      this.setState({fixedDrawer: true});
    }else{
      this.setState({fixedDrawer: false});
    }
  }

  toggleDrawer(){
    const navOpen = !this.state.navOpen;
    this.setState({navOpen});
  }

  closeCookieConsent(){
    localStorage.setItem('acceptCookies', true);
    this.setState({
      cookieConsentOpen: false,
    });
  }

  render() {


    const LogoutComponent = ({ component: Component, ...rest }) => {
      this.props.logoutUser();

      return (
        <Redirect to={{
          pathname: '/'
        }}/>
    )}





    return (
      <BrowserRouter>
          <app>
            <CookieConsent show={ this.state.cookieConsentOpen } onClose={ this.closeCookieConsent.bind(this) } />
            <NavigationDrawer
              defaultDirectories={this.props.defaultDirectories}
              fixed={this.state.fixedDrawer}
              open={this.state.navOpen}
              onClose={this.toggleDrawer.bind(this)}
            />
            <div className={this.state.fixedDrawer ? 'wrapper pad-left' : 'wrapper'}>
              <Header
                title={this.props.title}
                userInfo={this.props.userInfo}
                isAuthenticated={this.props.isAuthenticated}
                onHamburgerClick={this.toggleDrawer.bind(this)}
               />
              <Match exactly pattern="/" component={Home}/>
              <Match exactly pattern="/profile" component={ProfileContainer}/>
              <Match exactly pattern="/login" component={LoginContainer}/>
              <Match exactly pattern="/register" component={RegisterContainer}/>
              <Match exactly pattern="/logout" component={LogoutComponent}/>
              <Match exactly pattern="/s/:directory/:sort(hot|latest)?" component={SubContainer}/>
              <Match exactly pattern="/s/:directory/:link/comments" component={LinkContainer}/>
              <MatchWhenAuthorized isAuthenticating={this.props.isAuthenticating} isAuthenticated={this.props.isAuthenticated} exactly pattern="/account/:setting" component={AccountContainer}/>
              <Miss component={NotFound}/>
            </div>
          </app>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    collections: { defaultDirectories },
    entities: { directories, users }
  } = state;

  const defaultDirs = defaultDirectories.ids.map(id => directories[id]);

  return {
    title: state.Page.title,
    user: users[state.Auth.user] || {},
    isAuthenticated: state.Auth.isAuthenticated,
    isAuthenticating: state.Auth.isAuthenticating,
    isLoadingDefaultDirs: defaultDirectories.isFetching,
    defaultDirectories: defaultDirs
  };
}


export default connect(mapStateToProps,
  {
    authUser,
    logoutUser,
    getDefaultDirectories
  }
)(App)
