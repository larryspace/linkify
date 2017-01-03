import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import './SubHeader.scss';

export default class SubHeader extends Component {
  render() {
    return (
      <div className="app-sub-header">
        <h3 className="app-sub-header-title">Title</h3>
        <ButtonGroup className="pull-right">
         <Button onClick={ this.props.onNewLinkClick } color="primary">
          <FontAwesome name="plus" style={{ color: 'rgba(0,0,0,.5)' }} /> New Link
         </Button>
         <Button onClick={ this.props.onNewLinkClick } color="secondary">
          <FontAwesome name="check" style={{ color: 'rgba(0,0,0,.5)' }} /> Subscribe
         </Button>
       </ButtonGroup>
      </div>
    );
  }
}
