import React, { Component, PropTypes } from 'react';

import Spinner from '../../components/Spinner';

export default class NestedList extends Component {

  static propTypes = {
    //renderItem: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onLoadMoreClick: PropTypes.func.isRequired
  }

  renderItem(item, items, renderItem){
    const children = items.filter(subItem => subItem.parent_id===item.id).map(subItem => this.renderItem(subItem, items, renderItem));
    return renderItem(item, children);
  }

  render() {
    const {
      isFetching,
      items,
      component,
      renderItem,
    } = this.props;

    return (
      <div>
        {items.filter(item => !item.parent_id).map(subItem => this.renderItem(subItem, items, renderItem))}
        {isFetching && (<Spinner />)}
      </div>
    );
  }
}
