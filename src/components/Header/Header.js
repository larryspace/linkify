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

    const accountMenu = [
      ['/account/settings', 'Account Info'],
      ['/account/avatar', 'Avatar'],
      ['/account/password', 'Password']
    ];

    return (
    <NavDropdown className="float-right" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown.bind(this)}>
      <DropdownToggle nav className="account-menu-toggler nav-link dropdown-toggle">
        Thehink
      </DropdownToggle>
      <DropdownMenu right>
        <Link to={'/profile'} className="dropdown-item" onClick={this.toggleDropdown.bind(this)}>Profile</Link>
        <DropdownItem header>Settings</DropdownItem>
        {accountMenu.map(item => (
          <Link key={item[0]} to={item[0]} className="dropdown-item" onClick={this.toggleDropdown.bind(this)}>{item[1]}</Link>
        ))}
        <DropdownItem divider />
        <Link to={'/logout'} className="dropdown-item" onClick={this.toggleDropdown.bind(this)}>Logout</Link>
      </DropdownMenu>
    </NavDropdown>);
  }

  render() {
    return (
      <header>
        <nav className="app-navbar navbar-inverse navbar-toggleable bg-inverse navbar-full">
            <button className="navbar-toggler float-left" type="button" onClick={this.props.onHamburgerClick}>
              <span className="navbar-toggler-icon"></span>
            </button>
            <span className="navbar-brand">{ this.props.title }</span>
            <Nav navbar className="float-right">
              {this.props.isAuthenticated && this.renderDropdownMenu()}
              {!this.props.isAuthenticated && this.renderRegisterButton()}
              {!this.props.isAuthenticated && this.renderLoginButton()}
            </Nav>
          </nav>
        </header>
    );
  }
}

export default Header;
