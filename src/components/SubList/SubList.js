import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import './SubList.scss';

const ListItem = ({ component: Component, ...rest }) => {
  return (
    <li className="sub-list-item">
      <div className="sub-list-vote">
        <button><FontAwesome name="arrow-up" /></button>
        <span className="upvote-count">123</span>
        <button><FontAwesome name="arrow-down" /></button>
      </div>
      <a className="sub-list-item-link" href="https://google.se" target="_blank">
        <div className="sub-list-image">
        </div>
        <div className="link-title">Link Title</div>
        <div className="link-desc">asfa...</div>
      </a>
      <a href="#" className="sub-list-item-comments">
        <span className="comments-count">123</span>
        <span className="comments-button">Comments</span>
      </a>
    </li>
)}

export default class SubList extends Component {
  render() {
    return (
      <div>
      <ul className="sub-list">
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
      </ul>
      </div>
    );
  }
}
