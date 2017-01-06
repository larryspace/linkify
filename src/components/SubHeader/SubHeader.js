import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Button, ButtonGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import './SubHeader.scss';

export default class SubHeader extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    onNewLinkClick: PropTypes.func.isRequired,
    sortOption: PropTypes.string.isRequired,
    directory: PropTypes.string.isRequired
  }

  state = {
    sortMenuOpen: false,
  }

  toggleSortMenu(){
    this.setState({ sortMenuOpen: !this.state.sortMenuOpen });
  }

  render() {
    return (
      <div className="app-sub-header">
        <h3 className="app-sub-header-title">{ this.props.title }</h3>
        <ButtonGroup className="pull-right">
        {this.props.directory !== 'all' && (
          <Button onClick={ this.props.onNewLinkClick } color="primary">
           <FontAwesome name="plus" style={{ color: 'rgba(0,0,0,.5)' }} /> New Link
          </Button>
        )}
        {this.props.directory !== 'all' && (
          <Button onClick={ this.props.onNewLinkClick } color="secondary">
           <FontAwesome name="check" style={{ color: 'rgba(0,0,0,.5)' }} /> Subscribe
          </Button>
        )}
         <ButtonDropdown isOpen={ this.state.sortMenuOpen } toggle={this.toggleSortMenu.bind(this)}>
          <DropdownToggle caret>
            { this.props.sortOption }
          </DropdownToggle>
          <DropdownMenu right>
            <Link to={`/s/${this.props.directory}/hot`} className="dropdown-item" onClick={this.toggleSortMenu.bind(this)}>Hot</Link>
            <Link to={`/s/${this.props.directory}/latest`} className="dropdown-item" onClick={this.toggleSortMenu.bind(this)}>Latest</Link>
          </DropdownMenu>
        </ButtonDropdown>
       </ButtonGroup>
      </div>
    );
  }
}
