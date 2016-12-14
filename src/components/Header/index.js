import React from 'react';
import {Link} from 'react-router';

import FontAwesome from 'react-fontawesome';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarToggler, Collapse } from 'reactstrap';


class Header extends React.Component {

  constructor(props){
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar(){
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    console.log(this.state);
    return (
      <header>
        <Navbar color="inverse" dark full>
          <NavbarToggler className="hidden-sm-up pull-right collapsed" onClick={this.toggleNavbar} />

          <div className="container">
              <Link to={'/'} className="navbar-brand">Linkify</Link>
              <Collapse className="navbar-toggleable-md" isOpen={true}>
                <Nav navbar>
                  <NavItem>
                    <Link to={'/'} className="nav-link">Home</Link>
                  </NavItem>
                  <NavItem>
                    <Link to={'/about'} className="nav-link">About</Link>
                  </NavItem>
                </Nav>
                <Nav className="float-sm-right float-xs-left" navbar>
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
