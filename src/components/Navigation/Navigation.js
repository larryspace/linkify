import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Tag } from 'reactstrap';

import List from '../List';

import './navigation.scss';

export default class NavigationDrawer extends Component {

  static propTypes = {
    fixed: PropTypes.bool,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    isFetchingSubscribedDirectories: PropTypes.bool,
    isFetchingDefaultDirectories: PropTypes.bool
  }

  renderLink({ name }){
    return (<Link key={ name } to={'/s/' + name.toLowerCase()} className="list-group-item-action list-group-item">{ name }</Link>);
  }

  renderDrawer(){
    return (
      <aside className={"navigation-drawer " + (!this.props.open && !this.props.fixed && "closed" || "")}>
      <h2><Link to={'/'}>Linkify</Link></h2>
      <ul className="list-group">
        <li className="sub-header dropdown-header">Default Subs</li>
        <List
          items={ this.props.defaultDirectories }
          renderItem={ this.renderLink }
          isFetching={ this.props.isFetchingDefaultDirectories }
          canFetchMore={ false }
          onLoadMore={()=>{}}
        />
        <li className="sub-header dropdown-header">Subscribed</li>
        <List
          items={ this.props.subscribedDirectories }
          renderItem={ this.renderLink }
          isFetching={ this.props.isFetchingSubscribedDirectories }
          canFetchMore={ false }
          onLoadMore={()=>{}}
        />
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
