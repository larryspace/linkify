import React, { Component, PropTypes } from 'react';

import Spinner from '../../components/Spinner';

function topPosition(domElt) {
  if (!domElt) {
    return 0;
  }
  return domElt.offsetTop + topPosition(domElt.offsetParent);
}

export default class Comment extends Component {

  static propTypes = {
    renderItem: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    canFetchMore: PropTypes.bool.isRequired,
    onLoadMore: PropTypes.func.isRequired
  }

  constructor(props){
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillReceiveProps(nextProps){
    const {
      isFetching,
      canFetchMore,
      onLoadMore
    } = nextProps;

    if(canFetchMore && this.props.isFetching && !isFetching){
      setTimeout(this.handleScroll, 100);
    }
  }

  handleScroll(event) {
    const height = window.innerHeight;
    const scrollTop = document.body.scrollTop;
    const scrollHeight = this.refs.listWrapper.scrollHeight;
    const threshold = 250;

    const value = scrollTop - scrollHeight + height - topPosition(this.refs.listWrapper) + threshold;

    const {
      isFetching,
      canFetchMore,
      onLoadMore
    } = this.props;

    if(!isFetching && canFetchMore && value > 0){
      onLoadMore();
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
    document.addEventListener('resize', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('resize', this.handleScroll);
  }

  render() {

    const {
      isFetching,
      items,
      canFetchMore,
      onLoadMore,
      renderItem
    } = this.props;

    return (
      <div ref="listWrapper">
        {items.map(renderItem)}
        {isFetching && (<Spinner />)}
        {1==2 && canFetchMore && (<button onClick={ onLoadMore }>Load More...</button>)}
      </div>
    );
  }
}
