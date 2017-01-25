import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/css/font-awesome.min.css';
import './app.scss';

import React, { Component, PropTypes } from 'react';
import { BrowserRouter, Match, Link, Miss, Redirect } from 'react-router';
import { connect } from 'react-redux';

import { authUser, logoutUser, getDefaultDirectories, toggleLoginModal, getSubscribedDirectories } from '../../actions';

import LoginContainer from 'linkify/containers/Login';
import RegisterContainer from 'linkify/containers/Register';
import ProfileContainer from 'linkify/containers/Profile';
import AccountContainer from 'linkify/containers/Account';
import DirectoryContainer from 'linkify/containers/Directory';
import LinkContainer from 'linkify/containers/Link';

import LoginModal from 'linkify/containers/LoginModal';

import Home from 'linkify/components/Home';
import NotFound from 'linkify/components/NotFound';

import NavigationDrawer from 'linkify/components/Navigation';
import Container from 'linkify/components/Container';
import Header from 'linkify/components/Header';
import Footer from 'linkify/components/Footer';
import Spinner from 'linkify/components/Spinner';
import CookieConsent from 'linkify/components/CookieConsent';

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

    this.props.getDefaultDirectories();

    if(localStorage.getItem('token')){
      this.props.authUser();
    }
  }

  componentDidMount() {
    setTimeout(this.updateDimensions.bind(this), 200);
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillReceiveProps(nextProps){
    //console.log('component will recieve props', nextProps);
    if(nextProps.user.id && this.props.user.id !== nextProps.user.id){
      this.props.getSubscribedDirectories();
    }
  }

  updateDimensions(){
    if(window.innerWidth >= 768){
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

    const {
      defaultDirectories,
      subscribedDirectories,
      isFetchingSubscribedDirectories,
      isFetchingDefaultDirectories,
      title,
      userInfo,
      isAuthenticated,
      isAuthenticating,
      toggleLoginModal,
      logoutUser,
      user
    } = this.props;

    const {
      cookieConsentOpen,
      fixedDrawer,
      navOpen
    } = this.state;

    return (
      <BrowserRouter>
          <app>
            <LoginModal />
            <CookieConsent show={ cookieConsentOpen } onClose={ this.closeCookieConsent.bind(this) } />
            <NavigationDrawer
              defaultDirectories={ defaultDirectories }
              subscribedDirectories={ subscribedDirectories }
              isFetchingSubscribedDirectories={ isFetchingSubscribedDirectories }
              isFetchingDefaultDirectories={ isFetchingDefaultDirectories }
              fixed={ fixedDrawer }
              open={ navOpen }
              onClose={this.toggleDrawer.bind(this)}
            />
            <div className={ fixedDrawer ? 'wrapper pad-left' : 'wrapper'}>
              <Header
                title={ title }
                userInfo={ userInfo }
                isAuthenticated={ isAuthenticated }
                isAuthenticating={ isAuthenticating }
                onHamburgerClick={this.toggleDrawer.bind(this)}
                onLoginClick={  toggleLoginModal }
                onLogoutClick={ logoutUser }
                avatar={ user.avatar }
                name={ user.username }
                userId={ user.id }
               />
              <Match exactly pattern="/" component={DirectoryContainer}/>
              <Match exactly pattern="/login" component={LoginContainer}/>
              <Match exactly pattern="/register" component={RegisterContainer}/>
              <Match exactly pattern="/u/:id/:name/:type(links|comments)?" component={ProfileContainer}/>
              <Match exactly pattern="/s/:directory/:sort(hot|latest)?" component={DirectoryContainer}/>
              <Match exactly pattern="/s/:directory/:link/comments" component={LinkContainer}/>
              <MatchWhenAuthorized isAuthenticating={ isAuthenticating } isAuthenticated={ isAuthenticated } exactly pattern="/account/:setting" component={AccountContainer}/>
              <Miss component={NotFound}/>
            </div>
          </app>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    collections: { defaultDirectories, subscribedDirectories },
    entities: { directories, users }
  } = state;

  const defaultDirs = defaultDirectories.ids.map(id => directories[id]);
  const subscribedDirs = subscribedDirectories.ids.map(id => directories[id]);

  return {
    title: state.Page.title,
    user: users[state.Auth.user] || {},
    isAuthenticated: state.Auth.isAuthenticated,
    isAuthenticating: state.Auth.isAuthenticating,
    isFetchingDefaultDirectories: defaultDirectories.isFetching || false,
    defaultDirectories: defaultDirs,
    isFetchingSubscribedDirectories: subscribedDirectories.isFetching || false,
    subscribedDirectories: subscribedDirs
  };
}


export default connect(mapStateToProps,
  {
    authUser,
    logoutUser,
    getDefaultDirectories,
    getSubscribedDirectories,
    toggleLoginModal
  }
)(App)
