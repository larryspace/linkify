import './header.scss';
import React from 'react';
import {Link} from 'react-router';

import FontAwesome from 'react-fontawesome';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarToggler, Collapse } from 'reactstrap';


class Header extends React.Component {

  constructor(props){
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: false
    };
  }

  toggleNavbar(){
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  renderLoginButton(){
    return (
    <NavItem>
      <Link to={'/login'} className="nav-link">Login</Link>
    </NavItem>);
  }

  renderRegisterButton(){
    return (
    <NavItem>
      <Link to={'/register'} className="nav-link">Register</Link>
    </NavItem>);
  }

  renderLogoutButton(){
    return (
    <NavItem>
      <Link to={'/logout'} className="nav-link">Logout</Link>
    </NavItem>);
  }

  render() {
    return (
      <header>
        <Navbar color="inverse" dark full>
            <NavbarToggler className="hidden-md-up pull-left collapsed" onClick={this.props.onHamburgerClick} />
            <Nav navbar className="pull-right">
              {this.props.isAuthenticated && this.renderLogoutButton()}
              {!this.props.isAuthenticated && this.renderRegisterButton()}
              {!this.props.isAuthenticated && this.renderLoginButton()}
            </Nav>
          </Navbar>
        </header>
    );
  }
}

export default Header;
