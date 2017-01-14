import React, { Component, PropTypes } from 'react';

import Spinner from '../../components/Spinner';

export default class Comment extends Component {

  static propTypes = {
    renderItem: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    canLoadMore: PropTypes.bool.isRequired,
    onLoadMore: PropTypes.func.isRequired
  }

  render() {

    const {
      isFetching,
      items,
      canLoadMore,
      onLoadMore,
      renderItem
    } = this.props;

    return (
      <div>
        {items.map(renderItem)}
        {isFetching && (<Spinner />)}
        {canLoadMore && (<button onClick={ onLoadMore }>Load More...</button>)}
      </div>
    );
  }
}
