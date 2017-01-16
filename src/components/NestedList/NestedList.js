import React, { Component, PropTypes } from 'react';

import Spinner from '../../components/Spinner';

export default class NestedList extends Component {

  static propTypes = {
    //renderItem: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onLoadMoreClick: PropTypes.func.isRequired
  }

  renderItem(item, items, renderItem, level){
    const children = items.filter(subItem => subItem.parent_id===item.id).map(subItem => this.renderItem(subItem, items, renderItem, level+1));
    return renderItem(item, children, level);
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
        {items.filter(item => !item.parent_id).map(subItem => this.renderItem(subItem, items, renderItem, 1))}
        {isFetching && (<Spinner />)}
      </div>
    );
  }
}
