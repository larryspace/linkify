import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Tag } from 'reactstrap';

import './navigation.scss';

export default class NavigationDrawer extends Component {

  static propTypes = {
    fixed: PropTypes.bool,
    open: PropTypes.bool,
    onClose: PropTypes.func
  }

  renderDrawer(){
    return (
      <aside className={"navigation-drawer " + (!this.props.open && !this.props.fixed && "closed" || "")}>
      <h2>Linkify</h2>
      <ul className="list-group">
        <li className="sub-header">Default Reddits</li>
        <Link to={'/home'} className="list-group-item-action list-group-item">Home</Link>
        <Link to={'/home'} className="list-group-item-action list-group-item">Home</Link>
        <Link to={'/home'} className="list-group-item-action list-group-item">Home</Link>
        <Link to={'/home'} className="list-group-item-action list-group-item">Home</Link>
        <li className="sub-header">Subscribed</li>
        <Link to={'/home'} className="list-group-item-action list-group-item">Home</Link>
        <Link to={'/home'} className="list-group-item-action list-group-item">Home</Link>
        <Link to={'/home'} className="list-group-item-action list-group-item">Home</Link>
        <Link to={'/home'} className="list-group-item-action list-group-item">Home</Link>
      </ul>
      </aside>
    );
  }

  hideDrawer(e){
    if(e.target.classList.contains('drawer-background')){
      this.props.onClose();
    }
  }

  render() {
    if(!this.props.fixed){
      return (
        <div className={"drawer-background " + (!this.props.open && "closed" || "")} onClick={this.hideDrawer.bind(this)}>
        { this.renderDrawer() }
        </div>
      );
    }else{
      return this.renderDrawer();
    }


  }
}
