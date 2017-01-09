import React, { Component, PropTypes } from 'react';


export default class Comment extends Component {

  static propTypes = {
    renderItem: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onLoadMoreClick: PropTypes.func.isRequired
  }

  render() {

    const {
      isFetching,
      items,
      renderItem
    } = this.props;

    return (
      <div>
        {items.map(renderItem)}
      </div>
    );
  }
}
