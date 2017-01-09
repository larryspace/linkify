import React, { Component, PropTypes } from 'react';


export default class NestedList extends Component {

  static propTypes = {
    //renderItem: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onLoadMoreClick: PropTypes.func.isRequired
  }

  renderItem(item, items, Component){
    const children = items.filter(subItem => subItem.parent===item.id);

    return (
      <Component
        key={'nested_list' + item.id}
        {...item}
      >
        {children.length > 0 && children.map(subItem => this.renderItem(subItem, items, Component))}
      </Component>
    );
  }

  render() {

    const {
      isFetching,
      items,
      component
    } = this.props;

    return (
      <div>
        {items.filter(item => item.parent===0).map(subItem => this.renderItem(subItem, items, component))}
      </div>
    );
  }
}
