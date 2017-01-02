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

  renderLink({ name }){
    return (<Link key={ name } to={'/s/' + name.toLowerCase()} className="list-group-item-action list-group-item">{ name }</Link>);
  }

  renderDrawer(){
    return (
      <aside className={"navigation-drawer " + (!this.props.open && !this.props.fixed && "closed" || "")}>
      <h2>Linkify</h2>
      <ul className="list-group">
        <li className="sub-header">Default Subs</li>
        <Link to={'/s/all'} className="list-group-item-action list-group-item">All</Link>
        { this.props.defaultDirectories.map(this.renderLink) }
        <li className="sub-header">Subscribed</li>
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
