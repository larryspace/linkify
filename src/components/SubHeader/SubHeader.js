import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Button, ButtonGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import Container from 'linkify/components/Container';

import './SubHeader.scss';

export default class SubHeader extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    onNewLinkClick: PropTypes.func,
    onSubscribeClick: PropTypes.func,
    sortOption: PropTypes.string,
    compact: PropTypes.bool,
    directory: PropTypes.string.isRequired,
    subscribed: PropTypes.bool
  }

  state = {
    sortMenuOpen: false,
  }

  toggleSortMenu(){
    this.setState({ sortMenuOpen: !this.state.sortMenuOpen });
  }

  render() {

    const {
      title,
      directory,
      subscribed,
      onNewLinkClick,
      onSubscribeClick,
      sortOption,
      compact
    } = this.props;

    return (
      <div className="app-sub-header">
        <Container>
          <h3 className="app-sub-header-title"><Link to={`/s/${directory}`}>{ this.props.title }</Link></h3>
          { !compact && (
            <ButtonGroup className="pull-right">
            {directory !== 'all' && (
              <Button onClick={ onNewLinkClick } color="primary">
               <FontAwesome name="plus" style={{ color: 'rgba(0,0,0,.5)' }} /> New Link
              </Button>
            )}
            { directory !== 'all' && (
              <Button className={subscribed ? 'subscribed' : ''} onClick={ onSubscribeClick } color={subscribed ? 'success' : 'secondary'}>
               <FontAwesome name="check" style={{ color: 'rgba(0,0,0,.5)' }} /> {subscribed ? 'Unsubscribe' : 'Subscribe'}
              </Button>
            )}
             <ButtonDropdown isOpen={ this.state.sortMenuOpen } toggle={this.toggleSortMenu.bind(this)}>
              <DropdownToggle caret>
                { sortOption }
              </DropdownToggle>
              <DropdownMenu right>
                <Link to={`/s/${directory}/hot`} className="dropdown-item" onClick={this.toggleSortMenu.bind(this)}>Hot</Link>
                <Link to={`/s/${directory}/latest`} className="dropdown-item" onClick={this.toggleSortMenu.bind(this)}>Latest</Link>
              </DropdownMenu>
            </ButtonDropdown>
           </ButtonGroup>
          )}
        </Container>
      </div>
    );
  }
}
