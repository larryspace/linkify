import './header.scss';
import React from 'react';
import {Link} from 'react-router';

import FontAwesome from 'react-fontawesome';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink,
  NavbarToggler, Collapse, NavDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class Header extends React.Component {
  state = {
    dropdownOpen: false
  };

  toggleDropdown(){
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
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

  renderDropdownMenu(){
    return (
    <NavDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown.bind(this)}>
      <DropdownToggle nav>
        <FontAwesome name="ellipsis-v" />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem>Profile</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Logout</DropdownItem>
      </DropdownMenu>
    </NavDropdown>);
  }

  render() {
    return (
      <header>
        <Navbar color="inverse" dark full>
            <button className="navbar-toggler hidden-md-up pull-left" type="button" onClick={this.props.onHamburgerClick}></button>
            <Nav navbar className="pull-right">
              {this.props.isAuthenticated && this.renderDropdownMenu()}
              {!this.props.isAuthenticated && this.renderRegisterButton()}
              {!this.props.isAuthenticated && this.renderLoginButton()}
            </Nav>
          </Navbar>
        </header>
    );
  }
}

export default Header;
