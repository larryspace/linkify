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

  render() {
    return (
      <header>
        <Navbar color="inverse" dark full>
          <NavbarToggler className="hidden-md-up pull-right collapsed" onClick={this.toggleNavbar} />

          <div className="container">
              <Link to={'/'} className="navbar-brand">Linkify</Link>
              <Collapse className="navlinks navbar-toggleable-sm" isOpen={this.state.collapsed}>
              <div className="divider"></div>
                <Nav navbar className="float-sm-left">
                  <NavItem>
                    <Link to={'/'} className="nav-link">Home</Link>
                  </NavItem>
                  <NavItem>
                    <Link to={'/about'} className="nav-link">About</Link>
                  </NavItem>
                </Nav>
                <Nav className="float-md-right float-sm-left" navbar>
                <NavItem>
                  <Link to={'/register'} className="nav-link">Register</Link>
                </NavItem>
                  <NavItem>
                    <Link to={'/login'} className="nav-link">Login</Link>
                  </NavItem>
                </Nav>
              </Collapse>
            </div>
          </Navbar>
        </header>
    );
  }
}

export default Header;
